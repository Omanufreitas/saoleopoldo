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

  function renderKids(node, scope, out) {
    for (var c = node.firstChild; c; c = c.nextSibling) renderNode(c, scope, out);
  }
  function renderNode(node, scope, out) {
    if (node.nodeType === 3) {
      var t = node.nodeValue;
      out.push(document.createTextNode(t.indexOf('{{') >= 0 ? interp(t, scope) : t));
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
    var el = node.namespaceURI && node.namespaceURI !== 'http://www.w3.org/1999/xhtml'
      ? document.createElementNS(node.namespaceURI, node.tagName)
      : document.createElement(tag);
    var deferred = {};
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
          el.addEventListener(ev, fn);
        }
        continue;
      }
      if ((name === 'checked' || name === 'value') && mm) { deferred[name] = lookup(scope, mm[1]); continue; }
      var out2 = mm ? lookup(scope, mm[1]) : (val.indexOf('{{') >= 0 ? interp(val, scope) : val);
      if (out2 == null || out2 === false) continue;
      el.setAttribute(name, out2 === true ? '' : String(out2));
    }
    var kids = [];
    renderKids(node, scope, kids);
    kids.forEach(function (k) { el.appendChild(k); });
    if ('checked' in deferred) el.checked = !!deferred.checked;
    if ('value' in deferred) el.value = deferred.value == null ? '' : deferred.value;
    out.push(el);
  }

  function render() {
    pending = false;
    var act = document.activeElement, idx = -1, s0 = null, s1 = null;
    if (act && app.contains(act) && /^(INPUT|TEXTAREA|SELECT)$/.test(act.tagName)) {
      idx = Array.prototype.indexOf.call(app.querySelectorAll('input,textarea,select'), act);
      try { s0 = act.selectionStart; s1 = act.selectionEnd; } catch (e) {}
    }
    var vals = inst.renderVals() || {};
    var out = [];
    renderKids(tpl.content, vals, out);
    var frag = document.createDocumentFragment();
    out.forEach(function (n) { frag.appendChild(n); });
    app.replaceChildren(frag);
    if (idx >= 0) {
      var el = app.querySelectorAll('input,textarea,select')[idx];
      if (el) { el.focus(); try { if (s0 != null) el.setSelectionRange(s0, s1); } catch (e) {} }
    }
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
