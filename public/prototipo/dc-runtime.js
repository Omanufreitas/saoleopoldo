(function () {
  var HOLE_ALL = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;
  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;

  function DCLogic(props) { this.props = props || {}; this.state = {}; }
  DCLogic.prototype.setState = function (patch) {
    var p = typeof patch === 'function' ? patch(this.state, this.props) : patch;
    this.state = Object.assign({}, this.state, p);
    schedule();
  };
  DCLogic.prototype.forceUpdate = function () { schedule(); };
  DCLogic.prototype.renderVals = function () { return {}; };
  window.DCLogic = DCLogic;

  var inst, tpl, app, pending = false;

  function lookup(scope, path) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (path === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return parseFloat(path);
    var parts = path.split('.'), v = scope;
    for (var i = 0; i < parts.length; i++) {
      if (v == null) return undefined;
      v = v[parts[i]];
    }
    return v;
  }
  function interp(str, scope) {
    return str.replace(HOLE, function (_, p) { var v = lookup(scope, p); return v == null ? '' : String(v); });
  }
  function child(scope, extra) { var s = Object.create(scope); for (var k in extra) s[k] = extra[k]; return s; }

  // ---- virtual nodes ----
  function renderKids(node, scope, out) {
    for (var c = node.firstChild; c; c = c.nextSibling) renderNode(c, scope, out);
  }
  function renderNode(node, scope, out) {
    if (node.nodeType === 3) {
      var t = node.nodeValue;
      out.push({ text: t.indexOf('{{') >= 0 ? interp(t, scope) : t });
      return;
    }
    if (node.nodeType !== 1) return;
    var tag = node.localName;
    if (tag === 'sc-for') {
      var m = (node.getAttribute('list') || '').match(HOLE_ALL);
      var list = m ? lookup(scope, m[1]) : [];
      var as = node.getAttribute('as') || 'item';
      (list || []).forEach(function (item, i) {
        var e = {}; e[as] = item; e.$index = i;
        renderKids(node, child(scope, e), out);
      });
      return;
    }
    if (tag === 'sc-if') {
      var m2 = (node.getAttribute('value') || '').match(HOLE_ALL);
      if (m2 && lookup(scope, m2[1])) renderKids(node, scope, out);
      return;
    }
    var v = { tag: node.tagName, ns: node.namespaceURI, attrs: {}, ev: {}, props: {}, kids: [] };
    for (var i = 0; i < node.attributes.length; i++) {
      var a = node.attributes[i], name = a.name, val = a.value;
      if (name.indexOf('hint-') === 0) continue;
      var mm = val.match(HOLE_ALL);
      if (name.slice(0, 2) === 'on' && mm) {
        var fn = lookup(scope, mm[1]);
        if (typeof fn === 'function') {
          var ev = name.slice(2);
          if (ev === 'change' && (tag === 'input' || tag === 'textarea')) {
            var type = (node.getAttribute('type') || 'text').toLowerCase();
            ev = (type === 'checkbox' || type === 'radio') ? 'change' : 'input';
          }
          v.ev[ev] = fn;
        }
        continue;
      }
      if ((name === 'checked' || name === 'value') && mm) { v.props[name] = lookup(scope, mm[1]); continue; }
      var o = mm ? lookup(scope, mm[1]) : (val.indexOf('{{') >= 0 ? interp(val, scope) : val);
      if (o == null || o === false) continue;
      v.attrs[name] = o === true ? '' : String(o);
    }
    renderKids(node, scope, v.kids);
    out.push(v);
  }
  // ---- DOM patch (keeps elements alive so CSS animations run once) ----
  function create(v) {
    if (v.text != null) return document.createTextNode(v.text);
    var el = (v.ns && v.ns !== 'http://www.w3.org/1999/xhtml') ? document.createElementNS(v.ns, v.tag) : document.createElement(v.tag.toLowerCase());
    el.__v = { attrs: {}, ev: {} };
    update(el, v);
    return el;
  }
  function same(el, v) {
    if (v.text != null) return el.nodeType === 3;
    return el.nodeType === 1 && el.tagName === v.tag && el.namespaceURI === v.ns;
  }
  function update(el, v) {
    var st = el.__v || (el.__v = { attrs: {}, ev: {} });
    var k;
    for (k in st.attrs) if (!(k in v.attrs)) el.removeAttribute(k);
    for (k in v.attrs) if (st.attrs[k] !== v.attrs[k]) el.setAttribute(k, v.attrs[k]);
    st.attrs = v.attrs;
    for (k in v.ev) if (!st.ev[k]) { (function (name) { el.addEventListener(name, function (e) { var f = el.__v.ev[name]; if (f) f(e); }); })(k); }
    st.ev = Object.assign({}, st.ev);
    for (k in st.ev) st.ev[k] = v.ev[k] || null;
    for (k in v.ev) st.ev[k] = v.ev[k];
    patchKids(el, v.kids);
    if ('checked' in v.props) el.checked = !!v.props.checked;
    if ('value' in v.props) { var nv = v.props.value == null ? '' : String(v.props.value); if (el.value !== nv) el.value = nv; }
  }
  function patchKids(parent, vkids) {
    var cur = parent.firstChild, i = 0;
    for (; i < vkids.length; i++) {
      var v = vkids[i];
      if (cur && same(cur, v)) {
        if (v.text != null) { if (cur.nodeValue !== v.text) cur.nodeValue = v.text; }
        else update(cur, v);
        cur = cur.nextSibling;
      } else {
        var n = create(v);
        parent.insertBefore(n, cur);
      }
    }
    while (cur) { var nx = cur.nextSibling; parent.removeChild(cur); cur = nx; }
  }
  function render() {
    pending = false;
    var vals = inst.renderVals() || {};
    var out = [];
    renderKids(tpl.content, vals, out);
    patchKids(app, out);
  }
  function schedule() { if (!inst || pending) return; pending = true; Promise.resolve().then(render); }

  window.bootDC = function () {
    tpl = document.getElementById('tpl');
    app = document.getElementById('app');
    var code = document.getElementById('logic').textContent;
    var Component = new Function('DCLogic', code + '\n;return Component;')(DCLogic);
    inst = new Component({});
    render();
    if (inst.componentDidMount) inst.componentDidMount();
  };
})();
