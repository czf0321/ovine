;!function(e, t) {
    for (var a in t)
        e[a] = t[a]
}(exports, function(e) {
    var t = {};
    function a(n) {
        if (t[n])
            return t[n].exports;
        var l = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(l.exports, l, l.exports, a),
        l.l = !0,
        l.exports
    }
    return a.m = e,
    a.c = t,
    a.d = function(e, t, n) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }
    ,
    a.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    a.t = function(e, t) {
        if (1 & t && (e = a(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var n = Object.create(null);
        if (a.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var l in e)
                a.d(n, l, function(t) {
                    return e[t]
                }
                .bind(null, l));
        return n
    }
    ,
    a.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return a.d(t, "a", t),
        t
    }
    ,
    a.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    a.p = "",
    a(a.s = 38)
}([function(e, t) {
    e.exports = require("tslib")
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.EditorManager = t.getEditorPlugins = t.registerEditorPlugin = void 0;
    var n = a(0)
      , l = a(23)
      , i = a(2)
      , r = a(6)
      , o = a(22)
      , s = a(16)
      , d = a(50)
      , c = n.__importDefault(a(9))
      , u = n.__importDefault(a(31))
      , p = a(5)
      , m = n.__importDefault(a(52))
      , f = a(32)
      , h = n.__importDefault(a(10))
      , b = a(53)
      , g = [];
    t.registerEditorPlugin = function(e) {
        g.push(e)
    }
    ,
    t.getEditorPlugins = function() {
        return g.concat()
    }
    ;
    var v = function() {
        function e(e, t) {
            var a = this;
            this.config = e,
            this.store = t,
            this.toDispose = [],
            this.listeners = [],
            this.lazyPatchSchema = u.default(this.patchSchema.bind(this), 250, {
                leading: !1,
                trailing: !0
            }),
            this.patching = !1,
            this.env = n.__assign(n.__assign(n.__assign({}, d.env), e.amisEnv), {
                theme: e.theme
            }),
            this.plugins = g.concat(e.plugins || []).map((function(e) {
                var t, n = new e(a);
                return n.order = null !== (t = n.order) && void 0 !== t ? t : 0,
                n
            }
            )).sort((function(e, t) {
                return e.order - t.order
            }
            )),
            this.dnd = new b.EditorDNDManager(this,t),
            this.hackRenderers(),
            this.toDispose.push(r.reactionWithOldValue((function() {
                return t.activeId
            }
            ), (function(e, t) {
                a.store.insertId && a.store.closeInsertPanel(),
                a.buildJSONSchemaUri(),
                a.buildPanels(),
                a.buildToolbars(),
                a.trigger("active", e ? n.__assign(n.__assign({}, a.buildEventContext(e)), {
                    active: !0
                }) : {
                    id: t,
                    active: !1
                })
            }
            )), o.reaction((function() {
                var e;
                return [t.activeContainerId, t.activeContainerId ? null === (e = t.getNodeById(t.activeContainerId)) || void 0 === e ? void 0 : e.childRegions.map((function(e) {
                    return e.key
                }
                )) : []]
            }
            ), (function(e) {
                var t = e[0]
                  , n = e[1];
                t && (null == n ? void 0 : n.length) && a.buildRenderers()
            }
            )), o.reaction((function() {
                return t.needPatch
            }
            ), (function(e) {
                e && a.lazyPatchSchema()
            }
            )), r.reactionWithOldValue((function() {
                return {
                    id: t.hoverId,
                    region: t.hoverRegion
                }
            }
            ), (function(e, t) {
                var a, n;
                e.id && e.region ? null === (a = document.querySelector('[data-region="' + e.region + '"][data-region-host="' + e.id + '"]')) || void 0 === a || a.classList.add("is-region-active") : (null == t ? void 0 : t.id) && (null == t ? void 0 : t.region) && (null === (n = document.querySelector('[data-region="' + t.region + '"][data-region-host="' + t.id + '"]')) || void 0 === n || n.classList.remove("is-region-active"))
            }
            )))
        }
        return e.prototype.buildEventContext = function(e) {
            var t = "string" == typeof e ? this.store.getNodeById(e) : e
              , a = this.store.getSchema(t.id);
            return {
                node: t,
                id: t.id,
                info: t.info,
                path: t.path,
                schemaPath: t.schemaPath,
                schema: a,
                data: ""
            }
        }
        ,
        e.prototype.buildJSONSchemaUri = function() {
            var e = this.store.activeId
              , t = "";
            if (e) {
                var a = this.buildEventContext(e)
                  , n = this.trigger("before-resolve-json-schema", a);
                if (t = n.context.data,
                !n.prevented) {
                    this.plugins.forEach((function(e) {
                        var n;
                        if (!t) {
                            var l = null === (n = e.buildJSONSchema) || void 0 === n ? void 0 : n.call(e, a);
                            l && (t = l)
                        }
                    }
                    )),
                    a.data = t;
                    var l = this.trigger("after-resolve-json-schema", a);
                    t = l.data
                }
            }
            this.store.setJSONSchemaUri(t)
        }
        ,
        e.prototype.buildToolbars = function() {
            var e = this.store.activeId
              , t = [];
            if (e) {
                var a = this.buildEventContext(e);
                this.plugins.forEach((function(e) {
                    var l, i = n.__assign({}, a);
                    null === (l = e.buildEditorToolbar) || void 0 === l || l.call(e, i, t)
                }
                ))
            }
            this.store.setActiveToolbars(t.map((function(e) {
                return n.__assign(n.__assign({}, e), {
                    order: e.order || 0,
                    id: r.guid()
                })
            }
            )))
        }
        ,
        e.prototype.collectPanels = function(e, t) {
            void 0 === t && (t = !1);
            var a = [];
            if (e) {
                var l = this.buildEventContext(e);
                this.plugins.forEach((function(e) {
                    var t;
                    null === (t = e.buildEditorPanel) || void 0 === t || t.call(e, l, a)
                }
                )),
                t && this.trigger("build-panels", n.__assign(n.__assign({}, l), {
                    data: a
                }))
            }
            return a
        }
        ,
        e.prototype.buildPanels = function() {
            var e = this.store.activeId
              , t = [];
            if (e) {
                var a = this.store.getNodeById(e);
                t = a ? this.collectPanels(a, !0) : t
            }
            this.store.setPanels(t.map((function(e) {
                return n.__assign(n.__assign({}, e), {
                    order: e.order || 0
                })
            }
            )))
        }
        ,
        e.prototype.collectRenderers = function(e, t) {
            void 0 === t && (t = this.store.activeContainerId);
            var a = [];
            if (!t)
                return a;
            var l = this.store.getNodeById(t);
            if (!l)
                return a;
            var i = this.store.getSchema(t);
            return this.plugins.forEach((function(t) {
                var o, s = null === (o = t.buildSubRenderers) || void 0 === o ? void 0 : o.call(t, {
                    node: l,
                    id: l.id,
                    info: l.info,
                    path: l.path,
                    schemaPath: l.schemaPath,
                    schema: i,
                    region: e
                }, a);
                s && (Array.isArray(s) ? s : [s]).forEach((function(e) {
                    return a.push(n.__assign(n.__assign({}, e), {
                        id: r.guid(),
                        plugin: t,
                        parent: l.info,
                        order: e.order || 0
                    }))
                }
                ))
            }
            )),
            a
        }
        ,
        e.prototype.buildRenderers = function(e) {
            this.store.setSubRenderers(this.collectRenderers(e)),
            this.store.changeSubRendererRegion(e || "")
        }
        ,
        e.prototype.rebuild = function() {
            this.buildPanels(),
            this.buildRenderers(),
            this.buildToolbars()
        }
        ,
        e.prototype.switchToRegion = function(e) {
            this.store.activeId && this.buildRenderers(e)
        }
        ,
        e.prototype.showInsertPanel = function(e, t, a, n, l, i) {
            var r, o, s;
            if (void 0 === t && (t = this.store.activeId),
            void 0 === n && (n = "insert"),
            void 0 === l && (l = ""),
            void 0 === a && t) {
                var d = this.store.getNodeById(t);
                a = null === (s = null === (o = null === (r = null == d ? void 0 : d.info) || void 0 === r ? void 0 : r.regions) || void 0 === o ? void 0 : o.find((function(t) {
                    return t.key === e
                }
                ))) || void 0 === s ? void 0 : s.preferTag
            }
            this.store.setInsertRenderers(this.collectRenderers(e, t)),
            this.store.setInsertRegion(e, t, a, n, l, i)
        }
        ,
        e.prototype.showReplacePanel = function(e, t) {
            var a = this.store.getNodeById(e)
              , n = null == a ? void 0 : a.parent;
            if (a && n && n.isRegion && n.parent) {
                var l = n.parent;
                this.showInsertPanel(n.region, l.id, t, "replace", a.id)
            }
        }
        ,
        e.prototype.on = function(e, t) {
            this.listeners.push({
                type: e,
                fn: t
            })
        }
        ,
        e.prototype.off = function(e, t) {
            var a = h.default(this.listeners, (function(a) {
                return a.type === e && a.fn === t
            }
            ));
            ~a && this.listeners.splice(a, 1)
        }
        ,
        e.prototype.trigger = function(e, t) {
            var a, n, l = i.createEvent(e, t), o = r.camelize(/^(?:before|after)/.test(e) ? e : "on-" + e), s = this.listeners.filter((function(t) {
                return t.type === e
            }
            ));
            return this.plugins.forEach((function(t) {
                return t[o] && s.push({
                    type: e,
                    fn: t[o].bind(t)
                })
            }
            )),
            s.some((function(e) {
                var t = e.fn.call(null, l);
                return !1 === t ? (l.preventDefault(),
                l.stopPropagation()) : void 0 !== t && l.setData(t),
                l.stoped
            }
            )),
            l.stoped || !1 !== (null === (n = (a = this.config)[o]) || void 0 === n ? void 0 : n.call(a, l)) || (l.preventDefault(),
            l.stopPropagation()),
            l
        }
        ,
        e.prototype.insert = function() {
            return n.__awaiter(this, void 0, void 0, (function() {
                var e, t, a, l, i, r;
                return n.__generator(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return e = this.store,
                        (t = e.selectedInsertRendererInfo) ? (a = e.insertId,
                        l = e.insertRegion,
                        i = e.insertBeforeId,
                        r = t.scaffold || {
                            type: t.type
                        },
                        t.scaffoldForm ? [4, this.scaffold(t.scaffoldForm, r)] : [3, 2]) : [2];
                    case 1:
                        r = n.sent(),
                        n.label = 2;
                    case 2:
                        return this.addChild(a, l, r, i, t) && e.closeInsertPanel(),
                        [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.replace = function() {
            return n.__awaiter(this, void 0, void 0, (function() {
                var e, t, a, l, i, r = this;
                return n.__generator(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return e = this.store,
                        (t = e.selectedInsertRendererInfo) ? (a = e.insertOrigId,
                        l = t.scaffold || {
                            type: t.type
                        },
                        i = e.insertRegion,
                        t.scaffoldForm ? [4, this.scaffold(t.scaffoldForm, l)] : [3, 2]) : [2];
                    case 1:
                        l = n.sent(),
                        n.label = 2;
                    case 2:
                        return this.replaceChild(a, l, t, i) && (e.closeInsertPanel(),
                        setTimeout((function() {
                            r.rebuild()
                        }
                        ), 4)),
                        [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.getEditorInfo = function(e, t, a) {
            var l = null
              , i = a.$$id ? this.store.getSchemaPath(a.$$id) : ""
              , r = {
                renderer: e,
                path: t,
                schemaPath: i,
                schema: a
            }
              , o = this.trigger("before-resolve-editor-info", r);
            return o.prevented ? o.context.data : (this.plugins.some((function(t) {
                var o, s = null === (o = t.getRendererInfo) || void 0 === o ? void 0 : o.call(t, r);
                return !!s && (l = n.__assign(n.__assign({
                    id: a.$$id
                }, s), {
                    plugin: t,
                    renderer: e,
                    schemaPath: i
                }),
                !0)
            }
            )),
            this.trigger("after-resolve-editor-info", n.__assign(n.__assign({}, r), {
                data: l
            })).context.data)
        }
        ,
        e.prototype.panelChangeValue = function(e, t) {
            var a = this.store
              , l = n.__assign(n.__assign({}, this.buildEventContext(a.activeId)), {
                value: e,
                diff: t
            });
            this.trigger("before-update", l).prevented || (a.changeValue(e, t),
            this.trigger("after-update", l))
        }
        ,
        e.prototype.openSubEditor = function(e) {
            this.store.openSubEditor(e)
        }
        ,
        e.prototype.openContextMenu = function(e, t, a) {
            var l = this
              , i = []
              , r = this.buildEventContext(e);
            this.plugins.forEach((function(e) {
                var a, l = n.__assign(n.__assign({}, r), {
                    region: t
                });
                null === (a = e.buildEditorContextMenu) || void 0 === a || a.call(e, l, i)
            }
            )),
            i.length && (this.store.setContextId(e),
            p.openContextMenus({
                x: a.x,
                y: a.y
            }, i, (function() {
                return l.store.setContextId("")
            }
            )))
        }
        ,
        e.prototype.moveUp = function() {
            var e, t = this.store;
            if (t.activeId) {
                var a = t.getNodeById(t.activeId)
                  , l = a.parent
                  , i = a.host
                  , r = this.buildEventContext(i)
                  , o = n.__assign(n.__assign({}, r), {
                    sourceId: a.id,
                    direction: "up",
                    beforeId: null === (e = a.prevSibling) || void 0 === e ? void 0 : e.id,
                    region: l.region
                });
                this.trigger("before-move", o).prevented || (t.moveUp(a.id),
                this.buildToolbars(),
                this.trigger("after-move", o))
            }
        }
        ,
        e.prototype.moveDown = function() {
            var e, t, a = this.store;
            if (a.activeId) {
                var l = a.getNodeById(a.activeId)
                  , i = l.parent
                  , r = l.host
                  , o = this.buildEventContext(r)
                  , s = n.__assign(n.__assign({}, o), {
                    sourceId: l.id,
                    direction: "up",
                    beforeId: null === (t = null === (e = l.nextSibling) || void 0 === e ? void 0 : e.nextSibling) || void 0 === t ? void 0 : t.id,
                    region: i.region
                });
                this.trigger("before-move", s).prevented || (a.moveDown(l.id),
                this.buildToolbars(),
                this.trigger("after-move", s))
            }
        }
        ,
        e.prototype.del = function(e) {
            if (e) {
                var t = this.buildEventContext(e);
                this.trigger("before-delete", t).prevented || (this.store.del(e),
                this.trigger("after-delete", t))
            }
        }
        ,
        e.prototype.duplicate = function(e) {
            this.store.duplicate(e)
        }
        ,
        e.prototype.copy = function(e) {
            var t = this.store.getValueOf(e);
            m.default("/*amis-schema*/" + f.stringify(t)) && p.toast.info("配置项已复制到剪切板")
        }
        ,
        e.prototype.cut = function(e) {
            this.copy(e),
            this.del(e)
        }
        ,
        e.prototype.paste = function(e, t) {
            var a;
            return n.__awaiter(this, void 0, void 0, (function() {
                var l, i;
                return n.__generator(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return [4, null === (a = navigator.clipboard) || void 0 === a ? void 0 : a.readText()];
                    case 1:
                        return "string" == typeof (l = n.sent()) && 0 === l.indexOf("/*amis-schema*/") ? (i = f.parse(l),
                        t ? this.addChild(e, t, i) : this.replaceChild(e, i)) : l ? p.alert("剪切板内容不是有效的数据，请通过编辑器复制节点") : p.alert("剪切板内容为空"),
                        [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.emptyRegion = function(e, t) {
            this.store.emptyRegion(e, t)
        }
        ,
        e.prototype.addChild = function(e, t, a, l, i, r) {
            var o = this.store
              , s = -1
              , d = this.buildEventContext(e);
            if (l) {
                var c = d.schema[t];
                Array.isArray(c) && (s = h.default(c, (function(e) {
                    return (null == e ? void 0 : e.$$id) === l
                }
                )))
            }
            var u = n.__assign(n.__assign({}, d), {
                beforeId: l,
                index: s,
                region: t,
                data: a,
                subRenderer: i,
                dragInfo: r
            })
              , p = this.trigger("before-insert", u);
            return !p.prevented && (o.insertSchema(p),
            this.trigger("after-insert", u),
            !0)
        }
        ,
        e.prototype.move = function(e, t, a, l) {
            var i = this.store
              , r = n.__assign(n.__assign({}, this.buildEventContext(e)), {
                beforeId: l,
                region: t,
                sourceId: a
            })
              , o = this.trigger("before-move", r);
            return !o.prevented && (i.moveSchema(o),
            this.trigger("after-move", r),
            !0)
        }
        ,
        e.prototype.replaceChild = function(e, t, a, l) {
            this.store.getNodeById(e);
            var i = n.__assign(n.__assign({}, this.buildEventContext(e)), {
                data: t,
                subRenderer: a,
                region: l
            })
              , r = this.trigger("before-replace", i);
            return !(r.prevented || !r.context.data) && (this.store.replaceChild(e, r.context.data),
            this.trigger("after-replace", i),
            !0)
        }
        ,
        e.prototype.openConfigPanel = function(e) {
            var t = this.store;
            t.activeId !== e && t.setActiveId(e),
            t.changePanelKey("config", !0)
        }
        ,
        e.prototype.openCodePanel = function(e) {
            var t = this.store;
            t.activeId !== e && t.setActiveId(e),
            t.changePanelKey("code", !0)
        }
        ,
        e.prototype.startDrag = function(e, t) {
            t.persist(),
            this.dnd.startDrag(e, t.nativeEvent)
        }
        ,
        e.prototype.scaffold = function(e, t) {
            return n.__awaiter(this, void 0, void 0, (function() {
                var a = this;
                return n.__generator(this, (function(l) {
                    return [2, new Promise((function(l) {
                        a.store.openScaffoldForm(n.__assign(n.__assign({}, e), {
                            value: e.pipeIn ? e.pipeIn(t, null == t ? void 0 : t.__scaffold) : t,
                            callback: l
                        }))
                    }
                    ))]
                }
                ))
            }
            ))
        }
        ,
        e.prototype.reScaffold = function(e, t, a) {
            return n.__awaiter(this, void 0, void 0, (function() {
                var l;
                return n.__generator(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return [4, this.scaffold(t, a)];
                    case 1:
                        return l = n.sent(),
                        this.replaceChild(e, l),
                        [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.patchSchema = function(e) {
            var t = this;
            if (void 0 === e && (e = !1),
            !this.patching) {
                this.patching = !0;
                var a = function(n) {
                    n.forEach((function(n) {
                        n.uniqueChildren && n.uniqueChildren.length && a(n.uniqueChildren),
                        n.isRegion || n.patch(t.store, e)
                    }
                    ))
                };
                a(this.store.root.children),
                this.patching = !1
            }
        }
        ,
        e.prototype.hackRenderers = function() {
            var e = this
              , t = l.getRenderers()
              , a = [];
            t.forEach((function(t) {
                var n, l = c.default(e.plugins, (function(e) {
                    return e.rendererName && e.rendererName === t.name && (e.regions || e.overrides)
                }
                ));
                if (l) {
                    var i = null === (n = l.regions) || void 0 === n ? void 0 : n.filter((function(e) {
                        return e.renderMethod
                    }
                    ));
                    (null == i ? void 0 : i.length) && a.push({
                        renderer: t,
                        regions: i
                    }),
                    l.overrides && a.push({
                        renderer: t,
                        overrides: l.overrides
                    })
                }
            }
            )),
            a.forEach((function(e) {
                var t = e.regions
                  , a = e.renderer
                  , n = e.overrides;
                return s.hackIn(a, t, n)
            }
            ))
        }
        ,
        e.prototype.makeWrapper = function(e, t) {
            return s.makeWrapper(this, e, t)
        }
        ,
        e.prototype.makeSchemaFormRender = function(e) {
            return s.makeSchemaFormRender(this, e)
        }
        ,
        e.prototype.dispose = function() {
            this.toDispose.forEach((function(e) {
                return e()
            }
            )),
            this.toDispose = [],
            this.listeners.splice(0, this.listeners.length),
            this.lazyPatchSchema.cancel(),
            this.dnd.dispose()
        }
        ,
        n.__decorate([r.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object, Object]), n.__metadata("design:returntype", void 0)], e.prototype, "panelChangeValue", null),
        e
    }();
    t.EditorManager = v
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.BasePlugin = t.createEvent = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4));
    t.createEvent = function(e, t) {
        var a = {
            context: t,
            type: e,
            prevented: !1,
            stoped: !1,
            preventDefault: function() {
                a.prevented = !0
            },
            stopPropagation: function() {
                a.stoped = !0
            },
            get data() {
                return a.context.data
            },
            setData: function(e) {
                a.context.data = e
            }
        };
        return a
    }
    ;
    var i = function() {
        function e(e) {
            this.manager = e
        }
        return e.prototype.getRendererInfo = function(e) {
            var t = e.renderer;
            if (e.schema.$$id && this.name && this.rendererName && this.rendererName === t.name)
                return {
                    name: this.name,
                    regions: this.regions,
                    patchContainers: this.patchContainers,
                    vRendererConfig: this.vRendererConfig,
                    wrapperProps: this.wrapperProps,
                    wrapperResolve: this.wrapperResolve,
                    filterProps: this.filterProps,
                    $schema: this.$schema,
                    renderRenderer: this.renderRenderer,
                    multifactor: this.multifactor
                }
        }
        ,
        e.prototype.buildEditorPanel = function(e, t) {
            var a, l;
            if (e.info.hostId || !this.panelControls && !this.panelControlsCreator || e.info.plugin !== this ? e.info.plugin === this && e.info.hostId && ((null === (a = this.vRendererConfig) || void 0 === a ? void 0 : a.panelControls) || (null === (l = this.vRendererConfig) || void 0 === l ? void 0 : l.panelControlsCreator)) && t.push({
                key: (e.info.multifactor,
                "config"),
                icon: this.vRendererConfig.panelIcon || "fa fa-cog",
                title: this.vRendererConfig.panelTitle || "设置",
                render: this.manager.makeSchemaFormRender({
                    definitions: this.vRendererConfig.panelDefinitions,
                    controls: this.vRendererConfig.panelControlsCreator ? this.vRendererConfig.panelControlsCreator(e) : this.vRendererConfig.panelControls
                })
            }) : t.push({
                key: "config",
                icon: this.panelIcon || "fa fa-cog",
                title: this.panelTitle || "设置",
                render: this.manager.makeSchemaFormRender({
                    definitions: this.panelDefinitions,
                    controls: this.panelControlsCreator ? this.panelControlsCreator(e) : this.panelControls
                })
            }),
            e.info.plugin === this && e.info.multifactor) {
                var i = e.node.sameIdChild;
                if (i)
                    this.manager.collectPanels(i).forEach((function(e) {
                        var a, l;
                        if ("code" === e.key)
                            t.some((function(e) {
                                return "code" === e.key
                            }
                            )) || t.push(e);
                        else if ("renderers" === e.key) {
                            t.some((function(e) {
                                return "renderers" === e.key
                            }
                            )) || t.push(e)
                        } else
                            t.push(n.__assign(n.__assign({}, e), {
                                key: "sub-" + e.key,
                                icon: (null === (l = null === (a = i.info) || void 0 === a ? void 0 : a.plugin) || void 0 === l ? void 0 : l.icon) || e.icon
                            }))
                    }
                    ))
            }
        }
        ,
        e.prototype.buildSubRenderers = function(e, t) {
            if (this.name && this.description)
                return {
                    name: this.name,
                    icon: this.icon,
                    description: this.description,
                    previewSchema: this.previewSchema,
                    tags: this.tags,
                    docLink: this.docLink,
                    type: this.type,
                    scaffold: this.scaffold,
                    scaffoldForm: this.scaffoldForm
                }
        }
        ,
        e.prototype.buildEditorContextMenu = function(e, t) {
            var a, n = this, l = e.id, i = e.schema, r = (e.region,
            e.info), o = this;
            r.plugin === o && (null === (a = o.scaffoldForm) || void 0 === a ? void 0 : a.canRebuild) && t.push({
                label: "快速配置",
                onSelect: function() {
                    return n.manager.reScaffold(l, o.scaffoldForm, i)
                }
            })
        }
        ,
        e.prototype.renderPlaceholder = function(e, t) {
            return l.default.createElement("div", {
                key: t,
                className: "wrapper-sm b-a b-light m-b-sm",
                children: l.default.createElement("span", {
                    className: "text-muted",
                    children: e
                })
            })
        }
        ,
        e
    }();
    t.BasePlugin = i
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.defaultValue = t.valuePipeOut = t.setSchemaTpl = t.getSchemaTpl = void 0;
    var n, l, i = a(0), r = a(6), o = a(9), s = a(5), d = i.__importDefault(a(18)), c = a(4), u = {
        formItemName: {
            label: "字段名",
            name: "name",
            type: "text"
        },
        formItemMode: {
            label: "展示模式",
            name: "mode",
            type: "button-group",
            size: "sm",
            option: "继承",
            pipeIn: m(""),
            options: [{
                label: "继承",
                value: ""
            }, {
                label: "正常",
                value: "normal"
            }, {
                label: "内联",
                value: "inline"
            }, {
                label: "水平",
                value: "horizontal"
            }]
        },
        formItemInline: {
            label: "表单项内联",
            name: "inline",
            type: "switch",
            visibleOn: 'data.mode != "inline"',
            mode: "inline",
            className: "w-full",
            pipeIn: m(!1)
        },
        formItemSize: {
            name: "size",
            label: "控件尺寸",
            type: "button-group",
            size: "sm",
            pipeIn: m("full"),
            options: [{
                label: "极小",
                value: "xs"
            }, {
                label: "小",
                value: "sm"
            }, {
                label: "中",
                value: "md"
            }, {
                label: "大",
                value: "lg"
            }, {
                label: "默认",
                value: ""
            }]
        },
        minLength: {
            name: "minLength",
            type: "number",
            label: "限制最小数量"
        },
        maxLength: {
            name: "maxLength",
            type: "number",
            label: "限制最大数量"
        },
        label: [{
            label: "Label",
            name: "label",
            type: "text",
            hiddenOn: "data.label === false"
        }, {
            name: "label",
            label: "隐藏 Label",
            type: "switch",
            mode: "inline",
            className: "w-full",
            pipeIn: function(e) {
                return !1 === e
            },
            pipeOut: function(e) {
                return !0 !== e && ""
            },
            visibleOn: 'data.mode == "horizontal" && !data.label',
            description: "当 form 为水平布局时有用，可以用来去掉间隔。"
        }],
        placeholder: {
            label: "占位符",
            name: "placeholder",
            type: "text",
            placeholder: "占位符"
        },
        tabs: function(e) {
            return {
                type: "tabs",
                tabsMode: "line",
                contentClassName: "no-border",
                tabs: e.filter((function(e) {
                    return e
                }
                )).map((function(e) {
                    return i.__assign(i.__assign({}, e), {
                        controls: d.default(e.controls)
                    })
                }
                ))
            }
        },
        fieldSet: function(e) {
            return i.__assign(i.__assign({
                collapsable: !0,
                collapsed: !1
            }, e), {
                type: "fieldset",
                title: e.title,
                controls: d.default(e.controls.filter((function(e) {
                    return e
                }
                )))
            })
        },
        clearable: {
            type: "switch",
            name: "clearable",
            mode: "inline",
            className: "w-full",
            label: "启用清除按钮"
        },
        hint: {
            label: "输入提示",
            type: "text",
            name: "hint",
            description: "当输入框获得焦点的时候显示，用来提示用户输入内容。"
        },
        remark: [{
            label: "启用信息提示",
            type: "switch",
            name: "remark",
            mode: "inline",
            className: "w-full",
            description: "在输入控件旁边展示一个 icon，当鼠标放上去时展示详细描述，注意启动后请将控件宽度设置成非占满，否则 icon 显示位置会换行！",
            pipeIn: function(e) {
                return !!e
            },
            pipeOut: function(e) {
                return e ? {
                    icon: "fa fa-question-circle",
                    trigger: ["hover", "focus"],
                    className: "Remark--warning"
                } : null
            }
        }, {
            type: "combo",
            name: "remark",
            className: "no-padder",
            visibleOn: "this.remark",
            multiLine: !0,
            controls: [{
                name: "title",
                type: "text",
                label: "标题"
            }, {
                name: "content",
                type: "textarea",
                label: "内容"
            }, {
                name: "placement",
                type: "button-group",
                size: "xs",
                label: "弹出位置",
                options: [{
                    label: "左",
                    value: "left"
                }, {
                    label: "上",
                    value: "top"
                }, {
                    label: "右",
                    value: "right"
                }, {
                    label: "底",
                    value: "bottom"
                }]
            }, {
                name: "icon",
                label: "图标",
                type: "icon-picker"
            }, {
                name: "className",
                label: "CSS 类名",
                type: "text",
                labelRemark: {
                    trigger: "click",
                    className: "m-l-xs",
                    rootClose: !0,
                    content: '有哪些辅助类 CSS 类名？请前往 <a href="http://amis.baidu.com/v2/docs/style" target="_blank">样式说明</a>，除此之外你可以添加自定义类名，然后在系统配置中添加自定义样式。',
                    placement: "left"
                }
            }, {
                name: "trigger",
                type: "select",
                label: "触发方式",
                multiple: !0,
                pipeIn: function(e) {
                    return Array.isArray(e) ? e.join(",") : []
                },
                pipeOut: function(e) {
                    return e && e.length ? e.split(",") : void 0
                },
                options: [{
                    label: "鼠标悬停",
                    value: "hover"
                }, {
                    label: "聚焦",
                    value: "focus"
                }, {
                    label: "点击",
                    value: "click"
                }]
            }, {
                name: "rootClose",
                visibleOn: '~this.trigger.indexOf("click")',
                label: "点击空白关闭",
                type: "switch"
            }]
        }],
        labelRemark: [{
            label: "启用 Label 信息提示",
            type: "switch",
            name: "labelRemark",
            mode: "inline",
            className: "w-full",
            description: "在 Label 旁边展示一个 icon，当鼠标放上去时展示详细描述",
            visibleOn: "this.label",
            pipeIn: function(e) {
                return !!e
            },
            pipeOut: function(e) {
                return e ? {
                    icon: "fa fa-question-circle",
                    trigger: ["hover", "focus"],
                    className: "Remark--warning"
                } : null
            }
        }, {
            type: "combo",
            name: "labelRemark",
            className: "no-padder",
            visibleOn: "this.labelRemark",
            multiLine: !0,
            controls: [{
                name: "title",
                type: "text",
                label: "标题"
            }, {
                name: "content",
                type: "textarea",
                label: "内容"
            }, {
                name: "placement",
                type: "button-group",
                size: "xs",
                label: "弹出位置",
                options: [{
                    label: "左",
                    value: "left"
                }, {
                    label: "上",
                    value: "top"
                }, {
                    label: "右",
                    value: "right"
                }, {
                    label: "底",
                    value: "bottom"
                }]
            }, {
                name: "icon",
                label: "图标",
                type: "icon-picker"
            }, {
                name: "className",
                label: "CSS 类名",
                type: "text"
            }, {
                name: "trigger",
                type: "select",
                label: "触发方式",
                multiple: !0,
                pipeIn: function(e) {
                    return Array.isArray(e) ? e.join(",") : []
                },
                pipeOut: function(e) {
                    return e && e.length ? e.split(",") : void 0
                },
                options: [{
                    label: "鼠标悬停",
                    value: "hover"
                }, {
                    label: "聚焦",
                    value: "focus"
                }, {
                    label: "点击",
                    value: "click"
                }]
            }, {
                name: "rootClose",
                visibleOn: '~this.trigger.indexOf("click")',
                label: "点击空白关闭",
                type: "switch"
            }]
        }],
        expression: {
            type: "text",
            description: "支持 JS 表达式，如：`this.xxx == 1`"
        },
        icon: {
            label: "图标",
            type: "icon-picker",
            name: "icon",
            placeholder: "点击选择图标",
            clearable: !0,
            description: ""
        },
        size: {
            label: "控件尺寸",
            type: "button-group",
            name: "size",
            size: "sm",
            clearable: !0,
            options: [{
                label: "极小",
                value: "xs"
            }, {
                label: "小",
                value: "sm"
            }, {
                label: "中",
                value: "md"
            }, {
                label: "大",
                value: "lg"
            }]
        },
        name: {
            label: "名字",
            name: "name",
            type: "text",
            description: "需要联动时才需要，其他组件可以通过这个名字跟当前组件联动",
            placeholder: "请输入字母或者数字"
        },
        reload: {
            label: "刷新目标组件",
            name: "reload",
            type: "text",
            description: "可以指定操作完成后刷新目标组件，请填写目标组件的 <code>name</code> 属性，多个组件请用<code>,</code>隔开，如果目标组件为表单项，请先填写表单的名字，再用<code>.</code>连接表单项的名字如：<code>xxForm.xxControl</code>。另外如果刷新目标对象设置为 <code>window</code>，则会刷新整个页面。",
            labelRemark: {
                trigger: "click",
                className: "m-l-xs",
                rootClose: !0,
                content: "设置名字后，当前组件操作完成会触发目标组件（根据设置的名字）的刷新。",
                placement: "left"
            }
        },
        className: {
            label: "CSS 类名",
            type: "ae-classname",
            name: "className",
            labelRemark: {
                trigger: "click",
                className: "m-l-xs",
                rootClose: !0,
                content: '有哪些辅助类 CSS 类名？请前往 <a href="https://baidu.github.io/amis/docs/concepts/style" target="_blank">样式说明</a>，除此之外你可以添加自定义类名，然后在系统配置中添加自定义样式。',
                placement: "left"
            }
        },
        api: function(e) {
            void 0 === e && (e = {});
            var t = e.name
              , a = e.label
              , n = e.value
              , l = e.description
              , o = e.sampleBuilder
              , d = i.__rest(e, ["name", "label", "value", "description", "sampleBuilder"]);
            return i.__assign({
                type: "fieldSet",
                className: "",
                collapsable: !1,
                controls: [{
                    type: "checkbox",
                    label: a || "API",
                    labelRemark: o ? {
                        icon: "",
                        label: "示例",
                        title: "接口返回示例",
                        render: function(e) {
                            return c.createElement(s.Html, {
                                className: "ae-ApiSample",
                                inline: !1,
                                html: "\n                    <pre><code>" + o(e) + "</code></pre>\n                    "
                            })
                        },
                        trigger: "click",
                        className: "m-l-xs",
                        rootClose: !0,
                        placement: "left"
                    } : void 0,
                    option: "高级配置",
                    name: t || "api",
                    mode: "inline",
                    className: "w-full m-b-sm",
                    inputClassName: "pull-right text-sm m-t-sm p-t-none",
                    pipeIn: function(e) {
                        return e && "string" != typeof e
                    },
                    pipeOut: function(e, t) {
                        var a = s.buildApi(t);
                        return e ? {
                            method: a.method,
                            url: a.url
                        } : a.url ? (a.method ? a.method + ":" : "") + a.url : ""
                    }
                }, {
                    name: t || "api",
                    type: "text",
                    value: n,
                    placeholder: "http://",
                    description: l,
                    visibleOn: "!this." + (t || "api") + " || typeof this." + (t || "api") + " === 'string'",
                    className: "m-b-none",
                    labelRemark: {}
                }, {
                    type: "combo",
                    name: t || "api",
                    description: l,
                    syncDefaultValue: !1,
                    multiLine: !0,
                    visibleOn: "this." + (t || "api") + " && typeof this." + (t || "api") + " !== 'string'",
                    className: "m-b-none",
                    messages: {
                        validateFailed: "接口配置中存在错误，请仔细检查！"
                    },
                    pipeIn: function(e) {
                        if ("string" == typeof e) {
                            var t = e
                              , a = "get"
                              , n = /^(raw:|external:)?(get|post|put|patch|delete):(.*)$/.exec(t);
                            return n && (t = n[1] + n[3],
                            a = n[2]),
                            {
                                method: a,
                                url: t
                            }
                        }
                        return e
                    },
                    controls: [{
                        label: "发送方式",
                        name: "method",
                        value: "get",
                        type: "button-group",
                        size: "xs",
                        options: ["get", "post", "put", "patch", "delete"]
                    }, {
                        label: "接口地址",
                        type: "text",
                        name: "url",
                        placeholder: "http://",
                        required: !0
                    }, {
                        type: "switch",
                        label: "数据映射",
                        name: "data",
                        mode: "inline",
                        className: "w-full m-b-xs",
                        pipeIn: function(e) {
                            return !!e
                        },
                        pipeOut: function(e) {
                            return e ? {
                                "&": "$$"
                            } : null
                        }
                    }, {
                        type: "tpl",
                        visibleOn: "!this.data",
                        tpl: '<p class="text-sm text-muted">当没开启数据映射时，发送 API 的时候会发送尽可能多的数据，如果你想自己控制发送的数据，或者需要额外的数据处理，请开启此选项</p>'
                    }, {
                        type: "combo",
                        syncDefaultValue: !1,
                        name: "data",
                        visibleOn: "this.data",
                        descriptionClassName: "help-block text-xs m-b-none",
                        description: '<p>当没开启数据映射时，发送数据自动切成白名单模式，配置啥发送啥，请绑定数据。如：<code>{"a": "\\${a}", "b": 2}</code></p><p>如果希望在默认的基础上定制，请先添加一个 Key 为 `&` Value 为 `\\$$` 作为第一行。</p><div>当值为 <code>__undefined</code>时，表示删除对应的字段，可以结合<code>{"&": "\\$$"}</code>来达到黑名单效果。</div>',
                        multiple: !0,
                        pipeIn: function(e) {
                            if (!r.isObject(e))
                                return e;
                            var t = [];
                            return Object.keys(e).forEach((function(a) {
                                t.push({
                                    key: a || "",
                                    value: "string" == typeof e[a] ? e[a] : JSON.stringify(e[a])
                                })
                            }
                            )),
                            t
                        },
                        pipeOut: function(e) {
                            if (!Array.isArray(e))
                                return e;
                            var t = {};
                            return e.forEach((function(e) {
                                var a = e.key || ""
                                  , n = e.value;
                                try {
                                    n = JSON.parse(n)
                                } catch (e) {}
                                t[a] = n
                            }
                            )),
                            t
                        },
                        controls: [{
                            placeholder: "Key",
                            type: "text",
                            unique: !0,
                            name: "key",
                            required: !0,
                            columnClassName: "w-xs"
                        }, {
                            placeholder: "Value",
                            type: "text",
                            name: "value"
                        }]
                    }, {
                        label: "发送条件",
                        type: "text",
                        name: "sendOn",
                        placeholder: '如：this.type == "123"',
                        description: "用表达式来设置该请求的发送条件"
                    }, {
                        type: "switch",
                        label: "是否设置缓存",
                        name: "cache",
                        mode: "inline",
                        className: "w-full m-b-xs",
                        description: "设置该请求缓存的有效时间",
                        pipeIn: function(e) {
                            return !!e
                        },
                        pipeOut: function(e) {
                            return e ? 3e3 : void 0
                        }
                    }, {
                        type: "number",
                        name: "cache",
                        mode: "inline",
                        min: 0,
                        step: 500,
                        visibleOn: "this.cache",
                        pipeIn: function(e) {
                            return "number" == typeof e ? e : 0
                        }
                    }, {
                        label: "文件下载",
                        type: "switch",
                        name: "responseType",
                        mode: "inline",
                        className: "block",
                        pipeIn: function(e) {
                            return "blob" === e
                        },
                        pipeOut: function(e) {
                            return e ? "blob" : void 0
                        },
                        description: "当接口为二进制文件下载时请勾选，否则会文件乱码。"
                    }, {
                        label: "数据格式",
                        type: "button-group",
                        name: "dataType",
                        description: '发送体格式为：<%= data.dataType === "json" ? "application/json" : data.dataType === "form-data" ? "multipart/form-data" : data.dataType === "form" ? "application/x-www-form-urlencoded" : "" %>，当发送内容中存在文件时会自动使用 form-data 格式。',
                        size: "sm",
                        className: "block",
                        mode: "inline",
                        options: [{
                            label: "JSON",
                            value: "json"
                        }, {
                            label: "FormData",
                            value: "form-data"
                        }, {
                            label: "Form",
                            value: "form"
                        }]
                    }, {
                        type: "switch",
                        label: "数据替换",
                        name: "replaceData",
                        mode: "inline",
                        className: "w-full",
                        description: "默认数据都是追加方式，开启这个后是完全替换"
                    }, {
                        title: "自定义适配器",
                        type: "fieldSet",
                        className: "m-b-none",
                        size: "sm",
                        collapsable: !0,
                        collapsedOn: "!this.requestAdaptor && !this.adaptor",
                        controls: [{
                            name: "requestAdaptor",
                            type: "js-editor",
                            label: "发送适配器",
                            description: "函数签名：(api) => api， 数据在 api.data 中，修改后返回 api 对象。"
                        }, {
                            name: "adaptor",
                            type: "js-editor",
                            label: "接收适配器",
                            description: "函数签名: (payload, response, api) => payload"
                        }]
                    }]
                }]
            }, d)
        },
        source: function(e) {
            return void 0 === e && (e = {}),
            p("api", i.__assign({
                name: "source",
                label: "获取选项接口",
                description: "可以通过接口获取动态选项，一次拉取全部。",
                sampleBuilder: function(e) {
                    return JSON.stringify({
                        status: 0,
                        msg: "",
                        data: {
                            options: [{
                                label: "选项A",
                                value: "a"
                            }, {
                                label: "选项B",
                                value: "b"
                            }]
                        }
                    }, null, 2)
                }
            }, e))
        },
        apiString: {
            name: "api",
            type: "text",
            placeholder: "http://"
        },
        required: {
            name: "required",
            type: "switch",
            mode: "inline",
            className: "w-full",
            label: "是否必填"
        },
        description: {
            name: "description",
            type: "textarea",
            label: "描述",
            pipeIn: function(e, t) {
                return e || t.desc || ""
            }
        },
        options: {
            label: "选项 Options",
            name: "options",
            type: "combo",
            multiple: !0,
            draggable: !0,
            addButtonText: "新增选项",
            scaffold: {
                label: "",
                value: ""
            },
            pipeIn: function(e) {
                return s.normalizeOptions(e)
            },
            controls: [{
                type: "text",
                name: "label",
                placeholder: "名称",
                required: !0
            }, {
                type: "text",
                name: "value",
                placeholder: "值",
                unique: !0
            }]
        },
        tree: {
            label: "选项 Options",
            name: "options",
            type: "combo",
            multiple: !0,
            draggable: !0,
            addButtonText: "新增选项",
            description: "静态数据暂不支持多级，请切换到代码模式，或者采用 source 接口获取。",
            scaffold: {
                label: "",
                value: ""
            },
            controls: [{
                type: "text",
                name: "label",
                placeholder: "名称",
                required: !0
            }, {
                type: "text",
                name: "value",
                placeholder: "值",
                unique: !0
            }]
        },
        horizontalMode: {
            label: "左右占比设置",
            name: "horizontal",
            type: "switch",
            option: "继承",
            mode: "inline",
            className: "w-full",
            inputClassName: "text-sm",
            visibleOn: 'this.mode == "horizontal" && this.label !== false',
            pipeIn: function(e) {
                return !e
            },
            pipeOut: function(e, t, a) {
                return e ? null : a.formHorizontal
            }
        },
        horizontal: {
            type: "combo",
            syncDefaultValue: !1,
            name: "horizontal",
            multiLine: !0,
            pipeIn: function(e) {
                return {
                    leftRate: e && "number" == typeof e.left ? e.left : e && /\bcol\-(?:xs|sm|md|lg)\-(\d+)\b/.test(e.left) ? parseInt(RegExp.$1, 10) : 2,
                    leftFixed: e && e.leftFixed || ""
                }
            },
            pipeOut: function(e) {
                var t = Math.min(11, Math.max(1, e.leftRate || 2));
                return {
                    leftFixed: e.leftFixed || "",
                    left: t,
                    right: 12 - t
                }
            },
            inputClassName: "no-padder",
            controls: [{
                name: "leftFixed",
                type: "button-group",
                label: "左侧宽度",
                size: "xs",
                options: [{
                    label: "比率",
                    value: ""
                }, {
                    label: "小宽度",
                    value: "sm",
                    visibleOn: "this.leftFixed"
                }, {
                    label: "固定宽度",
                    value: "normal"
                }, {
                    label: "大宽度",
                    value: "lg",
                    visibleOn: "this.leftFixed"
                }]
            }, {
                name: "leftRate",
                type: "range",
                visibleOn: "!this.leftFixed",
                min: 1,
                max: 11,
                step: 1,
                label: "左右分布调整(n/12)",
                labelRemark: {
                    trigger: "click",
                    className: "m-l-xs",
                    rootClose: !0,
                    content: "一共 12 等份，这里可以设置左侧宽度占比 n/12。",
                    placement: "left"
                }
            }]
        },
        validations: (n = [{
            label: "邮箱格式",
            value: "isEmail"
        }, {
            label: "Url格式",
            value: "isUrl"
        }, {
            label: "数字",
            value: "isNumeric"
        }, {
            label: "字母",
            value: "isAlpha"
        }, {
            label: "字母和数字",
            value: "isAlphanumeric"
        }, {
            label: "整型数字",
            value: "isInt"
        }, {
            label: "浮点型数字",
            value: "isFloat"
        }, {
            label: "固定长度",
            value: "isLength"
        }, {
            label: "最大长度",
            value: "maxLength"
        }, {
            label: "最小长度",
            value: "minLength"
        }, {
            label: "最大值",
            value: "maximum"
        }, {
            label: "最小值",
            value: "minimum"
        }, {
            label: "JSON格式",
            value: "isJson"
        }, {
            label: "不为空",
            value: "notEmptyString"
        }, {
            label: "与指定值相同",
            value: "equals"
        }, {
            label: "与指定字段值相同",
            value: "equalsField"
        }, {
            label: "自定义正则",
            value: "matchRegexp"
        }, {
            label: "自定义正则2",
            value: "matchRegexp1"
        }, {
            label: "自定义正则3",
            value: "matchRegexp2"
        }, {
            label: "自定义正则4",
            value: "matchRegexp3"
        }, {
            label: "自定义正则5",
            value: "matchRegexp4"
        }],
        l = ["isEmail", "isUrl", "isNumeric", "isAlpha", "isAlphanumeric", "isInt", "isFloat", "isJson"],
        {
            type: "combo",
            syncDefaultValue: !1,
            name: "validations",
            label: "验证规则",
            addButtonText: "新增规则",
            multiple: !0,
            pipeIn: function(e) {
                if ("string" == typeof e && e && (e = s.str2rules(e)),
                !r.isObject(e))
                    return e;
                var t = [];
                return Object.keys(e).forEach((function(a) {
                    var n;
                    /^\$\$/.test(a) || t.push(((n = {
                        type: a
                    })[a] = Array.isArray(e[a]) ? e[a][0] : e[a],
                    n))
                }
                )),
                t
            },
            pipeOut: function(e) {
                if (!Array.isArray(e))
                    return e;
                var t = {};
                return e.forEach((function(e) {
                    var a, i = e.type || ((a = o(n, (function(e) {
                        return !t[e.value]
                    }
                    ))) ? a.value : "") || n[0].value;
                    t[i] = e[i] || !!~l.indexOf(i) || ""
                }
                )),
                t
            },
            controls: [{
                type: "select",
                unique: !0,
                name: "type",
                options: n,
                columnClassName: "w-sm"
            }, {
                type: "number",
                name: "isLength",
                visibleOn: 'data.type == "isLength"',
                placeholder: "设置长度",
                value: "1"
            }, {
                type: "number",
                name: "maximum",
                visibleOn: 'data.type == "maximum"',
                placeholder: "设置最大值"
            }, {
                type: "number",
                name: "minimum",
                visibleOn: 'data.type == "minimum"',
                placeholder: "设置最大值"
            }, {
                type: "number",
                name: "maxLength",
                visibleOn: 'data.type == "maxLength"',
                placeholder: "设置最大长度值"
            }, {
                type: "number",
                name: "minLength",
                visibleOn: 'data.type == "minLength"',
                placeholder: "设置最小长度值"
            }, {
                type: "text",
                name: "equals",
                visibleOn: 'data.type == "equals"',
                placeholder: "设置值",
                value: ""
            }, {
                type: "text",
                name: "equalsField",
                visibleOn: 'data.type == "equalsField"',
                placeholder: "设置字段名",
                value: ""
            }, {
                type: "text",
                name: "matchRegexp",
                visibleOn: 'data.type == "matchRegexp"',
                placeholder: "设置正则规则"
            }, {
                type: "text",
                name: "matchRegexp1",
                visibleOn: 'data.type == "matchRegexp1"',
                placeholder: "设置正则规则"
            }, {
                type: "text",
                name: "matchRegexp2",
                visibleOn: 'data.type == "matchRegexp2"',
                placeholder: "设置正则规则"
            }, {
                type: "text",
                name: "matchRegexp3",
                visibleOn: 'data.type == "matchRegexp3"',
                placeholder: "设置正则规则"
            }, {
                type: "text",
                name: "matchRegexp4",
                visibleOn: 'data.type == "matchRegexp4"',
                placeholder: "设置正则规则"
            }]
        }),
        validationErrors: function() {
            var e = [{
                label: "邮箱格式",
                value: "isEmail"
            }, {
                label: "Url格式",
                value: "isUrl"
            }, {
                label: "数字",
                value: "isNumeric"
            }, {
                label: "字母",
                value: "isAlpha"
            }, {
                label: "字母和数字",
                value: "isAlphanumeric"
            }, {
                label: "整型数字",
                value: "isInt"
            }, {
                label: "浮点型数字",
                value: "isFloat"
            }, {
                label: "固定长度",
                value: "isLength"
            }, {
                label: "最大长度",
                value: "maxLength"
            }, {
                label: "最小长度",
                value: "minLength"
            }, {
                label: "最大值",
                value: "maximum"
            }, {
                label: "最小值",
                value: "minimum"
            }, {
                label: "JSON格式",
                value: "isJson"
            }, {
                label: "不为空",
                value: "notEmptyString"
            }, {
                label: "与指定值相同",
                value: "equals"
            }, {
                label: "与指定字段值相同",
                value: "equalsField"
            }, {
                label: "自定义正则",
                value: "matchRegexp"
            }, {
                label: "自定义正则2",
                value: "matchRegexp1"
            }, {
                label: "自定义正则3",
                value: "matchRegexp2"
            }, {
                label: "自定义正则4",
                value: "matchRegexp3"
            }, {
                label: "自定义正则5",
                value: "matchRegexp4"
            }]
              , t = {
                isEmail: "Email 格式不正确",
                isRequired: "这是必填项",
                isUrl: "Url 格式不正确",
                isInt: "请输入整形数字",
                isAlpha: "请输入字母",
                isNumeric: "请输入数字",
                isAlphanumeric: "请输入字母或者数字",
                isFloat: "请输入浮点型数值",
                isWords: "请输入字母",
                isUrlPath: "只能输入字母、数字、`-` 和 `_`.",
                matchRegexp: "格式不正确, 请输入符合规则为 `$1` 的内容。",
                minLength: "请输入更多的内容，至少输入 $1 个字符。",
                maxLength: "请控制内容长度, 请不要输入 $1 个字符以上",
                maximum: "当前输入值超出最大值 $1，请检查",
                minimum: "当前输入值低于最小值 $1，请检查",
                isJson: "请检查 Json 格式。",
                isLength: "请输入长度为 $1 的内容",
                notEmptyString: "请不要全输入空白字符",
                equalsField: "输入的数据与 $1 值不一致",
                equals: "输入的数据与 $1 不一致"
            };
            return {
                type: "combo",
                syncDefaultValue: !1,
                name: "validationErrors",
                label: "自定义验证提示",
                description: "自带提示不满足时，可以自定义。",
                addButtonText: "新增提示",
                multiple: !0,
                pipeIn: function(e) {
                    if (!r.isObject(e))
                        return e;
                    var t = [];
                    return Object.keys(e).forEach((function(a) {
                        /^\$\$/.test(a) || t.push({
                            type: a,
                            msg: e[a]
                        })
                    }
                    )),
                    t
                },
                pipeOut: function(a) {
                    if (!Array.isArray(a))
                        return a;
                    var n = {};
                    return a.forEach((function(a) {
                        var l, i = a.type || ((l = o(e, (function(e) {
                            return !n[e.value]
                        }
                        ))) ? l.value : "") || e[0].value;
                        n[i] = a.msg || t[i] || ""
                    }
                    )),
                    n
                },
                controls: [{
                    type: "select",
                    unique: !0,
                    name: "type",
                    options: e,
                    columnClassName: "w-sm"
                }, {
                    type: "text",
                    name: "msg",
                    placeholder: "提示信息"
                }, {
                    type: "formula",
                    name: "msg",
                    initSet: !1,
                    formula: "({\n                        isEmail: 'Email 格式不正确',\n                        isRequired: '这是必填项',\n                        isUrl: 'Url 格式不正确',\n                        isInt: '请输入整形数字',\n                        isAlpha: '请输入字母',\n                        isNumeric: '请输入数字',\n                        isAlphanumeric: '请输入字母或者数字',\n                        isFloat: '请输入浮点型数值',\n                        isWords: '请输入字母',\n                        isUrlPath: '只能输入字母、数字、`-` 和 `_`.',\n                        matchRegexp: '格式不正确, 请输入符合规则为 `$1` 的内容。',\n                        minLength: '请输入更多的内容，至少输入 $1 个字符。',\n                        maxLength: '请控制内容长度, 请不要输入 $1 个字符以上',\n                        maximum: '当前输入值超出最大值 $1，请检查',\n                        minimum: '当前输入值低于最小值 $1，请检查',\n                        isJson: '请检查 Json 格式。',\n                        isLength: '请输入长度为 $1 的内容',\n                        notEmptyString: '请不要全输入空白字符',\n                        equalsField: '输入的数据与 $1 值不一致',\n                        equals: '输入的数据与 $1 不一致'\n                    })[data.type] || ''"
                }]
            }
        }(),
        submitOnChange: {
            label: "修改即提交",
            type: "switch",
            name: "submitOnChange",
            mode: "inline",
            className: "w-full",
            labelRemark: {
                trigger: "click",
                className: "m-l-xs",
                rootClose: !0,
                content: "设置后，表单中每次有修改都会触发提交",
                placement: "left"
            }
        },
        validateOnChange: {
            type: "button-group",
            name: "validateOnChange",
            label: "修改即触发表单验证",
            description: "默认为当表单提交过则每次修改都触发验证。",
            size: "xs",
            mode: "inline",
            className: "w-full",
            options: [{
                label: "默认",
                value: ""
            }, {
                label: "开启",
                value: !0
            }, {
                label: "关闭",
                value: !1
            }],
            pipeIn: m(""),
            pipeOut: function(e) {
                return "" === e ? void 0 : !!e
            }
        },
        visible: {
            type: "fieldSet",
            title: "显隐配置",
            collapsable: !0,
            controls: [{
                label: "设置方式",
                name: "visible",
                type: "button-group",
                size: "xs",
                mode: "inline",
                className: "w-full",
                options: [{
                    label: "静态设置",
                    value: 1
                }, {
                    label: "表达式",
                    value: 2
                }],
                pipeIn: function(e) {
                    return "boolean" == typeof e ? 1 : 2
                },
                pipeOut: function(e) {
                    return 1 === e || ""
                }
            }, {
                type: "switch",
                label: "可见(visible)",
                name: "visible",
                visibleOn: 'typeof this.visible === "boolean"',
                pipeIn: function(e, t) {
                    return !1 !== e && !t.hidden
                },
                mode: "inline",
                className: "w-full m-b-none",
                onChange: function(e, t, a, n) {
                    return n.setValueByName("visibleOn", "")
                }
            }, {
                name: "visibleOn",
                label: "可见表达式(visibleOn)",
                labelRemark: {
                    trigger: "click",
                    className: "m-l-xs",
                    rootClose: !0,
                    content: '纯粹的 JS 语法，this 指向当前数据层。文档：<a href="https://baidu.github.io/amis/docs/concepts/expression">表达式语法</a>',
                    placement: "left"
                },
                placeholder: "如：this.type === 1",
                type: "text",
                visibleOn: 'typeof this.visible !== "boolean"',
                autoComplete: !1,
                pipeIn: function(e, t) {
                    return e || t.hiddenOn && "!(" + t.hiddenOn + ")" || ""
                },
                className: "m-b-none"
            }]
        },
        initFetch: {
            type: "group",
            label: "是否初始加载",
            visibleOn: "this.initApi",
            direction: "vertical",
            className: "m-b-none",
            labelRemark: {
                trigger: "click",
                rootClose: !0,
                className: "m-l-xs",
                content: "当配置初始化接口后，组件初始就会拉取接口数据，可以通过以下配置修改。",
                placement: "left"
            },
            controls: [{
                name: "initFetch",
                type: "radios",
                inline: !0,
                options: [{
                    label: "是",
                    value: !0
                }, {
                    label: "否",
                    value: !1
                }, {
                    label: "表达式",
                    value: ""
                }]
            }, {
                name: "initFetchOn",
                autoComplete: !1,
                visibleOn: 'typeof this.initFetch !== "boolean"',
                type: "text",
                placeholder: "如：this.id 表示有 id 值时初始加载",
                className: "m-t-n-sm"
            }]
        },
        disabled: function(e) {
            return void 0 === e && (e = []),
            {
                type: "fieldSet",
                title: "禁用配置",
                collapsable: !0,
                controls: i.__spreadArrays(e, [{
                    label: "设置方式",
                    name: "disabled",
                    type: "button-group",
                    size: "xs",
                    mode: "inline",
                    className: "w-full",
                    options: [{
                        label: "静态设置",
                        value: 1
                    }, {
                        label: "表达式",
                        value: 2
                    }],
                    pipeIn: function(e) {
                        return "boolean" == typeof e ? 1 : 2
                    },
                    pipeOut: function(e) {
                        return 1 !== e && ""
                    }
                }, {
                    type: "switch",
                    label: "禁用(disabled)",
                    name: "disabled",
                    visibleOn: 'typeof this.disabled === "boolean"',
                    pipeIn: function(e, t) {
                        return !1 !== e && !t.hidden
                    },
                    mode: "inline",
                    className: "w-full m-b-none",
                    onChange: function(e, t, a, n) {
                        return n.setValueByName("disabledOn", "")
                    }
                }, {
                    name: "disabledOn",
                    label: "禁用表达式(disabledOn)",
                    placeholder: "如：this.type === 1",
                    labelRemark: {
                        trigger: "click",
                        className: "m-l-xs",
                        rootClose: !0,
                        content: '纯粹的 JS 语法，this 指向当前数据层。文档：<a href="https://baidu.github.io/amis/docs/concepts/expression">表达式语法</a>',
                        placement: "left"
                    },
                    type: "text",
                    visibleOn: 'typeof this.disabled !== "boolean"',
                    className: "m-b-none"
                }])
            }
        },
        switchDefaultValue: {
            type: "switch",
            name: "value",
            label: "设置默认值",
            mode: "inline",
            className: "w-full",
            pipeIn: function(e) {
                return void 0 !== e
            },
            pipeOut: function(e, t, a) {
                return e ? "" : void 0
            },
            description: "不设置时，根据字段名获取值"
        },
        multiple: {
            label: "多选模式",
            name: "multiple",
            type: "switch",
            mode: "inline",
            className: "w-full"
        },
        joinValues: {
            type: "switch",
            name: "joinValues",
            mode: "inline",
            className: "w-full",
            visibleOn: "data.multiple",
            label: "是否拼接值",
            value: !0,
            description: "开启后将选中的选项 value 的值用连接符拼接起来，作为当前表单项的值。"
        },
        delimiter: {
            type: "text",
            name: "delimiter",
            label: "连接符",
            visibleOn: "data.multiple && data.joinValues",
            pipeIn: m(",")
        },
        extractValue: {
            type: "switch",
            name: "extractValue",
            mode: "inline",
            className: "w-full",
            label: "是否抽取value值",
            visibleOn: "data.joinValues === false",
            pipeIn: m(!1),
            description: "开启后将选中的选项 value 的值封装为数组，作为当前表单项的值。"
        },
        ref: function() {
            return null
        }
    };
    function p(e, t) {
        var a = u[e];
        return "function" == typeof a ? a(t) : a ? t ? i.__assign(i.__assign({}, a), t) : a : null
    }
    function m(e, t) {
        return void 0 === t && (t = !0),
        t ? function(t) {
            return void 0 === t ? e : t
        }
        : function(t) {
            return t || e
        }
    }
    t.getSchemaTpl = p,
    t.setSchemaTpl = function(e, t) {
        u[e] = t
    }
    ,
    t.valuePipeOut = function(e) {
        try {
            if ("undefined" === e)
                return;
            return JSON.parse(e)
        } catch (t) {
            return e
        }
    }
    ,
    t.defaultValue = m
}
, function(e, t) {
    e.exports = require("react")
}
, function(e, t) {
    e.exports = require("amis")
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.patchDiff = t.diff = t.repeatArray = t.reactionWithOldValue = t.camelize = t.removeDragingClass = t.addDragingClass = t.autobind = t.normalizeId = t.persistSet = t.persistGet = t.sortByList = t.blackList = t.createElementFromHTML = t.JSONDuplicate = t.JSONMoveDownById = t.JSONCanMoveDown = t.JSONMoveUpById = t.JSONCanMoveUp = t.JSONMerge = t.JSONDelete = t.JSONUpdate = t.JSONGetParentById = t.JSONGetById = t.JSONGetPathById = t.JSONGetByPath = t.JSONPipeOut = t.JSONPipeIn = t.cleanUndefined = t.__uri = t.omitControls = t.makeHorizontalDeeper = t.noop = t.anyChanged = t.isObject = t.isObjectShallowModified = t.guid = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(40))
      , r = a(22)
      , o = n.__importDefault(a(41))
      , s = l.utils.guid
      , d = l.utils.omitControls
      , c = l.utils.isObjectShallowModified
      , u = l.utils.isObject
      , p = l.utils.anyChanged
      , m = l.utils.noop
      , f = l.utils.makeHorizontalDeeper
      , h = l.utils.findIndex;
    function b(e) {
        return u(e) ? (Object.keys(e).forEach((function(t) {
            void 0 === e[t] && delete e[t]
        }
        )),
        e) : e
    }
    function g(e) {
        if (!u(e) || e.$$typeof)
            return e;
        var t = {}
          , a = !1;
        return e.$$id || (a = !0,
        t.$$id = s()),
        ["visible", "visibleOn", "hidden", "hiddenOn", "toggled"].forEach((function(n) {
            e.hasOwnProperty(n) && (a = !0,
            t[n] = void 0,
            t["$$" + n] = e[n])
        }
        )),
        Object.keys(e).forEach((function(n) {
            var l = e[n];
            if (Array.isArray(l)) {
                var i = !1
                  , r = l.map((function(e) {
                    var t = g(e);
                    return t !== e && (i = !0),
                    t
                }
                ));
                i && (a = !0,
                t[n] = r)
            } else {
                (r = g(l)) !== l && (a = !0,
                t[n] = r)
            }
        }
        )),
        a && (e = b(n.__assign(n.__assign({}, e), t))),
        e
    }
    function v(e, t, a) {
        if (void 0 === t && (t = !1),
        void 0 === a && (a = !1),
        Array.isArray(e)) {
            var l = !1
              , i = e.map((function(e) {
                var a = v(e, t);
                return a !== e && (l = !0),
                a
            }
            ));
            return l ? i : e
        }
        if (!u(e) || e.$$typeof)
            return e;
        var r = !1
          , o = {};
        return e.$$id && (r = !0,
        o.$$id = void 0),
        t || ["visible", "visibleOn", "hidden", "hiddenOn", "toggled"].forEach((function(t) {
            e.hasOwnProperty("$$" + t) && (r = !0,
            o["$$" + t] = void 0,
            o[t] = e["$$" + t])
        }
        )),
        Object.keys(e).forEach((function(n) {
            var l = e[n];
            if (!t && "__" === n.substring(0, 2) && !a)
                return o[n] = void 0,
                void (r = !0);
            var i = v(l, t);
            i !== l && (r = !0,
            o[n] = i)
        }
        )),
        r && (e = b(n.__assign(n.__assign({}, e), o))),
        e
    }
    function y(e, t, a) {
        var n = e;
        return a && a.push(e),
        t.forEach((function(e) {
            n = n[e],
            a && a.push(n)
        }
        )),
        n
    }
    function _(e, t) {
        for (var a = [], n = !1, l = [{
            path: ".",
            data: e
        }], i = function() {
            var e = l.shift()
              , i = e.data
              , r = e.path;
            if (i.$$id === t)
                return n = !0,
                a = r.split(".").filter((function(e) {
                    return e
                }
                )),
                "break";
            Object.keys(i).forEach((function(e) {
                var t = i[e];
                Array.isArray(t) ? t.forEach((function(t, a) {
                    u(t) && l.push({
                        data: t,
                        path: r + "." + e + "." + a
                    })
                }
                )) : u(t) && l.push({
                    data: t,
                    path: r + "." + e
                })
            }
            ))
        }; l.length; ) {
            if ("break" === i())
                break
        }
        return n ? a : null
    }
    function S(e, t, a) {
        void 0 === a && (a = !1);
        var n = _(e, t);
        if (null === n || !n.length)
            return null;
        var l = e
          , i = [l];
        for (n.pop(),
        n.forEach((function(e) {
            l = l[e],
            i.unshift(l)
        }
        )); a && Array.isArray(i[0]); )
            i.shift();
        return i[0]
    }
    t.guid = s,
    t.omitControls = d,
    t.isObjectShallowModified = c,
    t.isObject = u,
    t.anyChanged = p,
    t.noop = m,
    t.makeHorizontalDeeper = f,
    t.__uri = function(e) {
        return e
    }
    ,
    t.cleanUndefined = b,
    t.JSONPipeIn = g,
    t.JSONPipeOut = v,
    t.JSONGetByPath = y,
    t.JSONGetPathById = _,
    t.JSONGetById = function(e, t) {
        var a = _(e, t);
        return null === a ? null : y(e, a)
    }
    ,
    t.JSONGetParentById = S,
    t.JSONUpdate = function(e, t, a, l) {
        void 0 === l && (l = !1);
        var i = _(e, t);
        if (null === i)
            return e;
        var r = []
          , o = y(e, i, r);
        for (r[r.length - 1] = o = n.__assign(n.__assign(n.__assign({}, l ? null : o), a), {
            $$id: t
        }); r.length > 1; ) {
            var s = r.pop();
            Array.isArray(r[r.length - 1]) ? r[r.length - 1] = r[r.length - 1].concat() : r[r.length - 1] = n.__assign({}, r[r.length - 1]),
            r[r.length - 1][i[r.length - 1]] = s
        }
        return r[0]
    }
    ,
    t.JSONDelete = function(e, t, a, l) {
        var i = _(e, t);
        if (null === i)
            return e;
        Array.isArray(a) && a.push.apply(a, i);
        var r = i.pop()
          , o = []
          , s = y(e, i, o);
        for (Array.isArray(s) ? (o[o.length - 1] = s = s.concat(),
        s.splice(r, 1),
        l && !s.length && (o[o.length - 1] = void 0)) : (o[o.length - 1] = s = n.__assign({}, s),
        delete s[r]); o.length > 1; ) {
            var d = o.pop();
            Array.isArray(o[o.length - 1]) ? o[o.length - 1] = o[o.length - 1].concat() : o[o.length - 1] = n.__assign({}, o[o.length - 1]),
            void 0 === d ? delete o[o.length - 1][i[o.length - 1]] : o[o.length - 1][i[o.length - 1]] = d
        }
        return o[0]
    }
    ,
    t.JSONMerge = function e(t, a) {
        if (!u(t) || !u(a))
            return a;
        if (!c(t, a))
            return t;
        var n = {};
        return t.$$id && (n.$$id = t.$$id),
        Object.keys(a).forEach((function(l) {
            Array.isArray(a[l]) && Array.isArray(t[l]) && a[l] !== t[l] ? n[l] = a[l].map((function(a, n) {
                return t[l][n] ? e(t[l][n], a) : a
            }
            )) : void 0 === t[l] ? n[l] = a[l] : n[l] = e(t[l], a[l])
        }
        )),
        n
    }
    ,
    t.JSONCanMoveUp = function(e, t) {
        var a = S(e, t);
        return !(!a || !Array.isArray(a)) && h(a, (function(e) {
            return e.$$id === t
        }
        )) > 0
    }
    ,
    t.JSONMoveUpById = function(e, t) {
        var a = _(e, t);
        if (null === a)
            return e;
        var l = parseInt(a.pop(), 10);
        if (0 === l)
            return e;
        var i = []
          , r = y(e, a, i);
        if (!Array.isArray(r))
            return e;
        i[i.length - 1] = r = r.concat();
        var o = r[l];
        for (r.splice(l, 1),
        r.splice(l - 1, 0, o); i.length > 1; ) {
            var s = i.pop();
            Array.isArray(i[i.length - 1]) ? i[i.length - 1] = i[i.length - 1].concat() : i[i.length - 1] = n.__assign({}, i[i.length - 1]),
            i[i.length - 1][a[i.length - 1]] = s
        }
        return i[0]
    }
    ,
    t.JSONCanMoveDown = function(e, t) {
        var a = S(e, t);
        if (!a || !Array.isArray(a))
            return !1;
        var n = h(a, (function(e) {
            return e.$$id === t
        }
        ));
        return ~n && n < a.length - 1
    }
    ,
    t.JSONMoveDownById = function(e, t) {
        var a = _(e, t);
        if (null === a)
            return e;
        var l = parseInt(a.pop(), 10)
          , i = []
          , r = y(e, a, i);
        if (!(Array.isArray(r) && l < r.length - 1))
            return e;
        i[i.length - 1] = r = r.concat();
        var o = r[l];
        for (r.splice(l, 1),
        r.splice(l + 1, 0, o); i.length > 1; ) {
            var s = i.pop();
            Array.isArray(i[i.length - 1]) ? i[i.length - 1] = i[i.length - 1].concat() : i[i.length - 1] = n.__assign({}, i[i.length - 1]),
            i[i.length - 1][a[i.length - 1]] = s
        }
        return i[0]
    }
    ,
    t.JSONDuplicate = function(e, t) {
        var a = _(e, t);
        if (null === a)
            return e;
        var l = parseInt(a.pop(), 10)
          , i = []
          , r = y(e, a, i);
        if (!Array.isArray(r))
            return e;
        i[i.length - 1] = r = r.concat();
        var o = g(v(r[l]));
        for (r.splice(l + 1, 0, o); i.length > 1; ) {
            var s = i.pop();
            Array.isArray(i[i.length - 1]) ? i[i.length - 1] = i[i.length - 1].concat() : i[i.length - 1] = n.__assign({}, i[i.length - 1]),
            i[i.length - 1][a[i.length - 1]] = s
        }
        return i[0]
    }
    ,
    t.createElementFromHTML = function(e) {
        var t = document.createElement("div");
        return t.innerHTML = e.trim(),
        t.firstChild
    }
    ,
    t.blackList = function(e) {
        return function(t) {
            return !~e.indexOf(t)
        }
    }
    ,
    t.sortByList = function(e, t) {
        var a = t ? "function" == typeof t ? t : function(e) {
            return e[t]
        }
        : function(e) {
            return e
        }
        ;
        return function(t, n) {
            var l = e.indexOf(a(t))
              , i = e.indexOf(a(n));
            return (l = ~l ? l : 999999) > (i = ~i ? i : 999999) ? 1 : l === i ? 0 : -1
        }
    }
    ,
    t.persistGet = function(e, t) {
        var a = localStorage.getItem("amis-editor-" + e);
        return a && (a = JSON.parse(a)),
        a || t
    }
    ,
    t.persistSet = function(e, t) {
        t = JSON.stringify(t),
        localStorage.setItem("amis-editor-" + e, t)
    }
    ,
    t.normalizeId = function(e) {
        return e.replace(/\-[a-z0-9]+$/g, "")
    }
    ,
    t.autobind = l.utils.autobind,
    t.addDragingClass = function(e) {
        for (; e && (e.classList.add("ae-is-draging"),
        !(null == (e = e.parentElement) ? void 0 : e.hasAttribute("data-region"))); )
            ;
    }
    ,
    t.removeDragingClass = function(e) {
        for (; e && (e.classList.remove("ae-is-draging"),
        !(null == (e = e.parentElement) ? void 0 : e.hasAttribute("data-region"))); )
            ;
    }
    ,
    t.camelize = function(e) {
        return e.replace(/\W+(.)/g, (function(e, t) {
            return t.toUpperCase()
        }
        ))
    }
    ,
    t.reactionWithOldValue = function(e, t) {
        var a;
        return r.reaction(e, (function(e) {
            i.default(e, a) || (t(e, a),
            a = e)
        }
        ))
    }
    ,
    t.repeatArray = function(e, t) {
        void 0 === t && (t = 1);
        for (var a = []; t-- > 0; )
            a.push(e);
        return a
    }
    ,
    t.diff = function(e, t, a) {
        return o.default.diff(e, t, a)
    }
    ,
    t.patchDiff = function(e, t) {
        return t ? t.reduce((function(t, a) {
            return function(e, t, a) {
                if (e && Array.isArray(null == a ? void 0 : a.path)) {
                    e = e === t ? n.__assign({}, e) : e;
                    var l = a.path.concat();
                    l.pop(),
                    l.reduce((function(e, t) {
                        var a = e.target
                          , l = e.source[t]
                          , i = a[t];
                        return l === i && (i = Array.isArray(i) ? i.concat() : n.__assign({}, i),
                        a[t] = i),
                        {
                            source: l,
                            target: i
                        }
                    }
                    ), {
                        target: e,
                        source: t
                    }),
                    o.default.applyChange(e, t, a)
                }
                return e
            }(t, e, a)
        }
        ), e) : e
    }
}
, function(e, t) {
    e.exports = require("mobx-react")
}
, function(e, t) {
    e.exports = require("classnames")
}
, function(e, t) {
    e.exports = require("lodash/find")
}
, function(e, t) {
    e.exports = require("lodash/findIndex")
}
, function(e, t) {
    e.exports = require("react-dom")
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.RegionWrapper = void 0;
    var n = a(0)
      , l = a(14)
      , i = n.__importDefault(a(4))
      , r = a(11)
      , o = a(17)
      , s = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.componentWillMount = function() {
            var e = this.context;
            e && (this.editorNode = e.addChild({
                id: e.id,
                label: this.props.label,
                path: e.path + "/" + this.props.name,
                region: this.props.name,
                regionInfo: this.props.regionConfig,
                preferTag: this.props.preferTag
            }))
        }
        ,
        t.prototype.componentDidMount = function() {
            this.markDom(this.editorNode.id, this.props.name, this.props.rendererName)
        }
        ,
        t.prototype.componentDidUpdate = function(e) {
            this.markDom(this.editorNode.id, this.props.name, this.props.rendererName)
        }
        ,
        t.prototype.componentWillUnmount = function() {
            this.editorNode && l.isAlive(this.editorNode) && this.context.removeChild(this.editorNode)
        }
        ,
        t.prototype.markDom = function(e, t, a) {
            var n = r.findDOMNode(this);
            if (n) {
                var l = this.props.wrapperResolve
                  , i = l ? l(n) : n.parentElement;
                i.setAttribute("data-region", t),
                i.setAttribute("data-region-host", e),
                a && i.setAttribute("data-renderer", a)
            }
        }
        ,
        t.prototype.render = function() {
            return i.default.createElement(o.EditorNodeContext.Provider, {
                value: this.editorNode
            }, this.props.children, i.default.createElement("span", {
                className: "ae-Region-Placeholder"
            }))
        }
        ,
        t.contextType = o.EditorNodeContext,
        t
    }(i.default.Component);
    t.RegionWrapper = s
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.VRenderer = void 0;
    var n = a(0)
      , l = a(14)
      , i = n.__importDefault(a(4))
      , r = a(11)
      , o = a(17)
      , s = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.componentWillMount = function() {
            var e = this
              , t = this.props
              , a = (t.data,
            t.path,
            n.__rest(t, ["data", "path"]))
              , l = this.context;
            this.editorNode = l.addChild({
                id: a.id,
                label: a.name,
                path: this.props.path,
                schemaPath: a.schemaPath,
                info: a,
                getData: function() {
                    return e.props.data
                }
            })
        }
        ,
        t.prototype.componentDidMount = function() {
            this.markDom(this.editorNode.id)
        }
        ,
        t.prototype.componentDidUpdate = function() {
            this.markDom(this.editorNode.id)
        }
        ,
        t.prototype.componentWillUnmount = function() {
            l.isAlive(this.editorNode) && this.context.removeChild(this.editorNode)
        }
        ,
        t.prototype.markDom = function(e) {
            var t = r.findDOMNode(this);
            if (t) {
                var a = this.editorNode.info
                  , n = a.wrapperResolve ? a.wrapperResolve(t) : t;
                (Array.isArray(n) ? n : n ? [n] : []).forEach((function(t) {
                    return t.setAttribute("data-editor-id", e)
                }
                ))
            }
        }
        ,
        t.prototype.render = function() {
            return i.default.createElement(o.EditorNodeContext.Provider, {
                value: this.editorNode
            }, this.props.children)
        }
        ,
        t.contextType = o.EditorNodeContext,
        t
    }(i.default.Component);
    t.VRenderer = s
}
, function(e, t) {
    e.exports = require("mobx-state-tree")
}
, function(e, t) {
    e.exports = require("amis/lib/utils/helper")
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.renderThumbToGhost = t.mapReactElement = t.hackIn = t.makeSchemaFormRender = t.makeWrapper = void 0;
    var n = a(0)
      , l = a(23)
      , i = a(14)
      , r = n.__importDefault(a(4))
      , o = a(29)
      , s = n.__importDefault(a(8))
      , d = n.__importDefault(a(49))
      , c = a(12)
      , u = n.__importDefault(a(9))
      , p = a(30)
      , m = a(7)
      , f = a(17)
      , h = n.__importDefault(a(18))
      , b = a(11)
      , g = a(6);
    function v(e) {
        var t, a = e.controls, i = e.definitions, r = e.onChange, o = e.value, d = e.env, c = e.popOverContainer;
        return l.render({
            definitions: i,
            controls: a,
            className: s.default("ae-Settings-content", Array.isArray(a) && a.length && "tabs" === (null === (t = a[0]) || void 0 === t ? void 0 : t.type) ? "only-tabs" : ""),
            wrapperComponent: "div",
            type: "form",
            title: "",
            mode: "normal",
            wrapWithPanel: !1,
            submitOnChange: !0,
            messages: {
                validateFailed: "验证未通过，请仔细检查配置项。"
            }
        }, {
            onSubmit: function(e) {
                return r(e, g.diff(o, e))
            },
            data: o,
            popOverContainer: c
        }, n.__assign({}, d))
    }
    function y(e, t, a, n, l) {
        var i = u.default(a, (function(e) {
            return !e.matchRegion
        }
        ));
        if (i) {
            var o = i.wrapper || c.RegionWrapper;
            return "inner" === i.insertPosition && r.default.isValidElement(t) ? r.default.cloneElement(t, {
                children: r.default.createElement(o, {
                    key: i.key,
                    preferTag: i.preferTag,
                    name: i.key,
                    label: i.label,
                    regionConfig: i,
                    editorStore: l.store,
                    manager: l,
                    children: t.props.children,
                    wrapperResolve: i.wrapperResolve,
                    rendererName: n.renderer.name
                })
            }) : r.default.createElement(o, {
                key: i.key,
                preferTag: i.preferTag,
                name: i.key,
                label: i.label,
                regionConfig: i,
                editorStore: l.store,
                manager: l,
                children: t,
                wrapperResolve: i.wrapperResolve,
                rendererName: n.renderer.name
            })
        }
        if (a.length) {
            var s = function(e, t, a) {
                var n = -1
                  , l = void 0;
                return a.some((function(a, i) {
                    return !!a.matchRegion(t, e) && (n = i,
                    l = a,
                    !0)
                }
                )),
                [l, n]
            }(e, t, a)
              , d = s[0]
              , p = s[1];
            if (d) {
                o = d.wrapper || c.RegionWrapper;
                if (a.splice(p, 1),
                "outter" === d.insertPosition)
                    return r.default.createElement(o, {
                        key: d.key,
                        preferTag: d.preferTag,
                        name: d.key,
                        label: d.label,
                        regionConfig: d,
                        editorStore: l.store,
                        manager: l,
                        children: t,
                        wrapperResolve: d.wrapperResolve
                    });
                if (r.default.isValidElement(t)) {
                    var m = t.props.children;
                    return r.default.cloneElement(t, {
                        children: r.default.createElement(o, {
                            key: d.key,
                            preferTag: d.preferTag,
                            name: d.key,
                            label: d.label,
                            regionConfig: d,
                            editorStore: l.store,
                            manager: l,
                            children: m,
                            wrapperResolve: d.wrapperResolve
                        })
                    })
                }
            } else if (r.default.isValidElement(t) && t.props.children) {
                m = t.props.children;
                return m = Array.isArray(m) ? m.map((function(t) {
                    return y(e, t, a, n, l)
                }
                )) : y(e, m, a, n, l),
                r.default.cloneElement(t, {
                    children: m
                })
            }
        }
        return t
    }
    t.makeWrapper = function(e, t, a) {
        var l = e.store
          , s = a.component;
        return function(e) {
            function a() {
                return null !== e && e.apply(this, arguments) || this
            }
            return n.__extends(a, e),
            a.prototype.componentWillMount = function() {
                var e = this
                  , a = this.context || l.root;
                this.editorNode = t.id ? a.addChild({
                    id: t.id,
                    label: t.name,
                    path: this.props.$path,
                    schemaPath: t.schemaPath,
                    info: t,
                    getData: function() {
                        return e.props.data
                    }
                }) : void 0
            }
            ,
            a.prototype.componentWillUnmount = function() {
                this.editorNode && i.isAlive(this.editorNode) && (this.context || l.root).removeChild(this.editorNode)
            }
            ,
            a.prototype.wrapperRef = function(e) {
                for (; null == e ? void 0 : e.getWrappedInstance; )
                    e = e.getWrappedInstance();
                this.editorNode && i.isAlive(this.editorNode) && this.editorNode.setComponent(e)
            }
            ,
            a.prototype.render = function() {
                var e = this.props
                  , a = (e.$$id,
                n.__rest(e, ["$$id"]))
                  , l = t.regions ? p.ContainerWrapper : o.NodeWrapper;
                return r.default.createElement(f.EditorNodeContext.Provider, {
                    value: this.editorNode || this.context
                }, r.default.createElement(l, n.__assign({}, a, {
                    $$editor: t,
                    $$node: this.editorNode,
                    ref: this.wrapperRef
                })))
            }
            ,
            a.displayName = s.displayName,
            a.propsList = (s && s.propsList || []).concat(["$$id", "$$editor"]),
            a.contextType = f.EditorNodeContext,
            n.__decorate([g.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], a.prototype, "wrapperRef", null),
            a = n.__decorate([m.observer], a)
        }(r.default.Component)
    }
    ,
    t.makeSchemaFormRender = function(e, t) {
        var a = n.__assign(n.__assign({}, e.env), {
            session: "schema-form"
        });
        return function(e) {
            var n = e.value
              , l = e.onChange
              , i = e.popOverContainer;
            return r.default.createElement(v, {
                definitions: t.definitions,
                controls: h.default(Array.isArray(t.controls) ? t.controls : [t.controls]),
                value: n,
                onChange: l,
                env: a,
                popOverContainer: i
            })
        }
    }
    ,
    t.hackIn = function(e, t, a) {
        for (var n = e.Renderer; n.ComposedComponent; )
            n = n.ComposedComponent;
        var l = n.prototype;
        if (Array.isArray(t)) {
            var i = d.default(t, (function(e) {
                return e.renderMethod
            }
            ));
            Object.keys(i).forEach((function(e) {
                var t;
                if (!l["__" + e]) {
                    var a, n, r = i[e], o = null === (t = r[0]) || void 0 === t ? void 0 : t.renderMethodOverride;
                    l["__" + e] = l[e],
                    l[e] = (a = l["__" + e],
                    n = (null == o ? void 0 : o(r.concat(), y)) || function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        var a = this.props.$$editor
                          , n = this.super.apply(this, e);
                        if (a && Array.isArray(a.regions) && r.every((function(e) {
                            return u.default(a.regions, (function(t) {
                                return t.key === e.key
                            }
                            ))
                        }
                        ))) {
                            var l = r.concat();
                            return y(this, n, l, a, a.plugin.manager)
                        }
                        return n
                    }
                    ,
                    "function" != typeof a ? a : function() {
                        var e = this.super;
                        this.super = a.bind(this);
                        var t = n.apply(this, arguments);
                        return this.super = e,
                        t
                    }
                    )
                }
            }
            ))
        } else
            a && Object.keys(a).forEach((function(e) {
                var t, n;
                l["__" + e] || (l["__" + e] = l[e],
                l[e] = (t = l["__" + e],
                n = a[e],
                "function" != typeof t ? t : function() {
                    var e = this.super;
                    this.super = t.bind(this);
                    var a = n.apply(this, arguments);
                    return this.super = e,
                    a
                }
                ))
            }
            ))
    }
    ,
    t.mapReactElement = function e(t, a, n) {
        if (!r.default.isValidElement(t))
            return t;
        var l = a(t, n);
        if (l === t && t.props.children) {
            var i = t.props.children;
            if (Array.isArray(i)) {
                var o = []
                  , s = !1;
                i.forEach((function(t, n) {
                    var l = e(t, a, n);
                    l !== t && (s = !0,
                    r.default.isValidElement(l) && !l.key && (l = r.default.cloneElement(l, {
                        key: n
                    }))),
                    o.push(l)
                }
                )),
                s && (l = r.default.cloneElement(l, {
                    children: o
                }))
            } else {
                var d = e(i, a, n);
                d !== i && (l = r.default.cloneElement(l, {
                    children: d
                }))
            }
        }
        return l
    }
    ,
    t.renderThumbToGhost = function(e, t, a, i) {
        e.innerHTML = "";
        var r = t.host.getComponent()
          , o = null == r ? void 0 : r.renderControl;
        b.render(l.render({
            children: function(e) {
                var n = e.render;
                return o ? r.renderControl(a) : n(t.region, a)
            }
        }, {}, n.__assign(n.__assign({}, i), {
            theme: null == r ? void 0 : r.props.theme,
            session: "ghost-thumb"
        }), ""), e);
        var s = e.innerHTML || '<div class="wrapper-sm b-a b-light m-b-sm">功能字段</div>';
        b.unmountComponentAtNode(e),
        e.innerHTML = s
    }
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.EditorNodeContext = t.EditorNode = void 0;
    var n = a(0)
      , l = a(14)
      , i = a(6)
      , r = a(5)
      , o = n.__importDefault(a(4))
      , s = a(10);
    t.EditorNode = l.types.model("EditorNode", {
        parentId: "",
        parentRegion: "",
        id: "",
        label: "",
        info: l.types.maybe(l.types.frozen()),
        regionInfo: l.types.maybe(l.types.frozen()),
        path: "",
        schemaPath: "",
        region: "",
        preferTag: "",
        memberIndex: -1,
        folded: !1,
        patched: !1,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        children: l.types.optional(l.types.array(l.types.late((function() {
            return t.EditorNode
        }
        ))), [])
    }).volatile((function() {
        return {
            getData: l.types.frozen()
        }
    }
    )).views((function(e) {
        return {
            get clickable() {
                var t, a;
                return !1 !== (null === (t = e.info) || void 0 === t ? void 0 : t.editable) || !(null === (a = e.info) || void 0 === a ? void 0 : a.hostId)
            },
            get draggable() {
                var t;
                return !(!this.moveable || !1 === (null === (t = e.info) || void 0 === t ? void 0 : t.draggable))
            },
            get moveable() {
                var t;
                return !(this.isRegion || !1 === (null === (t = e.info) || void 0 === t ? void 0 : t.movable) || !Array.isArray(this.schemaParent) || this.host.memberImmutable(this.parent.region))
            },
            get removable() {
                var t;
                return !(this.isRegion || !1 === (null === (t = e.info) || void 0 === t ? void 0 : t.removable) || !Array.isArray(this.schemaParent) || this.host.memberImmutable(this.parent.region))
            },
            get duplicatable() {
                var t;
                return !(this.isRegion || !1 === (null === (t = e.info) || void 0 === t ? void 0 : t.duplicatable) || !Array.isArray(this.schemaParent) || this.host.memberImmutable(this.parent.region))
            },
            memberImmutable: function(t) {
                var a, n;
                return !!(!0 === (null === (a = e.info) || void 0 === a ? void 0 : a.memberImmutable) || Array.isArray(null === (n = e.info) || void 0 === n ? void 0 : n.memberImmutable) && ~e.info.memberImmutable.indexOf(t))
            },
            get isRegion() {
                return !!e.region
            },
            get childRegions() {
                var t, a, n = this.uniqueChildren.filter((function(e, t, a) {
                    return e.isRegion
                }
                ));
                if (null === (t = e.info) || void 0 === t ? void 0 : t.multifactor) {
                    var l = this.sameIdChild;
                    null === (a = null == l ? void 0 : l.childRegions) || void 0 === a || a.forEach((function(e) {
                        return n.push(e)
                    }
                    ))
                }
                return n
            },
            get uniqueChildren() {
                var t = e.children.filter((function(e, t, a) {
                    return a.findIndex((function(t) {
                        return e.isRegion ? t.id === e.id && t.region === e.region : t.id === e.id
                    }
                    )) === t
                }
                ));
                if (Array.isArray(this.schema)) {
                    var a = this.schema;
                    t = t.sort((function(e, t) {
                        return s(a, (function(t) {
                            return (null == t ? void 0 : t.$$id) === e.id
                        }
                        )) - s(a, (function(e) {
                            return (null == e ? void 0 : e.$$id) === t.id
                        }
                        ))
                    }
                    ))
                }
                return t
            },
            get sameIdChild() {
                var t;
                return null === (t = this.uniqueChildren) || void 0 === t ? void 0 : t.find((function(t) {
                    return !t.isRegion && t.id === e.id
                }
                ))
            },
            get singleRegion() {
                return !(1 !== this.uniqueChildren.length || !this.uniqueChildren[0].isRegion)
            },
            isExists: function(t) {
                return e.children.some((function(e) {
                    return e.id === t
                }
                ))
            },
            getChildById: function(t) {
                return e.children.find((function(e) {
                    return e.id === t
                }
                ))
            },
            get parent() {
                var t = l.getRoot(e).getNodeById(e.parentId, e.parentRegion);
                return "root" !== (null == t ? void 0 : t.id) ? t : null
            },
            get host() {
                var t = l.getRoot(e).getNodeById(e.parentId);
                return "root" !== (null == t ? void 0 : t.id) ? t : null
            },
            get prevSibling() {
                for (var t = this.parent.uniqueChildren, a = t.indexOf(e) - 1; a >= 0 && t[a]; ) {
                    if (t[a].id !== e.id)
                        return t[a];
                    a--
                }
                return null
            },
            get nextSibling() {
                for (var t = this.parent.uniqueChildren, a = t.length, n = t.indexOf(e) + 1; n < a && t[n]; ) {
                    if (t[n].id !== e.id)
                        return t[n];
                    n++
                }
                return null
            },
            get schema() {
                var t = l.getRoot(e).getSchema(e.id);
                return this.isRegion && t && (t = t[e.region]),
                t
            },
            get schemaParent() {
                var t = l.getRoot(e);
                return this.isRegion ? t.getSchema(e.id) : t.getSchemaParentById(e.id)
            }
        }
    }
    )).actions((function(e) {
        var t, a;
        function o(a) {
            var n = Array.isArray(a) ? a : a ? [a] : [];
            if (n.length) {
                t || (t = n[0].closest(".ae-Preview-inner"));
                var l = t.getBoundingClientRect()
                  , i = function(e) {
                    for (var t = e.concat(), a = t.shift().getBoundingClientRect(), n = {
                        left: a.left,
                        top: a.top,
                        width: a.width,
                        height: a.height,
                        right: a.right,
                        bottom: a.bottom
                    }; t.length; ) {
                        var l = t.shift().getBoundingClientRect();
                        n.left = Math.min(n.left, l.left),
                        n.top = Math.min(n.top, l.top),
                        n.right = Math.max(n.right, l.right),
                        n.bottom = Math.max(n.bottom, l.bottom),
                        n.width = n.right - n.left,
                        n.height = n.bottom - n.top
                    }
                    return n
                }(n)
                  , r = i.left - l.left
                  , o = i.top - l.top
                  , s = i.height;
                s && (e.x = r + 0,
                e.y = o + 0,
                e.w = i.width,
                e.h = s)
            }
        }
        return {
            addChild: function(t) {
                return e.children.push(n.__assign(n.__assign({}, t), {
                    parentId: e.id,
                    parentRegion: e.region
                })),
                e.children[e.children.length - 1]
            },
            removeChild: function(t) {
                var a = e.children.findIndex((function(e) {
                    return e === t
                }
                ));
                e.children.splice(a, 1)
            },
            toggleFold: function(t) {
                t.stopPropagation(),
                t.preventDefault(),
                e.folded = !e.folded
            },
            patch: function(t, a) {
                if (void 0 === a && (a = !1),
                !e.patched || a) {
                    e.patched = !0;
                    var l = t
                      , o = e.info;
                    if (!1 !== o.editable) {
                        var s = l.getSchema(o.id)
                          , d = s;
                        (Array.isArray(o.regions) && o.regions.length || Array.isArray(o.patchContainers)) && (d = function e(t, a) {
                            var l = !1
                              , r = {};
                            return a.forEach((function(a) {
                                var n = a.split(".");
                                a = n.shift();
                                var o = t[a];
                                if ("string" == typeof o)
                                    return l = !0,
                                    void (r[a] = [i.JSONPipeIn({
                                        type: "tpl",
                                        tpl: o,
                                        inline: !1
                                    })]);
                                if (Array.isArray(o)) {
                                    var s = !1
                                      , d = o.map((function(t) {
                                        if ("string" == typeof t && t)
                                            return s = !0,
                                            i.JSONPipeIn({
                                                type: "tpl",
                                                tpl: t,
                                                inline: !1
                                            });
                                        if (n.length) {
                                            var a = e(t, [n.join(".")]);
                                            a !== t && (s = !0,
                                            t = a)
                                        }
                                        return t
                                    }
                                    ));
                                    s && (l = !0,
                                    r[a] = d)
                                } else
                                    o && (r[a] = [i.JSONPipeIn(o)],
                                    l = !0)
                            }
                            )),
                            l && (t = n.__assign(n.__assign({}, t), r)),
                            t
                        }(d, o.patchContainers || o.regions.map((function(e) {
                            return e.key
                        }
                        )))),
                        d = r.filterSchema(d, {
                            component: o.renderer.component
                        }),
                        (d = i.JSONPipeIn(d)) !== s && l.changeValueById(o.id, d, void 0, !0, !0)
                    }
                }
            },
            setComponent: function(e) {
                a = e
            },
            getComponent: function() {
                return a
            },
            calculateHighlightBox: function(t) {
                var a;
                if (void 0 === t && (t = l.getRoot(e)),
                t.calculateStarted)
                    if (e.isRegion) {
                        o(n = document.querySelector('[data-region="' + e.region + '"][data-region-host="' + e.id + '"]'))
                    } else {
                        var n = [].slice.call(document.querySelectorAll('[data-editor-id="' + e.id + '"]'));
                        o("button" === (null === (a = e.info) || void 0 === a ? void 0 : a.renderer.name) ? null == n ? void 0 : n[0] : n),
                        e.childRegions.forEach((function(e) {
                            return e.calculateHighlightBox(t)
                        }
                        ))
                    }
            },
            resetHighlightBox: function(t) {
                e.x = 0,
                e.y = 0,
                e.w = 0,
                e.h = 0,
                e.childRegions.forEach((function(e) {
                    return e.resetHighlightBox(t)
                }
                ))
            }
        }
    }
    )),
    t.EditorNodeContext = o.default.createContext(null)
}
, function(e, t) {
    e.exports = require("lodash/flatten")
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ButtonPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "button",
            t.$schema = "https://isuda.baidu.com/schemas/ActionSchema.json",
            t.name = "按钮",
            t.description = "用来展示一个按钮，你可以配置不同的展示样式，配置不同的点击行为。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/action",
            t.tags = ["按钮"],
            t.icon = "fa fa-stop-circle",
            t.scaffold = {
                type: "button",
                label: "按钮",
                actionType: "dialog",
                dialog: {
                    title: "系统提示",
                    body: "对你点击了"
                }
            },
            t.previewSchema = {
                type: "button",
                label: "按钮"
            },
            t.panelTitle = "按钮",
            t.panelControlsCreator = function(e) {
                /(?:\/|^)dialog\/.+$/.test(e.path);
                var t = /(?:\/|^)dropdown-button\/.+$/.test(e.path);
                return [r.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        label: "名称",
                        type: "text",
                        name: "label"
                    }, {
                        label: "类型",
                        type: "button-group",
                        name: "type",
                        size: "sm",
                        options: [{
                            label: "按钮",
                            value: "button"
                        }, {
                            label: "提交",
                            value: "submit"
                        }, {
                            label: "重置",
                            value: "reset"
                        }]
                    }, {
                        type: "text",
                        name: "tooltip",
                        hidden: t,
                        label: "提示文案",
                        description: "鼠标停留时弹出该内容"
                    }, {
                        type: "button-group",
                        name: "tooltipPlacement",
                        visibleOn: "data.tooltip || data.disabledTip",
                        label: "提示信息位置",
                        size: "sm",
                        mode: "inline",
                        className: "w-full",
                        value: "bottom",
                        options: [{
                            label: "上",
                            value: "top"
                        }, {
                            label: "右",
                            value: "right"
                        }, {
                            label: "下",
                            value: "bottom"
                        }, {
                            label: "左",
                            value: "left"
                        }]
                    }, r.getSchemaTpl("icon"), {
                        type: "button-group",
                        label: "图标位置",
                        clearable: !0,
                        visibleOn: "this.icon",
                        name: "iconClassName",
                        size: "sm",
                        pipeIn: function(e) {
                            return "string" == typeof e && /\bpull\-(left|right)\b/.test(e) ? RegExp.$1 : ""
                        },
                        pipeOut: function(e, t) {
                            return (t || "").replace(/\bpull\-(left|right)\b/, "").trim() + e ? "pull-" + e : ""
                        },
                        options: [{
                            label: "居左",
                            value: "left"
                        }, {
                            label: "居右",
                            value: "right"
                        }]
                    }, r.getSchemaTpl("size", {
                        label: "尺寸"
                    }), {
                        label: "样式",
                        type: "select",
                        name: "level",
                        hidden: t,
                        clearable: !1,
                        btnActiveLevel: "",
                        options: [{
                            label: "默认",
                            value: "default",
                            level: "default"
                        }, {
                            label: "链接",
                            value: "link",
                            level: "link"
                        }, {
                            label: "主色",
                            value: "primary",
                            level: "primary"
                        }, {
                            label: "淡色",
                            value: "light",
                            level: "light"
                        }, {
                            label: "深色",
                            value: "dark",
                            level: "dark"
                        }, {
                            label: "提示",
                            value: "info",
                            level: "info"
                        }, {
                            label: "成功",
                            value: "success",
                            level: "success"
                        }, {
                            label: "警告",
                            value: "warning",
                            level: "warning"
                        }, {
                            label: "严重",
                            value: "danger",
                            level: "danger"
                        }]
                    }, {
                        name: "block",
                        type: "switch",
                        label: "块状显示",
                        mode: "inline"
                    }, r.getSchemaTpl("className", {
                        label: "按钮 CSS 类名"
                    }), r.getSchemaTpl("className", {
                        name: "iconClassName",
                        label: "图标 CSS 类名",
                        visibleOn: "this.icon"
                    })]
                }, {
                    title: "其他",
                    controls: [r.getSchemaTpl("disabled", [{
                        type: "text",
                        name: "disabledTip",
                        label: "禁用提示信息",
                        hidden: t,
                        description: "按钮被禁用时，鼠标停留弹出该段文字"
                    }]), r.getSchemaTpl("visible")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.filterProps = function(e) {
            return e.disabled = !1,
            e
        }
        ,
        t.prototype.getRendererInfo = function(e) {
            var t = e.renderer
              , a = e.schema;
            if (a.$$id && this.name && this.rendererName && this.rendererName === t.name)
                return {
                    name: a.label ? a.label : this.name,
                    regions: this.regions,
                    patchContainers: this.patchContainers,
                    vRendererConfig: this.vRendererConfig,
                    wrapperProps: this.wrapperProps,
                    wrapperResolve: this.wrapperResolve,
                    filterProps: this.filterProps,
                    $schema: this.$schema,
                    renderRenderer: this.renderRenderer
                }
        }
        ,
        t
    }(i.BasePlugin);
    t.ButtonPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TextControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "text-control",
            t.$schema = "https://isuda.baidu.com/schemas/TextControlSchema.json",
            t.order = -500,
            t.name = "文本框",
            t.description = "配置<code>options</code>可以实现选择选项，效果同<code>select</code>",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/text",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "text",
                label: "文本",
                name: "text"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "文本框",
            t.panelControls = [r.getSchemaTpl("switchDefaultValue"), {
                type: "text",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"'
            }, r.getSchemaTpl("hint"), {
                name: "addOn",
                label: "启用 addOn",
                type: "switch",
                mode: "inline",
                className: "w-full",
                pipeIn: function(e) {
                    return !!e
                },
                pipeOut: function(e) {
                    return e ? {
                        label: "按钮",
                        type: "button"
                    } : null
                }
            }, {
                type: "combo",
                multiLine: !0,
                name: "addOn",
                visibleOn: "data.addOn",
                controls: [{
                    name: "type",
                    label: "类型",
                    type: "button-group",
                    size: "xs",
                    options: [{
                        label: "文本",
                        value: "text"
                    }, {
                        label: "按钮",
                        value: "button"
                    }, {
                        label: "提交",
                        value: "submit"
                    }]
                }, {
                    name: "label",
                    label: "文字",
                    type: "text",
                    visibleOn: 'this.type === "text"'
                }, {
                    name: "icon",
                    label: "Icon",
                    type: "icon-picker",
                    visibleOn: 'this.type === "text"'
                }, r.getSchemaTpl("className", {
                    visibleOn: 'this.type === "text"'
                }), {
                    name: "position",
                    label: "位置",
                    type: "button-group",
                    size: "xs",
                    pipeIn: r.defaultValue("right"),
                    options: [{
                        label: "左边",
                        value: "left"
                    }, {
                        label: "右边",
                        value: "right"
                    }]
                }]
            }, {
                name: "autoComplete",
                label: "自动填充",
                mode: "inline",
                className: "w-full",
                type: "switch",
                pipeIn: function(e) {
                    return !1 !== e
                },
                pipeOut: function(e) {
                    return !!e && ""
                }
            }, r.getSchemaTpl("options", {
                visibleOn: "data.autoComplete !== false",
                description: "设置选项后，输入时会下拉这些选项供用户参考。"
            }), r.getSchemaTpl("source", {
                visibleOn: "data.autoComplete !== false"
            }), r.getSchemaTpl("api", {
                name: "autoComplete",
                label: "自动完成接口",
                description: "每次输入新内容后，将调用接口，根据接口返回更新选项。当前用户输入值在 `\\${term}` 中。",
                visibleOn: "data.autoComplete !== false"
            }), r.getSchemaTpl("multiple", {
                visibleOn: "data.options || data.source || data.autoComplete"
            }), r.getSchemaTpl("joinValues"), r.getSchemaTpl("delimiter"), r.getSchemaTpl("extractValue")],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(i.BasePlugin);
    t.TextControlPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = a(0)
      , l = n.__importStar(a(4))
      , i = n.__importDefault(a(8))
      , r = n.__importDefault(a(27))
      , o = a(6)
      , s = a(44)
      , d = a(1)
      , c = a(55)
      , u = a(22)
      , p = a(34)
      , m = n.__importDefault(a(56))
      , f = a(14)
      , h = a(15)
      , b = a(35)
      , g = function(e) {
        function t(t) {
            var a = e.call(this, t) || this;
            a.isInternalChange = !1;
            var l = t.value
              , i = (t.onChange,
            n.__rest(t, ["value", "onChange"]))
              , r = n.__assign({}, i);
            return a.store = s.EditorStore.create({}, r),
            a.store.setSchema(l),
            a.manager = new d.EditorManager(r,a.store),
            a.unReaction = u.reaction((function() {
                return a.store.schemaRaw
            }
            ), (function(e) {
                a.lastResult = e,
                a.isInternalChange || t.onChange(e)
            }
            )),
            a
        }
        return n.__extends(t, e),
        t.prototype.componentDidMount = function() {
            var e = this.store;
            this.props.autoFocus && setTimeout((function() {
                if (f.isAlive(e)) {
                    var t = h.findTree(e.outline, (function(e) {
                        return !e.isRegion && e.clickable
                    }
                    ));
                    t && e.setActiveId(t.id)
                }
            }
            ), 350)
        }
        ,
        t.prototype.componentDidUpdate = function(e) {
            var t = this.props;
            t.value !== e.value && t.value !== this.lastResult && (this.isInternalChange = !0,
            this.store.setSchema(t.value),
            this.isInternalChange = !1)
        }
        ,
        t.prototype.componentWillUnmount = function() {
            this.unReaction(),
            this.manager.dispose(),
            f.destroy(this.store)
        }
        ,
        t.prototype.handleContextMenu = function(e) {
            var t, a = null === (t = e.target.closest("[data-editor-id]")) || void 0 === t ? void 0 : t.getAttribute("data-editor-id"), n = "";
            if (!a) {
                var l = e.target.closest("[data-node-id]");
                if (!(a = null == l ? void 0 : l.getAttribute("data-node-id")))
                    return;
                n = l.getAttribute("data-node-region")
            }
            e.preventDefault(),
            e.stopPropagation(),
            this.manager.openContextMenu(a, n, {
                x: window.scrollX + e.clientX,
                y: window.scrollY + e.clientY
            })
        }
        ,
        t.prototype.canUndo = function() {
            return this.store.canUndo
        }
        ,
        t.prototype.canRedo = function() {
            return this.store.canRedo
        }
        ,
        t.prototype.undo = function() {
            this.store.undo()
        }
        ,
        t.prototype.redo = function() {
            this.store.redo()
        }
        ,
        t.prototype.render = function() {
            var e = this.props
              , t = e.preview
              , a = e.className
              , o = e.theme
              , s = e.data
              , d = e.previewProps;
            return l.default.createElement("div", {
                className: i.default("ae-Editor", {
                    preview: t
                }, a)
            }, l.default.createElement("div", {
                className: "ae-Editor-inner",
                onContextMenu: this.handleContextMenu
            }, t ? null : l.default.createElement(c.Panels, {
                store: this.store,
                manager: this.manager,
                isLeftPanel: !0
            }), l.default.createElement("div", {
                className: "ae-Main"
            }, t ? null : l.default.createElement(m.default, {
                store: this.store,
                manager: this.manager
            }), l.default.createElement(r.default, n.__assign({}, d, {
                editable: !t,
                store: this.store,
                manager: this.manager,
                theme: o,
                data: s
            }))), t ? null : l.default.createElement(c.Panels, {
                store: this.store,
                manager: this.manager
            })), l.default.createElement(p.SubEditor, {
                store: this.store,
                manager: this.manager,
                theme: o
            }), l.default.createElement(b.ScaffoldModal, {
                store: this.store,
                manager: this.manager,
                theme: o
            }))
        }
        ,
        t.defaultProps = {
            autoFocus: !0
        },
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleContextMenu", null),
        t
    }(l.Component);
    t.default = g
}
, function(e, t) {
    e.exports = require("mobx")
}
, function(e, t) {
    e.exports = require("amis/lib/factory")
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ButtonControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "button-control",
            t.$schema = "https://isuda.baidu.com/schemas/ButtonControlSchema.json",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/button",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "button",
                label: "按钮"
            },
            t.previewSchema = {
                type: "form",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(19).ButtonPlugin);
    t.ButtonControlPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t) {
    e.exports = require("amis/lib/renderers/Form/Editor")
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DatePlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "date-field",
            t.$schema = "https://isuda.baidu.com/schemas/DateSchema.json",
            t.name = "日期展示",
            t.description = "主要用来关联字段名做日期展示，支持各种格式如：X（时间戳），YYYY-MM-DD HH:mm:ss。",
            t.tags = ["展示"],
            t.icon = "fa fa-calendar",
            t.scaffold = {
                type: "date"
            },
            t.previewSchema = n.__assign(n.__assign({}, t.scaffold), {
                format: "YYYY-MM-DD HH:mm:ss",
                value: Math.round(Date.now() / 1e3)
            }),
            t.panelTitle = "日期展示",
            t.panelControlsCreator = function(e) {
                return [r.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        type: "text",
                        name: "format",
                        label: "显示日期格式",
                        description: "请参考 moment 中的格式用法。",
                        pipeIn: r.defaultValue("YYYY-MM-DD")
                    }, {
                        type: "text",
                        name: "valueFormat",
                        label: "数据日期格式",
                        description: "请参考 moment 中的格式用法。",
                        pipeIn: r.defaultValue("X")
                    }, {
                        name: "placeholder",
                        type: "text",
                        pipeIn: r.defaultValue("-"),
                        label: "占位符"
                    }]
                }, {
                    title: "外观",
                    controls: [r.getSchemaTpl("className")]
                }, {
                    title: "其他",
                    controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.DatePlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = a(0)
      , l = a(5)
      , i = n.__importStar(a(4))
      , r = n.__importDefault(a(8))
      , o = a(6)
      , s = a(23)
      , d = a(7)
      , c = a(11)
      , u = n.__importDefault(a(42))
      , p = n.__importDefault(a(28))
      , m = a(43)
      , f = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.id = o.guid(),
            t.env = n.__assign(n.__assign(n.__assign({}, t.props.manager.env), {
                notify: function(e, a) {
                    t.props.editable ? console.warn("[Notify]", e, a) : l.toast[e] ? l.toast[e](a, "error" === e ? "系统错误" : "系统消息") : console.warn("[Notify]", e, a)
                },
                theme: t.props.theme,
                session: "preview-" + t.id,
                rendererResolver: t.rendererResolver.bind(t)
            }), t.props.amisEnv),
            t.unReaction = o.reactionWithOldValue((function() {
                return [t.getHighlightNodes(), t.props.store.activeId]
            }
            ), (function(e, a) {
                var n = e[0]
                  , l = t.props.store;
                setTimeout((function() {
                    t.calculateHighlightBox(n)
                }
                ), 50);
                var i = null == a ? void 0 : a[0];
                Array.isArray(i) && (i = i.filter((function(e) {
                    return !~n.indexOf(e)
                }
                )),
                l.resetHighlightBox(i))
            }
            )),
            t
        }
        return n.__extends(t, e),
        t.prototype.componentDidMount = function() {
            var e = c.findDOMNode(this);
            e.addEventListener("mouseleave", this.handleMouseLeave),
            e.addEventListener("mousemove", this.handleMouseMove),
            e.addEventListener("click", this.handleClick),
            e.addEventListener("mouseover", this.handeMouseOver),
            this.props.manager.on("after-update", this.handlePanelChange)
        }
        ,
        t.prototype.componentWillUnmount = function() {
            var e = this
              , t = c.findDOMNode(this);
            t.removeEventListener("mouseleave", this.handleMouseLeave),
            t.removeEventListener("mousemove", this.handleMouseMove),
            t.removeEventListener("click", this.handleClick),
            t.removeEventListener("mouseover", this.handeMouseOver),
            this.props.manager.off("after-update", this.handlePanelChange),
            setTimeout((function() {
                return s.clearStoresCache([e.env.session])
            }
            ), 500)
        }
        ,
        t.prototype.contentsRef = function(e) {
            var t, a = this;
            e ? (this.layer = e.querySelector(".ae-Preview-widgets"),
            this.unSensor = l.resizeSensor(e, (function() {
                return a.calculateHighlightBox(a.getHighlightNodes())
            }
            ))) : (delete this.layer,
            null === (t = this.unSensor) || void 0 === t || t.call(this),
            delete this.unSensor)
        }
        ,
        t.prototype.handlePanelChange = function() {
            var e = this;
            setTimeout((function() {
                return e.calculateHighlightBox(e.getHighlightNodes())
            }
            ), 50)
        }
        ,
        t.prototype.getHighlightNodes = function() {
            return this.props.store.highlightNodes.map((function(e) {
                return e.id
            }
            ))
        }
        ,
        t.prototype.calculateHighlightBox = function(e) {
            var t = this.props.store;
            this.layer && t.calculateHighlightBox(e)
        }
        ,
        t.prototype.handleClick = function(e) {
            var t, a = this.props.store, n = e.target.closest("[data-editor-id]");
            if (!e.defaultPrevented && (n && a.setActiveId(n.getAttribute("data-editor-id")),
            !(null === (t = this.layer) || void 0 === t ? void 0 : t.contains(e.target)) && this.props.editable)) {
                var l = this.props.manager.trigger("prevent-click", {
                    data: e
                });
                l.prevented || l.stoped || (e.preventDefault(),
                e.stopPropagation())
            }
        }
        ,
        t.prototype.handleMouseMove = function(e) {
            var t, a = this.props.store, n = e.target;
            if (n.closest(".ae-InsertBefore,.ae-InsertAfter"))
                a.setHoverId("");
            else if (!(null === (t = this.layer) || void 0 === t ? void 0 : t.contains(n)) && !n.closest(".ae-AddBtn")) {
                var l = n.closest("[data-editor-id]");
                l && a.setHoverId(l.getAttribute("data-editor-id"))
            }
        }
        ,
        t.prototype.handleMouseLeave = function() {
            this.props.store.setHoverId("")
        }
        ,
        t.prototype.handeMouseOver = function(e) {
            this.props.editable && (e.preventDefault(),
            e.stopPropagation())
        }
        ,
        t.prototype.handleDragEnter = function(e) {
            this.props.manager.dnd.dragEnter(e.nativeEvent)
        }
        ,
        t.prototype.handleDragLeave = function(e) {
            this.props.manager.dnd.dragLeave(e.nativeEvent)
        }
        ,
        t.prototype.handleDragOver = function(e) {
            this.props.manager.dnd.dragOver(e.nativeEvent)
        }
        ,
        t.prototype.handleDrop = function(e) {
            this.props.manager.dnd.drop(e.nativeEvent)
        }
        ,
        t.prototype.rendererResolver = function(e, t, a) {
            var i = this.props
              , r = i.editable
              , o = i.manager
              , s = l.resolveRenderer(e, t, a);
            if (!1 === r)
                return s;
            s = s || {
                name: "error",
                test: function() {
                    return !0
                },
                component: m.ErrorRenderer
            };
            var d = o.getEditorInfo(s, e, t);
            return d && (s = n.__assign(n.__assign({}, s), {
                component: o.makeWrapper(d, s)
            })),
            s
        }
        ,
        t.prototype.render = function() {
            var e = this.props
              , t = e.className
              , a = e.editable
              , o = e.store
              , s = e.manager
              , d = (e.amisEnv,
            e.theme,
            n.__rest(e, ["className", "editable", "store", "manager", "amisEnv", "theme"]));
            return i.default.createElement("div", {
                onDragEnter: this.handleDragEnter,
                onDragLeave: this.handleDragLeave,
                onDragOver: this.handleDragOver,
                onDrop: this.handleDrop,
                className: r.default("ae-Preview", t, a ? "is-edting" : "")
            }, i.default.createElement("div", {
                className: "ae-Preview-inner",
                ref: this.contentsRef
            }, l.render(o.filteredSchema, n.__assign({
                key: a ? "edit-mode" : "preview-mode",
                theme: this.env.theme
            }, d), this.env), i.default.createElement("div", {
                className: "ae-Preview-widgets"
            }, o.highlightNodes.map((function(e) {
                return i.default.createElement(u.default, {
                    node: e,
                    key: e.id,
                    store: o,
                    id: e.id,
                    title: e.label
                }, e.childRegions.map((function(t) {
                    return !e.memberImmutable(t.region) && o.isRegionActive(t.id, t.region) ? i.default.createElement(p.default, {
                        manager: s,
                        key: t.region,
                        store: o,
                        node: t,
                        id: t.id,
                        name: t.region,
                        title: t.label,
                        preferTag: t.preferTag
                    }) : null
                }
                )))
            }
            )))))
        }
        ,
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "contentsRef", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], t.prototype, "handlePanelChange", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Array]), n.__metadata("design:returntype", void 0)], t.prototype, "calculateHighlightBox", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [MouseEvent]), n.__metadata("design:returntype", void 0)], t.prototype, "handleClick", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [MouseEvent]), n.__metadata("design:returntype", void 0)], t.prototype, "handleMouseMove", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], t.prototype, "handleMouseLeave", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [MouseEvent]), n.__metadata("design:returntype", void 0)], t.prototype, "handeMouseOver", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleDragEnter", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleDragLeave", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleDragOver", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleDrop", null),
        t = n.__decorate([d.observer], t)
    }(i.Component);
    t.default = f
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.AddBTNSvg = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = n.__importDefault(a(8))
      , r = a(7)
      , o = a(6);
    t.AddBTNSvg = '<svg viewBox="0 0 12 12">\n<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n  <g id="plus" fill="currentColor" fill-rule="nonzero">\n    <polygon points="6.6 6.6 6.6 12 5.4 12 5.4 6.6 0 6.6 0 5.4 5.4 5.4 5.4 0 6.6 0 6.6 5.4 12 5.4 12 6.6"></polygon>\n  </g>\n</g>\n</svg>';
    var s = function(e) {
        function a(a) {
            var n = e.call(this, a) || this
              , l = n.addBtn = document.createElement("a");
            return l.className = "ae-AddBtn",
            l.innerHTML = t.AddBTNSvg,
            l.addEventListener("click", n.handleClick),
            l.addEventListener("mouseenter", n.handleMouseEnter),
            l.addEventListener("mouseleave", n.handleMouseLeave),
            n
        }
        return n.__extends(a, e),
        a.prototype.componentDidMount = function() {
            this.attachAddBtn()
        }
        ,
        a.prototype.componentDidUpdate = function() {
            this.attachAddBtn()
        }
        ,
        a.prototype.componentWillUnmount = function() {
            var e;
            null === (e = this.addBtn.parentNode) || void 0 === e || e.removeChild(this.addBtn),
            this.addBtn.removeEventListener("click", this.handleClick),
            this.addBtn.removeEventListener("mouseenter", this.handleMouseEnter),
            this.addBtn.removeEventListener("mouseleave", this.handleMouseLeave)
        }
        ,
        a.prototype.attachAddBtn = function() {
            var e = this.props
              , t = e.name
              , a = e.id
              , n = e.store
              , l = document.querySelector('[data-region="' + t + '"][data-region-host="' + a + '"]');
            if (l) {
                var i = n.getNodeById(a);
                if (i && n.isActive(a) && n.panels.some((function(e) {
                    return "renderers" === e.key
                }
                )) && !i.memberImmutable(t)) {
                    var r = [].slice.call(l.children)
                      , o = r.indexOf(this.addBtn);
                    ~o && o === r.length - 1 || l.appendChild(this.addBtn)
                } else
                    this.addBtn.parentElement === l && l.removeChild(this.addBtn)
            }
        }
        ,
        a.prototype.handleClick = function() {
            var e = this.props
              , t = e.store
              , a = e.manager
              , n = e.id
              , l = e.name
              , i = e.preferTag
              , r = t.getNodeById(n);
            r && t.isActive(n) && t.panels.some((function(e) {
                return "renderers" === e.key
            }
            )) && !r.memberImmutable(l) && a.showInsertPanel(l, n, i)
        }
        ,
        a.prototype.handleMouseEnter = function() {
            this.props.store.setHoverId(this.props.id, this.props.name)
        }
        ,
        a.prototype.handleMouseLeave = function() {
            this.props.store.setHoverId(this.props.id, "")
        }
        ,
        a.prototype.render = function() {
            var e = this.props
              , t = e.store
              , a = e.id
              , n = e.name
              , r = e.title
              , o = e.node
              , s = t.isRegionHighlighted(a, n)
              , d = t.isRegionDragEnter(a, n)
              , c = t.getNodeById(a)
              , u = o.x - c.x
              , p = o.y - c.y;
            return l.default.createElement("div", {
                "data-renderer": o.host.info.renderer.name,
                "data-region": n,
                className: i.default("ae-Editor-rhlbox", d ? "is-dragenter" : "", s ? "is-highlight" : ""),
                onClick: this.handleClick,
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave,
                style: {
                    width: o.w,
                    height: o.h,
                    borderWidth: Math.max(0, p) + "px " + Math.max(0, c.w - u - o.w) + "px " + Math.max(0, c.h - p - o.h) + "px " + Math.max(0, u) + "px"
                }
            }, l.default.createElement("div", {
                "data-node-id": a,
                "data-node-region": n,
                className: "region-tip"
            }, r))
        }
        ,
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], a.prototype, "attachAddBtn", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], a.prototype, "handleClick", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], a.prototype, "handleMouseEnter", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], a.prototype, "handleMouseLeave", null),
        a = n.__decorate([r.observer, n.__metadata("design:paramtypes", [Object])], a)
    }(l.default.Component);
    t.default = s
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.NodeWrapper = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(11)
      , r = a(6)
      , o = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.componentDidMount = function() {
            var e = this;
            this.markDom(this.props.$$editor.id),
            setTimeout((function() {
                var t;
                return null === (t = e.props.$$node) || void 0 === t ? void 0 : t.calculateHighlightBox()
            }
            ), 20)
        }
        ,
        t.prototype.componentDidUpdate = function(e) {
            this.markDom(this.props.$$editor.id)
        }
        ,
        t.prototype.getWrappedInstance = function() {
            return this.ref
        }
        ,
        t.prototype.refFn = function(e) {
            this.ref = e
        }
        ,
        t.prototype.markDom = function(e) {
            var t = i.findDOMNode(this);
            if (t && e) {
                var a = this.props.$$editor
                  , n = a.wrapperResolve ? a.wrapperResolve(t) : t;
                (Array.isArray(n) ? n : n ? [n] : []).forEach((function(t) {
                    return t.setAttribute("data-editor-id", e)
                }
                ))
            }
        }
        ,
        t.prototype.render = function() {
            var e = this.props
              , t = e.$$editor
              , a = e.$$node
              , i = n.__rest(e, ["$$editor", "$$node"])
              , r = t.renderer;
            return t.filterProps && (i = t.filterProps.call(t.plugin, i, a)),
            t.renderRenderer ? t.renderRenderer.call(t.plugin, n.__assign(n.__assign(n.__assign(n.__assign({}, i), {
                $$editor: t
            }), t.wrapperProps), {
                ref: this.refFn
            }), t) : l.default.createElement(r.component, n.__assign({}, i, {
                $$editor: t
            }, t.wrapperProps, {
                ref: this.refFn
            }))
        }
        ,
        n.__decorate([r.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "refFn", null),
        t
    }(l.default.Component);
    t.NodeWrapper = o
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ContainerWrapper = void 0;
    var n = a(0)
      , l = a(29)
      , i = n.__importDefault(a(4))
      , r = a(7)
      , o = a(6)
      , s = n.__importDefault(a(9))
      , d = a(12)
      , c = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.getWrappedInstance = function() {
            return this.ref
        }
        ,
        t.prototype.refFn = function(e) {
            this.ref = e
        }
        ,
        t.prototype.renderChild = function(e, t, a) {
            var l = this.props
              , r = l.render
              , o = l.$$editor
              , c = r(e, t, n.__assign(n.__assign({}, a), {
                $$editor: o
            }))
              , u = s.default(o.regions, (function(t) {
                return t.key === e && !t.matchRegion && !t.renderMethod
            }
            ));
            if (u) {
                var p = u.wrapper || d.RegionWrapper;
                return i.default.createElement(p, {
                    key: null == a ? void 0 : a.key,
                    preferTag: u.preferTag,
                    name: u.key,
                    label: u.label,
                    regionConfig: u,
                    editorStore: o.plugin.manager.store,
                    wrapperResolve: u.wrapperResolve,
                    manager: o.plugin.manager,
                    children: c,
                    rendererName: o.renderer.name
                })
            }
            return c
        }
        ,
        t.prototype.render = function() {
            var e = this.props
              , t = e.$$editor
              , a = e.$$node
              , r = n.__rest(e, ["$$editor", "$$node"])
              , o = {}
              , s = t.plugin.manager.store;
            return t.id && (s.isActive(t.id) || s.dropId === t.id) && Array.isArray(t.regions) && t.regions.forEach((function(e) {
                var t = e.key;
                if (!e.optional && !(null == a ? void 0 : a.memberImmutable(t))) {
                    var n = Array.isArray(r[t]) ? r[t].concat() : r[t] ? [r[t]] : [];
                    n.length || n.push({
                        children: function() {
                            return null
                        }
                    }),
                    o[t] = n
                }
            }
            )),
            i.default.createElement(l.NodeWrapper, n.__assign({}, r, o, {
                $$editor: t,
                $$node: a,
                render: this.renderChild,
                ref: this.refFn
            }))
        }
        ,
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "refFn", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [String, Object, Object]), n.__metadata("design:returntype", void 0)], t.prototype, "renderChild", null),
        t = n.__decorate([r.observer], t)
    }(i.default.Component);
    t.ContainerWrapper = c
}
, function(e, t) {
    e.exports = require("lodash/debounce")
}
, function(e, t) {
    e.exports = require("json-ast-comments")
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DefaultDNDMode = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(10))
      , r = a(16)
      , o = function() {
        function e(e, t) {
            this.dnd = e,
            this.region = t,
            this.exchangeX = 0,
            this.exchangeY = 0,
            this.constainer = document.querySelector('[data-region="' + t.region + '"][data-region-host="' + t.id + '"]')
        }
        return e.prototype.enter = function(e, t) {
            var a = this.dnd.dragElement
              , n = Array.isArray(this.region.schema) ? this.region.schema : [];
            if (a && a.closest("[data-region]") === this.constainer) {
                var l = this.getChild(this.constainer, a)
                  , o = a.getAttribute("data-editor-id")
                  , s = i.default(n, (function(e) {
                    return e.$$id === o
                }
                ));
                ~s && n[s + 1] && (this.dropBeforeId = n[s + 1].$$id),
                this.constainer.insertBefore(t, l);
                var d = a.outerHTML.replace("ae-is-draging", "").replace(/\bdata\-editor\-id=(?:'.+?'|".+?")/g, "");
                t.innerHTML = d
            } else {
                var c = this.dnd.manager
                  , u = c.store;
                r.renderThumbToGhost(t, this.region, u.dragSchema, c.env),
                this.constainer.appendChild(t)
            }
        }
        ,
        e.prototype.leave = function(e, t) {
            this.constainer.removeChild(t)
        }
        ,
        e.prototype.over = function(e, t) {
            var a, n, r = this.getTarget(e), o = this.constainer, s = Array.isArray(this.region.schema) ? this.region.schema : [], d = e.clientX - this.exchangeX, c = e.clientY - this.exchangeY;
            Math.abs(c),
            Math.abs(d);
            if (r && !l.animation.animating) {
                var u = r.getAttribute("data-editor-id")
                  , p = this.getChild(o, r)
                  , m = i.default(s, (function(e) {
                    return e.$$id === u
                }
                ))
                  , f = Array.prototype.indexOf.call(o.children, t)
                  , h = Array.prototype.indexOf.call(o.children, p);
                ~f && f > h && (!this.exchangeY || c < 0 || d < 0) ? (this.exchangeX = e.clientX,
                this.exchangeY = e.clientY,
                this.dropBeforeId = null === (a = s[m]) || void 0 === a ? void 0 : a.$$id,
                f !== h - 1 && (l.animation.capture(o),
                o.insertBefore(t, p),
                l.animation.animateAll())) : ~f && f < h && (!this.exchangeY || c > 0 || d > 0) && (this.exchangeX = e.clientX,
                this.exchangeY = e.clientY,
                s[m + 1] ? this.dropBeforeId = null === (n = s[m + 1]) || void 0 === n ? void 0 : n.$$id : delete this.dropBeforeId,
                f !== h + 1 && (l.animation.capture(o),
                o.insertBefore(t, p.nextSibling),
                l.animation.animateAll()))
            }
            t.parentNode !== o && (delete this.dropBeforeId,
            l.animation.capture(o),
            o.appendChild(t),
            l.animation.animateAll())
        }
        ,
        e.prototype.getDropBeforeId = function() {
            return this.dropBeforeId
        }
        ,
        e.prototype.getTarget = function(e) {
            for (var t, a, n = e.target.closest("[data-editor-id]"); n; ) {
                if ((null === (t = n.parentElement) || void 0 === t ? void 0 : t.closest("[data-region]")) === this.constainer)
                    return n;
                n = (null === (a = n.parentElement) || void 0 === a ? void 0 : a.closest("[data-editor-id]")) || null
            }
            return null
        }
        ,
        e.prototype.getChild = function(e, t) {
            for (var a = t; a && a.parentElement !== e; )
                a = a.parentElement;
            return a
        }
        ,
        e.prototype.dispose = function() {}
        ,
        e
    }();
    t.DefaultDNDMode = o
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.SubEditor = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(5)
      , r = a(7)
      , o = n.__importDefault(a(21))
      , s = a(6)
      , d = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.afterResolveEditorInfo = function(e) {
            var t, a, n, l, i, r, o = this.props.store, s = e.context;
            if (null === (t = o.subEditorContext) || void 0 === t ? void 0 : t.slot) {
                var d = o.subEditorSlotPath;
                !~s.schemaPath.indexOf(d) && s.data ? (s.data.editable = !1,
                s.data.memberImmutable = !Array.isArray(null === (l = o.subEditorContext) || void 0 === l ? void 0 : l.value),
                s.data.memberImmutable || (s.data.name = "容器")) : s.schemaPath === d && s.data && (Array.isArray(null === (i = o.subEditorContext) || void 0 === i ? void 0 : i.value) || (s.data.movable = !1,
                s.data.removable = !1),
                s.data.typeMutable = null === (r = o.subEditorContext) || void 0 === r ? void 0 : r.typeMutable)
            } else
                s.data && !s.schemaPath && (null === (a = o.subEditorContext) || void 0 === a ? void 0 : a.memberImmutable) && (s.data.memberImmutable = null === (n = o.subEditorContext) || void 0 === n ? void 0 : n.memberImmutable)
        }
        ,
        t.prototype.handleBuildPanels = function(e) {
            var t, a = this.props.store;
            if (null === (t = a.subEditorContext) || void 0 === t ? void 0 : t.slot) {
                var n = a.subEditorSlotPath
                  , l = e.context;
                if (!~l.schemaPath.indexOf(n)) {
                    var i = l.data.concat();
                    if (l.data.splice(0, l.data.length),
                    !l.info.memberImmutable) {
                        var r = i.find((function(e) {
                            return "renderers" === e.key
                        }
                        ));
                        r && l.data.push(r)
                    }
                }
            }
        }
        ,
        t.prototype.buildSchema = function() {
            var e, t = this, a = this.props, i = a.store, r = a.manager, s = i.subEditorContext;
            return {
                show: !!i.subEditorContext,
                size: "full",
                title: null === (e = i.subEditorContext) || void 0 === e ? void 0 : e.title,
                onClose: i.closeSubEditor,
                onConfirm: i.confirmSubEditor,
                body: i.subEditorContext ? {
                    type: "form",
                    mode: "normal",
                    wrapperComponent: "div",
                    data: {
                        schema: i.subEditorValue
                    },
                    onValidate: function(e) {
                        return n.__awaiter(t, void 0, void 0, (function() {
                            var t, a, l;
                            return n.__generator(this, (function(n) {
                                switch (n.label) {
                                case 0:
                                    return [4, null === (l = null === (a = i.subEditorContext) || void 0 === a ? void 0 : a.validate) || void 0 === l ? void 0 : l.call(a, e)];
                                case 1:
                                    return (t = n.sent()) ? [2, {
                                        schema: t
                                    }] : [2]
                                }
                            }
                            ))
                        }
                        ))
                    },
                    onChange: i.subEditorOnChange,
                    controls: [{
                        name: "schema",
                        children: function(e) {
                            var a, n = e.value, s = e.onChange;
                            return l.default.createElement(o.default, {
                                autoFocus: !0,
                                value: n,
                                ref: i.subEditorRef,
                                onChange: s,
                                data: null === (a = i.subEditorContext) || void 0 === a ? void 0 : a.data,
                                schemaFilter: r.config.schemaFilter,
                                theme: r.env.theme,
                                afterResolveEditorInfo: t.afterResolveEditorInfo,
                                onBuildPanels: t.handleBuildPanels
                            })
                        }
                    }]
                } : {
                    type: "tpl",
                    tpl: "Loading..."
                },
                actions: [[{
                    children: s ? l.default.createElement("div", {
                        className: "ae-DialogToolbar"
                    }, l.default.createElement("button", {
                        type: "button",
                        "data-tooltip": "撤销",
                        disabled: !s.canUndo,
                        onClick: i.undoSubEditor
                    }, l.default.createElement("i", {
                        className: "fa fa-undo"
                    })), l.default.createElement("button", {
                        type: "button",
                        "data-tooltip": "重做",
                        disabled: !s.canRedo,
                        onClick: i.redoSubEditor
                    }, l.default.createElement("i", {
                        className: "fa fa-rotate-right"
                    }))) : null
                }, {
                    type: "submit",
                    label: "确认",
                    level: "primary"
                }, {
                    type: "button",
                    label: "取消",
                    actionType: "close"
                }]],
                closeOnEsc: !1,
                bodyClassName: "ae-dialog"
            }
        }
        ,
        t.prototype.render = function() {
            var e = this.props
              , t = (e.store,
            e.theme)
              , a = e.manager;
            return i.render({
                type: "dialog"
            }, this.buildSchema(), n.__assign(n.__assign({}, a.env), {
                seesion: "editor-dialog",
                theme: t
            }))
        }
        ,
        n.__decorate([s.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "afterResolveEditorInfo", null),
        n.__decorate([s.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleBuildPanels", null),
        t = n.__decorate([r.observer], t)
    }(l.default.Component);
    t.SubEditor = d
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ScaffoldModal = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(5)
      , r = a(7)
      , o = a(6)
      , s = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.handleConfirm = function(e) {
            var t, a, l = e[0], i = this.props.store;
            if (null === (t = i.scaffoldForm) || void 0 === t ? void 0 : t.pipeOut) {
                var r = l
                  , o = i.scaffoldForm.pipeOut(l);
                l = n.__assign({
                    __scaffold: r
                }, o)
            }
            null === (a = i.scaffoldForm) || void 0 === a || a.callback(l),
            i.closeScaffoldForm()
        }
        ,
        t.prototype.buildSchema = function() {
            var e = this.props
              , t = e.store
              , a = (e.manager,
            t.scaffoldForm);
            return {
                show: !!a,
                size: (null == a ? void 0 : a.size) || "md",
                title: null == a ? void 0 : a.title,
                onClose: t.closeScaffoldForm,
                onConfirm: this.handleConfirm,
                body: a ? {
                    type: "form",
                    mode: "normal",
                    wrapperComponent: "div",
                    data: a.value,
                    onValidate: a.validate,
                    controls: a.controls
                } : {
                    type: "tpl",
                    tpl: "Loading..."
                },
                actions: [[{
                    type: "submit",
                    label: "确认",
                    level: "primary"
                }, {
                    type: "button",
                    label: "取消",
                    actionType: "close"
                }]],
                closeOnEsc: !1,
                bodyClassName: "ae-Dialog"
            }
        }
        ,
        t.prototype.render = function() {
            var e = this.props
              , t = (e.store,
            e.theme)
              , a = e.manager;
            return i.render({
                type: "dialog"
            }, this.buildSchema(), n.__assign(n.__assign({}, a.env), {
                seesion: "scaffold-dialog",
                theme: t
            }))
        }
        ,
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleConfirm", null),
        t = n.__decorate([r.observer], t)
    }(l.default.Component);
    t.ScaffoldModal = s
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TabsPlugin = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(1)
      , r = a(2)
      , o = a(3)
      , s = a(16)
      , d = a(13)
      , c = n.__importDefault(a(10))
      , u = a(12)
      , p = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "tabs",
            t.$schema = "https://isuda.baidu.com/schemas/TabsSchema.json",
            t.name = "选项卡",
            t.description = "选项卡，可以将内容分组用选项卡的形式展示，降低用户使用成本。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/tabs",
            t.tags = ["容器"],
            t.icon = "",
            t.scaffold = {
                type: "tabs",
                tabs: [{
                    title: "选项卡1",
                    body: "内容1"
                }, {
                    title: "选项卡2",
                    body: "内容2"
                }]
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "选项卡",
            t.panelControls = [o.getSchemaTpl("fieldSet", {
                title: "常规",
                controls: [{
                    name: "tabs",
                    type: "combo",
                    label: "选项卡管理",
                    multiple: !0,
                    draggable: !0,
                    minLength: 1,
                    controls: [{
                        type: "text",
                        name: "title",
                        required: !0
                    }],
                    scaffold: {
                        title: "选项卡",
                        body: {
                            type: "tpl",
                            tpl: "内容",
                            inline: !1
                        }
                    },
                    addButtonText: "新增选项卡",
                    draggableTip: ""
                }]
            }), o.getSchemaTpl("fieldSet", {
                title: "外观",
                controls: [{
                    name: "tabsMode",
                    label: "样式",
                    type: "button-group",
                    size: "xs",
                    className: "block",
                    pipeIn: o.defaultValue(""),
                    options: [{
                        label: "默认",
                        value: ""
                    }, {
                        label: "样式1",
                        value: "line"
                    }, {
                        label: "样式2",
                        value: "card"
                    }, {
                        label: "样式3",
                        value: "radio"
                    }, {
                        label: "样式4",
                        value: "vertical"
                    }]
                }, o.getSchemaTpl("className"), o.getSchemaTpl("className", {
                    name: "tabClassName",
                    label: "选项卡成员 CSS 类名"
                })]
            }), o.getSchemaTpl("fieldSet", {
                title: "其他",
                controls: [{
                    type: "switch",
                    name: "mountOnEnter",
                    label: "激活时才渲染",
                    mode: "inline",
                    className: "block",
                    description: "设置后选项卡的内容只有点开才会渲染，如果有选项卡放的可拉取接口的组件，那么这个接口只有在点开的时候才会拉取。"
                }, {
                    type: "switch",
                    name: "unmountOnExit",
                    label: "隐藏即销毁",
                    mode: "inline",
                    className: "block",
                    description: "设置后，如果选项卡内容关闭则销毁，配置「激活时才渲染」选项可以做到卡片内容每次点开都重新加载的效果。"
                }, o.getSchemaTpl("visible")]
            })],
            t.patchContainers = ["tabs.body"],
            t.vRendererConfig = {
                regions: {
                    body: {
                        key: "body",
                        label: "内容区"
                    }
                },
                panelTitle: "卡片",
                panelControls: [o.getSchemaTpl("fieldSet", {
                    title: "常规",
                    controls: [{
                        name: "title",
                        label: "标题",
                        type: "text",
                        required: !0
                    }, o.getSchemaTpl("icon"), {
                        label: "Hash",
                        name: "hash",
                        type: "text",
                        description: "设置后，会同步更新地址栏的 Hash。"
                    }]
                }), o.getSchemaTpl("fieldSet", {
                    title: "外观",
                    controls: [o.getSchemaTpl("className")],
                    collapsed: !0
                }), o.getSchemaTpl("fieldSet", {
                    title: "其他",
                    controls: [{
                        type: "switch",
                        name: "reload",
                        label: "内容刷新",
                        mode: "inline",
                        className: "block",
                        description: "配置后，每次点开内容都会重新刷新，如果配置了，下面两个选项就不用配置了。"
                    }, {
                        type: "switch",
                        name: "mountOnEnter",
                        visibleOn: "!this.reload",
                        label: "激活时才渲染",
                        mode: "inline",
                        className: "block",
                        description: "设置后选项卡的内容只有点开才会渲染，如果有选项卡放的可拉取接口的组件，那么这个接口只有在点开的时候才会拉取。"
                    }, {
                        visibleOn: "!this.reload",
                        type: "switch",
                        name: "unmountOnExit",
                        label: "隐藏即销毁",
                        mode: "inline",
                        className: "block",
                        description: "设置后，如果选项卡内容关闭则销毁，配置「激活时才渲染」选项可以做到卡片内容每次点开都重新加载的效果。"
                    }, o.getSchemaTpl("visible"), o.getSchemaTpl("disabled")]
                })]
            },
            t.wrapperProps = {
                unmountOnExit: !0,
                mountOnEnter: !0
            },
            t.tabWrapperResolve = function(e) {
                return e.parentElement
            }
            ,
            t.overrides = {
                renderTabs: function() {
                    var e = this
                      , t = this.super();
                    if (!this.renderTab && this.props.$$editor && t) {
                        var a = this.props.tabs;
                        return s.mapReactElement(t, (function(t) {
                            var n;
                            if (~(null === (n = t.type.displayName) || void 0 === n ? void 0 : n.indexOf("TabComponent")) && t.props.$$id) {
                                var i = t.props.$$id
                                  , r = c.default(a, (function(e) {
                                    return e.$$id === i
                                }
                                ))
                                  , o = e.props.$$editor
                                  , s = o.plugin;
                                if (~r) {
                                    var p = s.vRendererConfig.regions.body;
                                    return l.default.cloneElement(t, {
                                        children: l.default.createElement(d.VRenderer, {
                                            key: i,
                                            plugin: o.plugin,
                                            renderer: o.renderer,
                                            $schema: "https://isuda.baidu.com/schemas/TabSchema.json",
                                            hostId: o.id,
                                            memberIndex: r,
                                            name: "" + (t.props.title || "卡片" + (r + 1)),
                                            id: i,
                                            draggable: !1,
                                            wrapperResolve: s.tabWrapperResolve,
                                            schemaPath: o.schemaPath + "/tabs/" + r,
                                            path: e.props.$path + "/" + r,
                                            data: e.props.data
                                        }, l.default.createElement(u.RegionWrapper, {
                                            key: p.key,
                                            preferTag: p.preferTag,
                                            name: p.key,
                                            label: p.label,
                                            regionConfig: p,
                                            editorStore: s.manager.store,
                                            manager: s.manager,
                                            children: t.props.children,
                                            wrapperResolve: p.wrapperResolve,
                                            rendererName: o.renderer.name
                                        }))
                                    })
                                }
                            }
                            return t
                        }
                        ))
                    }
                    return t
                }
            },
            t
        }
        return n.__extends(t, e),
        t.prototype.buildEditorToolbar = function(e, t) {
            if (e.info.plugin === this && ("tabs" === e.info.renderer.name || "tabs-control" === e.info.renderer.name) && !e.info.hostId) {
                var a = e.node;
                t.push({
                    level: "secondary",
                    icon: "fa fa-chevron-left",
                    tooltip: "上个卡片",
                    onClick: function() {
                        var e = a.getComponent();
                        if (null == e ? void 0 : e.switchTo) {
                            var t = e.currentIndex();
                            e.switchTo(t - 1)
                        }
                    }
                }),
                t.push({
                    level: "secondary",
                    icon: "fa fa-chevron-right",
                    tooltip: "下个卡片",
                    onClick: function() {
                        var e = a.getComponent();
                        if (null == e ? void 0 : e.switchTo) {
                            var t = e.currentIndex();
                            e.switchTo(t + 1)
                        }
                    }
                })
            }
        }
        ,
        t.prototype.onPreventClick = function(e) {
            var t = e.context.data;
            return !t.defaultPrevented && (!t.target.closest("[role=tablist]>li") && void 0)
        }
        ,
        t
    }(r.BasePlugin);
    t.TabsPlugin = p,
    i.registerEditorPlugin(p)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.InlineModal = t.DialogPlugin = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(1)
      , r = a(2)
      , o = a(3)
      , s = a(6)
      , d = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "dialog",
            t.$schema = "https://isuda.baidu.com/schemas/DialogSchema.json",
            t.name = "弹框",
            t.wrapperProps = {
                wrapperComponent: c,
                onClose: s.noop
            },
            t.regions = [{
                key: "body",
                label: "内容区",
                renderMethod: "renderBody",
                renderMethodOverride: function(e, t) {
                    return function() {
                        for (var a = [], n = 0; n < arguments.length; n++)
                            a[n] = arguments[n];
                        var l = this.props.$$editor
                          , i = this.super.apply(this, a);
                        return l && "body" === a[1] ? t(this, i, e, l, l.plugin.manager) : i
                    }
                }
            }, {
                key: "footer",
                label: "底部",
                renderMethod: "renderFooter",
                wrapperResolve: function(e) {
                    return e
                }
            }],
            t.panelTitle = "弹框",
            t.panelControls = [o.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    label: "标题",
                    type: "text",
                    name: "title"
                }, {
                    type: "switch",
                    label: "数据映射",
                    name: "data",
                    mode: "inline",
                    className: "block m-b-xs",
                    pipeIn: function(e) {
                        return !!e
                    },
                    pipeOut: function(e) {
                        return e ? {
                            "&": "$$"
                        } : null
                    }
                }, {
                    type: "tpl",
                    visibleOn: "!this.data",
                    tpl: '<p class="text-sm text-muted">当没开启数据映射时，弹框中默认会拥有触发打开弹框按钮所在环境的所有数据。</p>'
                }, {
                    type: "combo",
                    syncDefaultValue: !1,
                    name: "data",
                    visibleOn: "this.data",
                    descriptionClassName: "help-block text-xs m-b-none",
                    description: '<p>当开启数据映射时，弹框中的数据只会包含设置的部分，请绑定数据。如：<code>{"a": "\\${a}", "b": 2}</code></p><p>如果希望在默认的基础上定制，请先添加一个 Key 为 `&` Value 为 `\\$$` 作为第一行。</p><div>当值为 <code>__undefined</code>时，表示删除对应的字段，可以结合<code>{"&": "\\$$"}</code>来达到黑名单效果。</div>',
                    multiple: !0,
                    messages: {
                        validateFailed: "数据映射中存在错误，请仔细检查"
                    },
                    pipeIn: function(e) {
                        if (!s.isObject(e))
                            return e;
                        var t = [];
                        return Object.keys(e).forEach((function(a) {
                            t.push({
                                key: a || "",
                                value: "string" == typeof e[a] ? e[a] : JSON.stringify(e[a])
                            })
                        }
                        )),
                        t
                    },
                    pipeOut: function(e) {
                        if (!Array.isArray(e))
                            return e;
                        var t = {};
                        return e.forEach((function(e) {
                            var a = e.key || ""
                              , n = e.value;
                            try {
                                n = JSON.parse(n)
                            } catch (e) {}
                            t[a] = n
                        }
                        )),
                        t
                    },
                    controls: [{
                        placeholder: "Key",
                        type: "text",
                        unique: !0,
                        name: "key",
                        required: !0
                    }, {
                        placeholder: "Value",
                        type: "text",
                        name: "value"
                    }]
                }, {
                    label: "按 Esc 关闭弹框",
                    type: "switch",
                    name: "closeOnEsc",
                    mode: "inline",
                    className: "block",
                    value: !1
                }]
            }, {
                title: "外观",
                controls: [{
                    label: "尺寸",
                    type: "button-group",
                    name: "size",
                    size: "sm",
                    className: "block",
                    pipeIn: o.defaultValue(""),
                    options: [{
                        label: "小",
                        value: "sm"
                    }, {
                        label: "默认",
                        value: ""
                    }, {
                        label: "中",
                        value: "md"
                    }, {
                        label: "大",
                        value: "lg"
                    }, {
                        label: "超大",
                        value: "xl"
                    }]
                }, {
                    label: "是否显示关闭按钮",
                    type: "switch",
                    name: "showCloseButton",
                    mode: "inline",
                    className: "block",
                    value: !0
                }, o.getSchemaTpl("className", {
                    name: "headerClassName",
                    label: "顶部 CSS 类名"
                }), o.getSchemaTpl("className", {
                    name: "bodyClassName",
                    label: "内容 CSS 类名"
                })]
            }])],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function() {}
        ,
        t
    }(r.BasePlugin);
    t.DialogPlugin = d,
    i.registerEditorPlugin(d);
    var c = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.render = function() {
            var e = this.props.children;
            return l.default.createElement("div", {
                className: "ae-InlineModel"
            }, e)
        }
        ,
        t
    }(l.default.Component);
    t.InlineModal = c
}
, function(e, t, a) {
    e.exports = a(39)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.BasicEditor = t.RendererEditor = t.registerEditorPlugin = t.getSchemaTpl = t.BasePlugin = t.utils = t.MiniEditor = t.Editor = void 0;
    var n = a(0)
      , l = n.__importDefault(a(21));
    t.Editor = l.default,
    a(57),
    a(58),
    a(60),
    a(64),
    a(65),
    a(66),
    a(67),
    a(24),
    a(68),
    a(69),
    a(70),
    a(71),
    a(72),
    a(73),
    a(74),
    a(75),
    a(76),
    a(77),
    a(78),
    a(79),
    a(80),
    a(81),
    a(82),
    a(83),
    a(84),
    a(85),
    a(86),
    a(87),
    a(88),
    a(89),
    a(90),
    a(91),
    a(92),
    a(93),
    a(94),
    a(95),
    a(96),
    a(97),
    a(98),
    a(99),
    a(100),
    a(101),
    a(102),
    a(103),
    a(104),
    a(105),
    a(106),
    a(107),
    a(108),
    a(109),
    a(110),
    a(111),
    a(112),
    a(113),
    a(114),
    a(115),
    a(116),
    a(20),
    a(117),
    a(118),
    a(119),
    a(120),
    a(121),
    a(122),
    a(123),
    a(124),
    a(19),
    a(125),
    a(126),
    a(127),
    a(128),
    a(129),
    a(130),
    a(131),
    a(132),
    a(133),
    a(26),
    a(134),
    a(37),
    a(135),
    a(136),
    a(137),
    a(138),
    a(139),
    a(140),
    a(141),
    a(142),
    a(143),
    a(144),
    a(145),
    a(146),
    a(147),
    a(148),
    a(149),
    a(150),
    a(151),
    a(152),
    a(153),
    a(154),
    a(155),
    a(156),
    a(157),
    a(158),
    a(159),
    a(160),
    a(161),
    a(162),
    a(163),
    a(36),
    a(164),
    a(165),
    a(166),
    a(167),
    a(168),
    a(169);
    var i = n.__importStar(a(6));
    t.utils = i;
    var r = a(3);
    Object.defineProperty(t, "getSchemaTpl", {
        enumerable: !0,
        get: function() {
            return r.getSchemaTpl
        }
    });
    var o = a(1);
    Object.defineProperty(t, "registerEditorPlugin", {
        enumerable: !0,
        get: function() {
            return o.registerEditorPlugin
        }
    });
    var s = a(2);
    Object.defineProperty(t, "BasePlugin", {
        enumerable: !0,
        get: function() {
            return s.BasePlugin
        }
    });
    var d = a(170);
    Object.defineProperty(t, "BasicEditor", {
        enumerable: !0,
        get: function() {
            return d.BasicEditor
        }
    }),
    Object.defineProperty(t, "RendererEditor", {
        enumerable: !0,
        get: function() {
            return d.RendererEditor
        }
    });
    var c = n.__importDefault(a(171));
    t.MiniEditor = c.default
}
, function(e, t) {
    e.exports = require("lodash/isEqual")
}
, function(e, t) {
    e.exports = require("deep-diff")
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = n.__importDefault(a(8))
      , r = a(7)
      , o = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.render = function() {
            var e = this.props
              , t = e.className
              , a = e.store
              , n = e.id
              , r = e.title
              , o = e.children
              , s = e.node
              , d = a.sortedToolbars
              , c = a.sortedSecondaryToolbars
              , u = a.sortedSpecialToolbars
              , p = a.isActive(n)
              , m = a.isHoved(n) || a.dropId === n || a.insertOrigId === n;
            return l.default.createElement("div", {
                className: i.default("ae-Editor-hlbox", {
                    shake: n === a.insertOrigId,
                    selected: p,
                    hover: m,
                    regionOn: s.childRegions.some((function(e) {
                        return a.isRegionHighlighted(e.id, e.region)
                    }
                    ))
                }, t),
                style: {
                    display: s.w && s.h ? "block" : "none",
                    top: s.y,
                    left: s.x,
                    width: s.w,
                    height: s.h
                }
            }, l.default.createElement("div", {
                key: "tip",
                className: "ae-Editor-tip"
            }, r), p && d.length ? l.default.createElement("div", {
                className: "ae-Editor-toolbar",
                key: "toolbar"
            }, d.map((function(e) {
                return l.default.createElement("button", {
                    key: e.id,
                    type: "button",
                    draggable: e.draggable,
                    onDragStart: e.onDragStart,
                    "data-id": e.id,
                    "data-tooltip": e.tooltip || void 0,
                    "data-position": e.placement || "top",
                    onClick: e.onClick
                }, ~e.icon.indexOf("<") ? l.default.createElement("span", {
                    dangerouslySetInnerHTML: {
                        __html: e.icon
                    }
                }) : l.default.createElement("i", {
                    className: e.icon
                }))
            }
            ))) : null, p && c.length ? l.default.createElement("div", {
                className: "ae-Editor-toolbar sencondary",
                key: "sencondary-toolbar"
            }, c.map((function(e) {
                return l.default.createElement("button", {
                    key: e.id,
                    type: "button",
                    className: e.className,
                    "data-id": e.id,
                    "data-tooltip": e.tooltip || void 0,
                    "data-position": e.placement || "top",
                    onClick: e.onClick
                }, ~e.icon.indexOf("<") ? l.default.createElement("span", {
                    dangerouslySetInnerHTML: {
                        __html: e.icon
                    }
                }) : l.default.createElement("i", {
                    className: e.icon
                }))
            }
            ))) : null, p && u.length ? l.default.createElement("div", {
                className: "ae-Editor-toolbar special",
                key: "special-toolbar"
            }, u.map((function(e) {
                return l.default.createElement("button", {
                    key: e.id,
                    type: "button",
                    className: e.className,
                    "data-id": e.id,
                    "data-tooltip": e.tooltip || void 0,
                    "data-position": e.placement || "top",
                    onClick: e.onClick
                }, ~e.icon.indexOf("<") ? l.default.createElement("span", {
                    dangerouslySetInnerHTML: {
                        __html: e.icon
                    }
                }) : l.default.createElement("i", {
                    className: e.icon
                }))
            }
            ))) : null, o)
        }
        ,
        t = n.__decorate([r.observer], t)
    }(l.default.Component);
    t.default = o
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ErrorRenderer = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.render = function() {
            return l.default.createElement("div", {
                className: "ae-ErrorRenderer"
            }, "类型错误，无法渲染")
        }
        ,
        t
    }(l.default.Component);
    t.ErrorRenderer = i
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.EditorStore = void 0;
    var n = a(0)
      , l = a(15)
      , i = a(14)
      , r = a(6)
      , o = a(6)
      , s = a(45)
      , d = a(5)
      , c = n.__importDefault(a(9))
      , u = a(46)
      , p = n.__importDefault(a(48))
      , m = a(17)
      , f = n.__importDefault(a(10));
    t.EditorStore = i.types.model("EditorRoot", {
        root: i.types.optional(m.EditorNode, {
            id: "root",
            label: "Root"
        }),
        hoverId: "",
        hoverRegion: "",
        activeId: "",
        contextId: "",
        dragMode: "move",
        dragId: "",
        dragType: "",
        dragSchema: i.types.frozen(),
        dropId: "",
        dropRegion: "",
        planDropId: "",
        planDropRegion: "",
        insertId: "",
        insertRegion: "",
        insertRenderers: i.types.optional(i.types.frozen(), []),
        insertRenderersKeywords: "",
        insertTag: "全部",
        insertSelected: "",
        insertMode: "insert",
        insertOrigId: "",
        insertBeforeId: "",
        schema: i.types.frozen(),
        versionId: 0,
        schemaHistory: i.types.optional(i.types.array(i.types.frozen()), []),
        toolbars: i.types.optional(i.types.frozen(), []),
        panels: i.types.optional(i.types.frozen(), []),
        subRenderersKeywords: "",
        subRendererRegion: "",
        subRenderers: i.types.optional(i.types.frozen(), []),
        panelKey: "",
        leftPanelKey: "",
        jsonSchemaUri: "",
        scaffoldForm: i.types.maybe(i.types.frozen()),
        subEditorContext: i.types.maybe(i.types.frozen()),
        calculateStarted: !1
    }).views((function(e) {
        return {
            get filteredSchema() {
                var t, a, n;
                return null !== (n = null === (a = (t = i.getEnv(e)).schemaFilter) || void 0 === a ? void 0 : a.call(t, e.schema)) && void 0 !== n ? n : e.schema
            },
            isHoved: function(t) {
                return t && e.hoverId === t
            },
            isActive: function(t) {
                return t && e.activeId === t && !this.dragging && !e.insertOrigId && e.insertBeforeId !== t
            },
            isContextOn: function(t) {
                return t && e.contextId === t
            },
            get activeContainerId() {
                if (!e.activeId)
                    return "";
                for (var t = this.getNodeById(e.activeId); t; ) {
                    if (t.childRegions.length)
                        return t.id;
                    t = t.host
                }
                return ""
            },
            isRegionHighlighted: function(t, a) {
                return !e.insertOrigId && t === e.hoverId && a === e.hoverRegion || t === e.dropId && e.dropRegion === a || !e.insertOrigId && t === e.insertId && e.insertRegion === a
            },
            isRegionActive: function(t, a) {
                return this.isActive(t) || t === e.dropId || this.isRegionHighlighted(t, a)
            },
            isRegionDragEnter: function(t, a) {
                return this.isRegionActive(t, a) && a === e.dropRegion
            },
            get highlightNodes() {
                var t = this;
                return [e.dragId || e.contextId ? "" : e.hoverId, e.contextId, e.dragId || e.insertOrigId || e.contextId || e.insertId ? "" : e.activeId, "insert" === e.insertMode ? e.insertId : "", e.insertOrigId, e.dropId, e.insertBeforeId].filter((function(e, t, a) {
                    return e && t === a.indexOf(e)
                }
                )).map((function(e) {
                    return t.getNodeById(e)
                }
                )).filter((function(e) {
                    return e
                }
                ))
            },
            getNodeById: function(t, a) {
                for (var n = e.root.children.concat(); n.length; ) {
                    var l = n.shift();
                    if (l.id === t && (!a || l.region === a))
                        return l;
                    l.children.length && n.push.apply(n, l.children)
                }
            },
            get activeNodeInfo() {
                var t;
                return null === (t = this.getNodeById(e.activeId)) || void 0 === t ? void 0 : t.info
            },
            getSchema: function(t) {
                return t ? r.JSONGetById(e.schema, t) : e.schema
            },
            getSchemaParentById: function(t) {
                return o.JSONGetParentById(e.schema, t)
            },
            getSchemaPath: function(t) {
                var a = o.JSONGetPathById(e.schema, t);
                return Array.isArray(a) ? a.join("/") : ""
            },
            getPanelKey: function() {
                var t, a = e.panelKey;
                if ("none" === a)
                    return a;
                var n = this.getPanels();
                return c.default(n, (function(e) {
                    return a && e.key === a
                }
                )) ? a : (null === (t = n[0]) || void 0 === t ? void 0 : t.key) || "none"
            },
            getLeftPanelKey: function() {
                var t = e.leftPanelKey;
                if (this.dragging)
                    return "outline";
                if (e.insertId && e.insertRegion)
                    return "insert";
                if ("none" === t)
                    return t;
                var a = this.getLeftPanels();
                return c.default(a, (function(e) {
                    return t && e.key === t
                }
                )) ? t : "outline"
            },
            get leftPanels() {
                return e.panels.filter((function(e) {
                    return "left" === e.position
                }
                ))
            },
            get rightPanels() {
                return e.panels.filter((function(e) {
                    return "left" !== e.position
                }
                ))
            },
            getPanels: function() {
                return [].concat(this.rightPanels || []).sort((function(e, t) {
                    return e.order - t.order
                }
                ))
            },
            getLeftPanels: function() {
                var t = [{
                    key: "outline",
                    icon: "fa fa-navicon",
                    title: "大纲",
                    component: s.OutlinePanel,
                    order: -9999
                }].concat(this.leftPanels || []);
                return e.insertId && e.insertRegion && t.push({
                    key: "insert",
                    icon: "fa fa-bolt",
                    position: "left",
                    title: "replace" === e.insertMode ? "变更" : "插入",
                    component: u.InsertSubRendererPanel,
                    order: 9999
                }),
                t.sort((function(e, t) {
                    return e.order - t.order
                }
                ))
            },
            get sortedToolbars() {
                return e.toolbars.filter((function(e) {
                    return "secondary" !== e.level && "special" !== e.level
                }
                )).sort((function(e, t) {
                    return e.order - t.order
                }
                ))
            },
            get sortedSecondaryToolbars() {
                return e.toolbars.filter((function(e) {
                    return "secondary" === e.level
                }
                )).sort((function(e, t) {
                    return e.order - t.order
                }
                ))
            },
            get sortedSpecialToolbars() {
                return e.toolbars.filter((function(e) {
                    return "special" === e.level
                }
                )).sort((function(e, t) {
                    return e.order - t.order
                }
                ))
            },
            get value() {
                if (e.activeId)
                    return this.getValueOf(e.activeId)
            },
            getValueOf: function(t) {
                return o.JSONPipeOut(r.JSONGetById(e.schema, t), !1, !0)
            },
            get valueWithoutHiddenProps() {
                if (e.activeId)
                    return o.JSONPipeOut(r.JSONGetById(e.schema, e.activeId))
            },
            get outline() {
                return e.root.children
            },
            get bcn() {
                var t = [];
                return e.activeId && l.findTree(e.root.children, (function(a, n, l, i) {
                    return a.id === e.activeId && (t = i.concat(a),
                    !0)
                }
                )),
                t
            },
            get activePath() {
                return this.getNodePathById(e.activeId)
            },
            getNodePathById: function(t) {
                var a = [];
                if (!t)
                    return a;
                var n = function(e, l) {
                    return void 0 === l && (l = []),
                    e.every((function(e) {
                        return e.id === t ? (a = l.concat(e),
                        !1) : !e.children || !e.children.length || n(e.children, l.concat(e))
                    }
                    ))
                };
                return n(e.root.children),
                a
            },
            get dragging() {
                return !(!e.dragId && !e.dropId)
            },
            get needPatch() {
                var t = function(e) {
                    return e.some((function(e) {
                        return !e.patched && !e.isRegion || !!e.children.length && t(e.children)
                    }
                    ))
                };
                return t(e.root.children)
            },
            get schemaRaw() {
                return o.JSONPipeOut(e.schema)
            },
            get groupedSubRenderers() {
                var t = {}
                  , a = e.subRenderersKeywords
                  , n = new RegExp(a,"i");
                return e.subRenderers.concat().sort((function(e, t) {
                    return e.order - t.order
                }
                )).forEach((function(e) {
                    a && !["name", "description", "scaffold.type"].some((function(t) {
                        return d.resolveVariable(t, e) && n.test(d.resolveVariable(t, e))
                    }
                    )) || (Array.isArray(e.tags) ? e.tags.concat() : e.tags ? [e.tags] : ["其他"]).forEach((function(a) {
                        t[a] = t[a] || [],
                        t[a].push(e)
                    }
                    ))
                }
                )),
                t
            },
            getSubRendererById: function(t) {
                return c.default(e.subRenderers || [], (function(e) {
                    return e.id === t
                }
                ))
            },
            get groupedInsertRenderers() {
                var t = {
                    "全部": []
                }
                  , a = e.insertRenderersKeywords
                  , n = new RegExp(a,"i");
                return e.insertRenderers.concat().sort((function(e, t) {
                    return e.order - t.order
                }
                )).forEach((function(e) {
                    a && !["name", "description", "scaffold.type"].some((function(t) {
                        return d.resolveVariable(t, e) && n.test(d.resolveVariable(t, e))
                    }
                    )) || ((Array.isArray(e.tags) ? e.tags.concat() : e.tags ? [e.tags] : ["其他"]).forEach((function(a) {
                        t[a] = t[a] || [],
                        t[a].push(e)
                    }
                    )),
                    t["全部"].push(e))
                }
                )),
                t
            },
            get selectedInsertRendererInfo() {
                return c.default(e.insertRenderers, (function(t) {
                    return t.id === e.insertSelected
                }
                ))
            },
            get subEditorSlotPath() {
                var t, a = null === (t = e.subEditorContext) || void 0 === t ? void 0 : t.slot;
                if (!a)
                    return "";
                var n = []
                  , l = function(e, t) {
                    return void 0 === t && (t = []),
                    !(!Array.isArray(e) || !e.some((function(e, a) {
                        return l(e, t.concat("" + a))
                    }
                    ))) || (p.default(e) ? Object.keys(e).some((function(a) {
                        return l(e[a], t.concat(a))
                    }
                    )) : "$$" === e && (n = t.concat(),
                    !0))
                };
                return l(a),
                n.length ? n.join("/") : ""
            },
            get subEditorValue() {
                if (e.subEditorContext)
                    return e.subEditorContext.slot ? n.__assign(n.__assign({}, l.mapObject(e.subEditorContext.slot, (function(t) {
                        return "$$" === t ? e.subEditorContext.value : t
                    }
                    ))), {
                        isSlot: !0
                    }) : e.subEditorContext.value
            },
            get canUndo() {
                return 0 !== e.schemaHistory.findIndex((function(t) {
                    return t.versionId === e.versionId
                }
                ))
            },
            get canRedo() {
                return e.schemaHistory.findIndex((function(t) {
                    return t.versionId === e.versionId
                }
                )) < e.schemaHistory.length - 1
            }
        }
    }
    )).actions((function(e) {
        i.getEnv(e);
        var t = 0
          , a = null;
        return {
            setSchema: function(t) {
                var a = o.JSONPipeIn(t || {});
                if (e.schema) {
                    var n = r.diff(e.schema, a, (function(e, t) {
                        return "$$id" === t
                    }
                    ));
                    e.schema = r.patchDiff(e.schema, n)
                } else
                    e.schema = a;
                this.resetHistory()
            },
            insertSchema: function(t) {
                var a, n = t.context.id, l = t.context.region, i = r.JSONGetById(e.schema, n);
                if (i) {
                    var s = o.JSONPipeIn(t.context.data)
                      , d = Array.isArray(i[l]) ? i[l].concat() : i[l] ? [i[l]] : [];
                    if (t.context.beforeId) {
                        var c = f.default(d, (function(e) {
                            return e.$$id === t.context.beforeId
                        }
                        ));
                        ~c ? d.splice(c, 0, s) : d.push(s)
                    } else
                        d.push(s);
                    this.traceableSetSchema(o.JSONUpdate(e.schema, n, ((a = {})[l] = d,
                    a)))
                }
            },
            moveSchema: function(t) {
                var a, n = t.context, l = e.schema;
                if (n.sourceId !== n.beforeId) {
                    var i = r.JSONGetById(l, n.sourceId);
                    l = r.JSONDelete(l, n.sourceId, void 0, !0);
                    var s = n.region
                      , d = r.JSONGetById(l, n.id)[s];
                    if (d = Array.isArray(d) ? d.concat() : d ? [d] : [],
                    n.beforeId) {
                        var c = f.default(d, (function(e) {
                            return e.$$id === n.beforeId
                        }
                        ));
                        if (!~c)
                            throw new Error("位置错误，目标位置没有找到");
                        d.splice(c, 0, i)
                    } else
                        d.push(i);
                    this.traceableSetSchema(o.JSONUpdate(l, n.id, ((a = {})[s] = d,
                    a)))
                }
            },
            setActiveId: function(t) {
                var a = t ? e.getNodeById(t) : void 0;
                !1 === (null == a ? void 0 : a.clickable) || t && !a || (e.activeId = t,
                !e.panelKey && t && (e.panelKey = "config"))
            },
            setHoverId: function(t, a) {
                var n = t ? e.getNodeById(t) : void 0;
                !1 !== (null == n ? void 0 : n.clickable) && (e.hoverId = t,
                e.hoverRegion = a || "")
            },
            setInsertId: function(t) {
                e.insertId = t
            },
            setContextId: function(t) {
                e.contextId = t
            },
            setDragId: function(t, a, n, l) {
                void 0 === a && (a = "move"),
                void 0 === n && (n = "schema"),
                e.dragId = t,
                e.dragMode = a,
                e.dragType = n,
                e.dragSchema = l || (t ? e.getSchema(t) : null)
            },
            setDropId: function(t, a) {
                void 0 === a && (a = ""),
                e.dropId = t,
                e.dropRegion = a,
                e.planDropId = "",
                e.planDropRegion = ""
            },
            setPlanDropId: function(t, a) {
                e.planDropId = t,
                e.planDropRegion = a
            },
            setActiveToolbars: function(t) {
                e.toolbars = t
            },
            setPanels: function(t) {
                e.panels = t
            },
            setSubRenderers: function(t) {
                e.subRenderers = t
            },
            changeSubRenderersKeywords: function(t) {
                e.subRenderersKeywords = t
            },
            resetSubRenderersKeywords: function() {
                e.subRenderersKeywords = ""
            },
            changeSubRendererRegion: function(t) {
                e.subRendererRegion = t
            },
            changePanelKey: function(t, a) {
                void 0 === a && (a = !1),
                t !== e.getPanelKey() || a ? e.panelKey = t : e.panelKey = "none"
            },
            changeLeftPanelKey: function(t, a) {
                void 0 === a && (a = !1),
                "insert" !== t && "insert" !== e.panelKey && (t !== e.getLeftPanelKey() || a ? e.leftPanelKey = t : e.leftPanelKey = "none")
            },
            changeValue: function(t, a) {
                e.activeId && this.changeValueById(e.activeId, t, a)
            },
            changeValueById: function(t, a, n, l, i) {
                var s = r.JSONGetById(e.schema, t);
                if (s)
                    if (n) {
                        var d = r.patchDiff(s, n);
                        this.traceableSetSchema(o.JSONUpdate(e.schema, t, d, !0), i)
                    } else
                        this.traceableSetSchema(o.JSONUpdate(e.schema, t, o.JSONPipeIn(a), l), i)
            },
            moveUp: function(t) {
                t && this.traceableSetSchema(o.JSONMoveUpById(e.schema, t))
            },
            moveDown: function(t) {
                t && this.traceableSetSchema(o.JSONMoveDownById(e.schema, t))
            },
            del: function(t) {
                if (t === e.activeId)
                    this.setActiveId("");
                else if (e.activeId) {
                    var a = r.JSONGetById(e.schema, t);
                    r.JSONGetById(a, e.activeId) && this.setActiveId("")
                }
                this.traceableSetSchema(r.JSONDelete(e.schema, t))
            },
            duplicate: function(t) {
                this.traceableSetSchema(o.JSONDuplicate(e.schema, t))
            },
            emptyRegion: function(t, a) {
                var n;
                this.traceableSetSchema(o.JSONUpdate(e.schema, t, ((n = {})[a] = void 0,
                n)))
            },
            replaceChild: function(t, a) {
                this.traceableSetSchema(o.JSONUpdate(e.schema, t, a, !0))
            },
            setInsertRegion: function(t, a, n, l, i, r) {
                void 0 === a && (a = ""),
                void 0 === n && (n = "全部"),
                void 0 === l && (l = "insert"),
                void 0 === i && (i = ""),
                e.insertId = a,
                e.insertRegion = t,
                e.insertTag = n,
                e.insertMode = l,
                e.insertOrigId = i,
                e.insertBeforeId = r || ""
            },
            closeInsertPanel: function() {
                e.insertOrigId = "",
                e.insertId = "",
                e.insertRegion = "",
                e.insertSelected = "",
                e.insertRenderersKeywords = "",
                e.insertBeforeId = ""
            },
            setInsertRenderers: function(t) {
                e.insertRenderers = t
            },
            changeInsertRenderersKeywords: function(t) {
                e.insertRenderersKeywords = t
            },
            resetInsertRenderersKeywords: function() {
                e.insertRenderersKeywords = ""
            },
            setInsertTag: function(t) {
                e.insertTag = t
            },
            setInsertSelected: function(t) {
                e.insertSelected = t
            },
            setJSONSchemaUri: function(t) {
                e.jsonSchemaUri = t
            },
            openSubEditor: function(t) {
                e.activeId && (e.subEditorContext = n.__assign(n.__assign({}, t), {
                    data: t.data || {}
                }))
            },
            confirmSubEditor: function(t) {
                var a, n = t[0], i = e.subEditorContext, o = i.onChange, s = i.slot, d = n.schema, c = (null === (a = n.__pristine) || void 0 === a ? void 0 : a.schema) || d;
                if (s) {
                    var u = e.subEditorSlotPath.replace(/(?:\/)/g, ".");
                    d = l.getVariable(d, u),
                    c = l.getVariable(c, u),
                    Array.isArray(d) && 1 === d.length && !Array.isArray(c) && (d = d[0])
                }
                o(d, o.length > 1 ? r.diff(c, d) : void 0),
                e.subEditorContext = void 0
            },
            closeSubEditor: function() {
                e.subEditorContext = void 0
            },
            subEditorOnChange: function() {
                a && (e.subEditorContext = n.__assign(n.__assign({}, e.subEditorContext), {
                    canUndo: a.canUndo(),
                    canRedo: a.canRedo()
                }))
            },
            undoSubEditor: function() {
                a && a.undo()
            },
            redoSubEditor: function() {
                a && a.redo()
            },
            subEditorRef: function(e) {
                a = e
            },
            openScaffoldForm: function(t) {
                e.scaffoldForm = t
            },
            closeScaffoldForm: function() {
                e.scaffoldForm = void 0
            },
            calculateHighlightBox: function(t) {
                e.calculateStarted = !0,
                t.forEach((function(t) {
                    var a = e.getNodeById(t);
                    null == a || a.calculateHighlightBox(e)
                }
                ))
            },
            resetHighlightBox: function(t) {
                t.forEach((function(t) {
                    var a = e.getNodeById(t);
                    null == a || a.resetHighlightBox(e)
                }
                ))
            },
            traceableSetSchema: function(a, n) {
                var l = e.schemaHistory.findIndex((function(t) {
                    return t.versionId === e.versionId
                }
                ));
                ~l && e.schemaHistory.splice(l + 1, e.schemaHistory.length - l - 1),
                n && e.schemaHistory.pop(),
                e.schemaHistory.push({
                    versionId: e.versionId = t++,
                    schema: a
                }),
                e.schema = a
            },
            undo: function() {
                var t = e.schemaHistory.findIndex((function(t) {
                    return t.versionId === e.versionId
                }
                ));
                if (t > 0) {
                    var a = e.schemaHistory[t - 1];
                    e.versionId = a.versionId,
                    e.schema = a.schema
                }
            },
            redo: function() {
                var t = e.schemaHistory.findIndex((function(t) {
                    return t.versionId === e.versionId
                }
                ));
                if (t < e.schemaHistory.length - 1) {
                    var a = e.schemaHistory[t + 1];
                    e.versionId = a.versionId,
                    e.schema = a.schema
                }
            },
            resetHistory: function() {
                t = 0,
                e.versionId = t++,
                e.schemaHistory.replace([{
                    versionId: e.versionId,
                    schema: e.schema
                }])
            },
            applyPatches: function(t) {
                var a = e.schema;
                t.forEach((function(e) {
                    var t, l;
                    if ("update" === e.op)
                        a = o.JSONUpdate(a, e.target, e.value);
                    else if ("replace" === e.op)
                        a = o.JSONUpdate(a, e.target, e.value, !0);
                    else if ("delete" === e.op)
                        a = r.JSONDelete(a, e.target);
                    else if ("push" === e.op) {
                        var i = (s = r.JSONGetById(a, e.target))[e.key];
                        (i = Array.isArray(i) ? i.concat() : i ? [i] : []).push(e.value),
                        s = n.__assign(n.__assign({}, s), ((t = {})[e.key] = i,
                        t)),
                        a = o.JSONUpdate(a, e.target, s)
                    } else if ("splice" === e.op) {
                        var s;
                        i = (s = r.JSONGetById(a, e.target))[e.key];
                        (i = Array.isArray(i) ? i.concat() : i ? [i] : []).splice.apply(i, e.args),
                        s = n.__assign(n.__assign({}, s), ((l = {})[e.key] = i,
                        l)),
                        a = o.JSONUpdate(a, e.target, s)
                    }
                }
                )),
                this.traceableSetSchema(a)
            }
        }
    }
    ))
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.OutlinePanel = void 0;
    var n = a(0)
      , l = a(7)
      , i = n.__importDefault(a(4))
      , r = n.__importDefault(a(8))
      , o = a(6)
      , s = a(5)
      , d = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.handleClick = function(e) {
            var t = e.currentTarget
              , a = t.getAttribute("data-node-id")
              , n = t.getAttribute("data-node-region")
              , l = this.props.store
              , i = this.props.manager;
            n ? i.showInsertPanel(n, a) : l.setActiveId(a)
        }
        ,
        t.prototype.handleEnter = function(e) {
            var t = e.currentTarget
              , a = t.getAttribute("data-node-id")
              , n = t.getAttribute("data-node-region");
            this.props.store.setHoverId(a, n)
        }
        ,
        t.prototype.handleDragStart = function(e) {
            var t = e.currentTarget.getAttribute("data-node-id");
            t && this.props.manager.startDrag(t, e)
        }
        ,
        t.prototype.handleDragOver = function(e) {
            var t = e.target.closest("[data-node-id][data-node-region]");
            if (t) {
                var a = this.props.manager
                  , n = t.getAttribute("data-node-id")
                  , l = t.getAttribute("data-node-region");
                e.preventDefault(),
                n && l && a.dnd.switchToRegion(e.nativeEvent, n, l)
            }
        }
        ,
        t.prototype.handleDrop = function(e) {
            this.props.manager.dnd.drop(e.nativeEvent)
        }
        ,
        t.prototype.renderItem = function(e, t) {
            var a = this
              , n = this.props.store
              , l = !n.dragging && e.singleRegion ? e.uniqueChildren[0].uniqueChildren : e.uniqueChildren
              , o = l.length;
            return !n.dragging || e.isRegion || e.children.length ? i.default.createElement("li", {
                className: r.default("ae-Outline-node", {
                    "is-folded": e.folded,
                    "is-active": n.activeId === e.id && !e.region || e.isRegion && n.dropId === e.id && n.dropRegion === e.region,
                    "is-region": e.isRegion,
                    "is-hover": !e.isRegion && (n.isHoved(e.id) || n.isContextOn(e.id)),
                    "has-children": o,
                    "is-dragging": n.dragId === e.id && "schema" === n.dragType
                }),
                key: t,
                title: "可点击右键进行操作"
            }, i.default.createElement("a", {
                onClick: this.handleClick,
                onMouseEnter: this.handleEnter,
                "data-node-id": e.id,
                "data-node-region": e.region,
                draggable: e.draggable,
                onDragStart: this.handleDragStart
            }, o ? i.default.createElement("span", {
                onClick: e.toggleFold,
                className: r.default("ae-Outline-expander", {
                    "is-folded": e.folded
                }),
                "data-node-id": e.id,
                "data-node-region": e.region
            }, i.default.createElement(s.Icon, {
                icon: "right-arrow-bold"
            })) : null, e.label), o ? i.default.createElement("ul", {
                className: "ae-Outline-sublist"
            }, l.map((function(e, t) {
                return a.renderItem(e, t)
            }
            ))) : null) : null
        }
        ,
        t.prototype.render = function() {
            var e = this
              , t = this.props.store
              , a = t.outline;
            return i.default.createElement("div", {
                className: r.default("ae-Outline", {
                    "ae-Outline--draging": t.dragging
                }),
                onDragOver: this.handleDragOver,
                onDrop: this.handleDrop
            }, t.dragging ? i.default.createElement("div", {
                className: "ae-Outline-tip"
            }, "将目标拖入导航中的节点可以切换容器！") : null, a.length ? i.default.createElement("ul", {
                className: "ae-Outline-list"
            }, a.map((function(t, a) {
                return e.renderItem(t, a)
            }
            ))) : i.default.createElement("div", null, "计算中，请稍等。。"))
        }
        ,
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleClick", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleEnter", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleDragStart", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleDragOver", null),
        n.__decorate([o.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleDrop", null),
        t = n.__decorate([l.observer], t)
    }(i.default.Component);
    t.OutlinePanel = d
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.InsertSubRendererPanel = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(9))
      , r = a(7)
      , o = n.__importDefault(a(4))
      , s = a(6)
      , d = a(47)
      , c = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.handleLeftClick = function(e) {
            var t = e.currentTarget.getAttribute("data-value");
            this.props.store.setInsertTag(t)
        }
        ,
        t.prototype.handleClick = function(e) {
            var t = e.currentTarget.getAttribute("data-value");
            this.props.store.setInsertSelected(t)
        }
        ,
        t.prototype.hadnlDBClick = function(e) {
            var t = e.currentTarget.getAttribute("data-value");
            this.props.store.setInsertSelected(t),
            this.props.manager.insert()
        }
        ,
        t.prototype.handleInsert = function() {
            this.props.manager.insert()
            this.props.store.closeInsertPanel()
        }
        ,
        t.prototype.handleReplace = function() {
            this.props.manager.replace()
        }
        ,
        t.prototype.handleCancel = function() {
            this.props.store.closeInsertPanel()
        }
        ,
        t.prototype.render = function() {
            var e, t, a = this, n = this.props.store, r = this.props.manager, s = null === (e = n.getNodeById(n.insertId)) || void 0 === e ? void 0 : e.info, c = null === (t = i.default(s.regions, (function(e) {
                return e.key === n.insertRegion
            }
            ))) || void 0 === t ? void 0 : t.label, u = n.groupedInsertRenderers, p = Object.keys(u), m = n.insertTag || "全部", f = u[m];
            return o.default.createElement("div", {
                className: "ae-InsertPanel"
            }, "replace" === n.insertMode ? o.default.createElement("div", {
                className: "ae-InsertPanel-title"
            }, "更改组件类型") : o.default.createElement("div", {
                className: "ae-InsertPanel-title"
            }, "选中组件插入到 ", o.default.createElement("code", null, s.name, " > ", c)), o.default.createElement("div", {
                className: "m-b-xs"
            }, o.default.createElement(l.InputBox, {
                value: n.insertRenderersKeywords,
                onChange: n.changeInsertRenderersKeywords,
                placeholder: "输入关键字可过滤组件",
                clearable: !1
            }, n.insertRenderersKeywords ? o.default.createElement("a", {
                onClick: n.resetInsertRenderersKeywords
            }, o.default.createElement(l.Icon, {
                icon: "close",
                className: "icon"
            })) : o.default.createElement(l.Icon, {
                icon: "search",
                className: "icon"
            }))), o.default.createElement("div", {
                className: "ae-RenderersPicker-list"
            }, o.default.createElement("ul", null, p.map((function(e) {
                return o.default.createElement("li", {
                    key: e,
                    className: m === e ? "is-active" : ""
                }, o.default.createElement("a", {
                    "data-value": e,
                    onClick: a.handleLeftClick
                }, e))
            }
            ))), o.default.createElement("div", {
                className: "ae-RenderersPicker-content"
            }, Array.isArray(f) && f.length ? o.default.createElement("ul", null, f.map((function(e) {
                return o.default.createElement("li", {
                    key: e.id,
                    className: n.insertSelected === e.id ? "is-active" : "",
                    "data-value": e.id,
                    onClick: a.handleClick,
                    onDoubleClick: a.hadnlDBClick
                }, o.default.createElement(d.RendererThumb, {
                    theme: r.env.theme,
                    schema: e.previewSchema || {
                        type: "tpl",
                        tpl: "无法预览"
                    }
                }), o.default.createElement("div", {
                    className: "ae-RenderersPicker-info"
                }, o.default.createElement("h4", null, e.name), o.default.createElement("div", null, o.default.createElement(l.Html, {
                    html: e.description
                }), e.docLink ? o.default.createElement("a", {
                    target: "_blank",
                    href: e.docLink
                }, " 详情 ") : null)))
            }
            ))) : o.default.createElement("div", null, "没有可用组件，也许你该切换容器试试。"))), o.default.createElement("div", {
                className: "ae-InsertPanel-footer"
            }, "replace" === n.insertMode ? o.default.createElement(l.Button, {
                onClick: this.handleReplace,
                disabled: !n.insertSelected,
                level: "primary"
            }, "替换") : o.default.createElement(l.Button, {
                onClick: this.handleInsert,
                disabled: !n.insertSelected,
                level: "primary"
            }, "插入"), o.default.createElement(l.Button, {
                onClick: this.handleCancel
            }, "取消")))
        }
        ,
        n.__decorate([s.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleLeftClick", null),
        n.__decorate([s.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleClick", null),
        n.__decorate([s.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "hadnlDBClick", null),
        n.__decorate([s.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], t.prototype, "handleInsert", null),
        n.__decorate([s.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], t.prototype, "handleReplace", null),
        n.__decorate([s.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], t.prototype, "handleCancel", null),
        t = n.__decorate([r.observer], t)
    }(o.default.Component);
    t.InsertSubRendererPanel = c
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.RendererThumb = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(5)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.state = {
                scale: !0
            },
            t.env = {
                session: "preview"
            },
            t
        }
        return n.__extends(t, e),
        t.prototype.componentWillMount = function() {
            this.rootRef = this.rootRef.bind(this),
            this.syncHeight = this.syncHeight.bind(this),
            this.handleClick = this.handleClick.bind(this)
        }
        ,
        t.prototype.componentWillUnmount = function() {
            this.unSensor && this.unSensor()
        }
        ,
        t.prototype.rootRef = function(e) {
            this.ref = e,
            e && (this.syncHeight(),
            this.unSensor = r.resizeSensor(e.firstChild, this.syncHeight))
        }
        ,
        t.prototype.syncHeight = function() {
            if (this.ref) {
                var e = this.state.scale
                  , t = this.ref.firstChild;
                this.ref.style.cssText = "height: " + t.scrollHeight / (e ? 2 : 1) + "px;"
            }
        }
        ,
        t.prototype.handleClick = function(e) {
            e.preventDefault(),
            this.setState({
                scale: !this.state.scale
            })
        }
        ,
        t.prototype.render = function() {
            var e = this
              , t = this.props
              , a = t.schema
              , n = t.theme;
            return i.default.createElement(l.LazyComponent, {
                unMountOnHidden: !1,
                schema: a,
                component: function(t) {
                    var a = t.schema;
                    return i.default.createElement("div", {
                        className: "ae-RenderersPicker-thumb " + (e.state.scale ? "is-scaled" : "")
                    }, i.default.createElement("div", {
                        className: "ae-Editor-rendererThumbWrap"
                    }, i.default.createElement("div", {
                        className: "ae-Editor-rendererThumbIcon",
                        onClick: e.handleClick
                    }, i.default.createElement(l.Icon, {
                        icon: e.state.scale ? "zoom-in" : "zoom-out"
                    })), i.default.createElement("div", {
                        ref: e.rootRef,
                        className: "ae-Editor-rendererThumb"
                    }, i.default.createElement("div", {
                        className: "ae-Editor-rendererThumbInner"
                    }, r.render(a, {
                        theme: n
                    }, e.env)))))
                }
            })
        }
        ,
        t
    }(i.default.Component);
    t.RendererThumb = o
}
, function(e, t) {
    e.exports = require("lodash/isPlainObject")
}
, function(e, t) {
    e.exports = require("lodash/groupBy")
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.env = void 0;
    t.env = {
        updateLocation: function() {},
        jumpTo: function() {}
    };
}
, function(e, t) {
    e.exports = {};
}
, function(e, t) {
    e.exports = require("copy-to-clipboard")
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.EditorDNDManager = void 0;
    var n = a(0)
      , l = n.__importDefault(a(9))
      , i = a(6)
      , r = a(33)
      , o = a(54)
      , s = function() {
        function e(e, t) {
            this.manager = e,
            this.store = t,
            this.toDispose = [],
            this.dragEnterCount = 0,
            this.lastX = 0,
            this.lastY = 0,
            this.lastMoveAt = 0,
            this.toDispose.push(i.reactionWithOldValue((function() {
                return "schema" === t.dragType ? t.dragId : ""
            }
            ), this.updateDragElements), i.reactionWithOldValue((function() {
                return {
                    id: t.dropId,
                    region: t.dropRegion
                }
            }
            ), this.updateDropRegion), i.reactionWithOldValue((function() {
                return {
                    id: t.planDropId,
                    region: t.planDropRegion
                }
            }
            ), this.updatePlanDropRegion)),
            this.dragGhost = document.createElement("div"),
            this.dragGhost.classList.add("ae-DragGhost"),
            this.dragGhost.classList.add("is-ghost")
        }
        return e.prototype.createDragImage = function(e, t) {
            var a = document.createElement("div");
            return a.classList.add("ae-DragImage"),
            a.innerHTML = "<span>" + t.label + "</span>",
            document.body.appendChild(a),
            a.style.cssText += "width: " + t.w + "px; height: " + t.h + "px;",
            this.dragImage = a,
            a
        }
        ,
        e.prototype.disposeDragImage = function() {
            var e, t = this.dragImage;
            null === (e = null == t ? void 0 : t.parentElement) || void 0 === e || e.removeChild(t),
            delete this.dragImage
        }
        ,
        e.prototype.switchToRegion = function(e, t, a) {
            var n, l, i, r = this.store;
            if (!t || !a || r.dropId === t && r.dropRegion === a)
                return !1;
            var o = r.getNodeById(t, a)
              , s = o.regionInfo
              , d = r.dragSchema;
            if (!1 === (null === (n = null == s ? void 0 : s.accept) || void 0 === n ? void 0 : n.call(s, d)))
                return !1;
            var c = {
                mode: r.dragMode,
                sourceType: r.dragType,
                sourceId: r.dragId,
                data: r.dragSchema,
                targetId: t,
                targetRegion: a
            };
            return !this.manager.trigger("dnd-accept", c).prevented && (null === (l = this.dndMode) || void 0 === l || l.leave(e, this.dragGhost),
            null === (i = this.dndMode) || void 0 === i || i.dispose(),
            r.setDropId(t, a),
            this.makeDNDModeInstance(o),
            this.dndMode.enter(e, this.dragGhost),
            !0)
        }
        ,
        e.prototype.makeDNDModeInstance = function(e) {
            var t, a = null === (t = e.regionInfo) || void 0 === t ? void 0 : t.dndMode, n = r.DefaultDNDMode;
            "position-h" === a && (n = o.PositionHDNDMode),
            this.dndMode = new n(this,e)
        }
        ,
        e.prototype.startDrag = function(e, t) {
            var a, n = this, l = this.store.getNodeById(e), i = document.querySelector('[data-editor-id="' + e + '"]');
            l && i ? (this.dragElement = i,
            t.dataTransfer.effectAllowed = "move",
            t.dataTransfer.setDragImage(this.createDragImage(e, l), 0, 0),
            t.dataTransfer.setData(("dnd/ae-node-" + e).toLowerCase(), ""),
            null === (a = t.target) || void 0 === a || a.addEventListener("dragend", this.dragEnd),
            setTimeout((function() {
                n.store.setDragId(e);
                var a = l.parent;
                n.switchToRegion(t, a.id, a.region)
            }
            ), 4)) : t.preventDefault()
        }
        ,
        e.prototype.dragEnter = function(e) {
            var t = this.store;
            if (this.dragEnterCount++,
            !t.dragId && 1 === this.dragEnterCount)
                for (var a = e.dataTransfer.types, n = a.length - 1; n >= 0; n--)
                    if (/^dnd-dom\/(.*)$/.test(a[n])) {
                        var l = RegExp.$1
                          , i = document.querySelector(l);
                        if (i) {
                            i.addEventListener("dragend", this.dragEnd);
                            var r = i.getAttribute("data-dnd-id")
                              , o = i.getAttribute("data-dnd-type")
                              , s = i.getAttribute("data-dnd-data")
                              , d = s ? JSON.parse(s) : {
                                type: "tpl",
                                tpl: "Unknown"
                            };
                            t.setDragId(r, "copy", o, d);
                            var c = t.activeContainerId;
                            if (c) {
                                var u = t.getNodeById(c);
                                (null == u ? void 0 : u.childRegions.length) && this.switchToRegion(e, u.id, u.childRegions[0].region)
                            }
                            break
                        }
                    }
        }
        ,
        e.prototype.dragOver = function(e) {
            var t = this.store
              , a = e.target;
            if (t.dropId && a) {
                e.preventDefault();
                var n = e.clientX - this.lastX
                  , l = e.clientY - this.lastY
                  , i = Math.max(Math.abs(n), Math.abs(l))
                  , r = Date.now();
                if (i < 5) {
                    var o = a.closest("[data-region][data-region-host]")
                      , s = null == o ? void 0 : o.getAttribute("data-region-host")
                      , d = null == o ? void 0 : o.getAttribute("data-region");
                    if (!o || s === t.dropId)
                        return;
                    0 === this.lastMoveAt || (r - this.lastMoveAt > 3e3 ? this.switchToRegion(e, s, d) : r - this.lastMoveAt > 1e3 && d && s && t.setPlanDropId(s, d))
                } else {
                    t.setPlanDropId("", ""),
                    this.lastMoveAt = r,
                    this.lastX = e.clientX,
                    this.lastY = e.clientY;
                    var c = a.closest('[data-region][data-region-host="' + t.dropId + '"]')
                      , u = null == c ? void 0 : c.getAttribute("data-region");
                    u && u !== t.dropRegion && this.switchToRegion(e, t.dropId, u),
                    this.dndMode.over(e, this.dragGhost)
                }
            }
        }
        ,
        e.prototype.drop = function(e) {
            return n.__awaiter(this, void 0, void 0, (function() {
                var e, t, a, i, r, o;
                return n.__generator(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return e = this.store,
                        t = this.dndMode.getDropBeforeId(),
                        "move" !== e.dragMode ? [3, 1] : (this.manager.move(e.dropId, e.dropRegion, e.dragId, t),
                        [3, 4]);
                    case 1:
                        return "copy" !== e.dragMode ? [3, 4] : (a = e.dragSchema,
                        i = e.dropId,
                        r = e.dropRegion,
                        o = void 0,
                        "subrenderer" !== e.dragType ? [3, 3] : (null == (o = l.default(e.subRenderers, (function(t) {
                            return t.id === e.dragId
                        }
                        ))) ? void 0 : o.scaffoldForm) ? [4, this.manager.scaffold(o.scaffoldForm, a)] : [3, 3]);
                    case 2:
                        a = n.sent(),
                        n.label = 3;
                    case 3:
                        this.manager.addChild(i, r, a, t, o, {
                            id: e.dragId,
                            type: e.dragType,
                            data: e.dragSchema
                        }),
                        n.label = 4;
                    case 4:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.dragLeave = function(e) {
            this.dragEnterCount--
        }
        ,
        e.prototype.dragEnd = function(e) {
            var t, a;
            null === (t = e.target) || void 0 === t || t.removeEventListener("dragend", this.dragEnd),
            null === (a = this.dndMode) || void 0 === a || a.leave(e, this.dragGhost),
            delete this.dndMode,
            this.dragGhost.innerHTML = "",
            this.store.setDragId(""),
            this.store.setDropId(""),
            this.disposeDragImage(),
            this.dragEnterCount = 0
        }
        ,
        e.prototype.updateDragElements = function(e) {
            e ? [].slice.call(document.querySelectorAll('[data-editor-id="' + e + '"]')).forEach((function(e) {
                return e.classList.add("ae-is-draging")
            }
            )) : [].slice.call(document.querySelectorAll(".ae-is-draging")).forEach((function(e) {
                return e.classList.remove("ae-is-draging")
            }
            ))
        }
        ,
        e.prototype.updateDropRegion = function(e, t) {
            var a, n;
            (null == t ? void 0 : t.id) && t.region && (null === (a = document.querySelector('[data-region="' + t.region + '"][data-region-host="' + t.id + '"]')) || void 0 === a || a.classList.remove("is-dragenter")),
            e.id && e.region && (null === (n = document.querySelector('[data-region="' + e.region + '"][data-region-host="' + e.id + '"]')) || void 0 === n || n.classList.add("is-dragenter"))
        }
        ,
        e.prototype.updatePlanDropRegion = function(e, t) {
            var a, n;
            (null == t ? void 0 : t.id) && t.region && (null === (a = document.querySelector('[data-region="' + t.region + '"][data-region-host="' + t.id + '"]')) || void 0 === a || a.classList.remove("is-entering")),
            e.id && e.region && (null === (n = document.querySelector('[data-region="' + e.region + '"][data-region-host="' + e.id + '"]')) || void 0 === n || n.classList.add("is-entering"))
        }
        ,
        e.prototype.dispose = function() {
            this.disposeDragImage(),
            this.toDispose.forEach((function(e) {
                return e()
            }
            )),
            this.toDispose = []
        }
        ,
        n.__decorate([i.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [DragEvent]), n.__metadata("design:returntype", void 0)], e.prototype, "dragEnter", null),
        n.__decorate([i.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [DragEvent]), n.__metadata("design:returntype", void 0)], e.prototype, "dragOver", null),
        n.__decorate([i.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [DragEvent]), n.__metadata("design:returntype", Promise)], e.prototype, "drop", null),
        n.__decorate([i.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [DragEvent]), n.__metadata("design:returntype", void 0)], e.prototype, "dragLeave", null),
        n.__decorate([i.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [DragEvent]), n.__metadata("design:returntype", void 0)], e.prototype, "dragEnd", null),
        n.__decorate([i.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [String]), n.__metadata("design:returntype", void 0)], e.prototype, "updateDragElements", null),
        n.__decorate([i.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object, Object]), n.__metadata("design:returntype", void 0)], e.prototype, "updateDropRegion", null),
        n.__decorate([i.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object, Object]), n.__metadata("design:returntype", void 0)], e.prototype, "updatePlanDropRegion", null),
        e
    }();
    t.EditorDNDManager = s
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.PositionHDNDMode = void 0;
    var n = a(0)
      , l = n.__importDefault(a(10))
      , i = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.enter = function(e, t) {
            t.innerHTML = "",
            t.classList.add("use-position"),
            t.classList.add("is-horizontal");
            var a = this.dnd.dragElement
              , n = this.constainer.getBoundingClientRect()
              , i = Array.isArray(this.region.schema) ? this.region.schema : [];
            if (a && a.closest("[data-region]") === this.constainer) {
                var r = a.getAttribute("data-editor-id")
                  , o = l.default(i, (function(e) {
                    return e.$$id === r
                }
                ));
                if (~o && i[o + 1] && (this.dropBeforeId = i[o + 1].$$id),
                a.nextElementSibling) {
                    var s = a.nextElementSibling.getBoundingClientRect();
                    t.style.cssText += "top: 0; left: " + (s.x - n.x) + "px;"
                } else
                    t.style.cssText += "top: 0; left: 100%;"
            } else
                t.style.cssText += "top: 0; left: -999999%;";
            this.constainer.appendChild(t)
        }
        ,
        t.prototype.leave = function(e, t) {
            t.classList.remove("use-position"),
            t.classList.remove("is-horizontal")
        }
        ,
        t.prototype.over = function(e, t) {
            var a, n, l = this.getTarget(e);
            if (l) {
                if ("table" === (null === (a = this.constainer) || void 0 === a ? void 0 : a.getAttribute("data-renderer"))) {
                    var i = null === (n = l.parentElement) || void 0 === n ? void 0 : n.closest("th[data-editor-id], td[data-editor-id]");
                    i && this.constainer.contains(i) && (l = i)
                }
                var r = this.constainer.getBoundingClientRect()
                  , o = (Array.isArray(this.region.schema) && this.region.schema,
                l.getBoundingClientRect());
                l.nextElementSibling && l.nextElementSibling.hasAttribute("data-editor-id") ? (t.style.cssText += "left: " + (o.x - r.x) + "px;",
                this.dropBeforeId = l.getAttribute("data-editor-id")) : e.clientX > o.x + o.width / 2 ? (t.style.cssText += "top: 0; left: " + (o.right - r.x) + "px;",
                delete this.dropBeforeId) : (t.style.cssText += "left: " + (o.x - r.x) + "px;",
                this.dropBeforeId = l.getAttribute("data-editor-id"))
            }
        }
        ,
        t
    }(a(33).DefaultDNDMode);
    t.PositionHDNDMode = i
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.Panels = void 0;
    var n = a(0)
      , l = a(7)
      , i = n.__importDefault(a(4))
      , r = n.__importDefault(a(8))
      , o = a(5)
      , s = a(6)
      , d = a(11)
      , c = n.__importDefault(a(9))
      , u = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.handleSelect = function(e) {
            var t = this.props.store;
            this.isLeftPanel ? t.changeLeftPanelKey(e) : t.changePanelKey(e)
        }
        ,
        t.prototype.getPopOverContainer = function() {
            return d.findDOMNode(this)
        }
        ,
        t.prototype.render = function() {
            var e = this
              , t = this.props.store
              , a = this.props.manager;
            this.isLeftPanel = this.props.isLeftPanel || !1;
            var n = this.isLeftPanel ? t.getLeftPanels() : t.getPanels()
              , l = this.props.theme
              , s = t.activeId
              , d = t.getNodeById(s)
              , u = this.isLeftPanel ? t.getLeftPanelKey() : t.getPanelKey()
              , p = "insert" === u && c.default(n, (function(e) {
                return "insert" === e.key
            }
            ));
            return i.default.createElement("div", {
                className: r.default("ae-Settings", "none" !== u ? "is-active" : "", this.isLeftPanel ? "is-left" : "")
            }, i.default.createElement("div", {
                className: "ae-Settings-inner"
            }, n.length ? i.default.createElement(o.Tabs, {
                theme: l,
                className: r.default("ae-Settings-tabs", {
                    "ae-LeftSettings-tabs": this.isLeftPanel
                }),
                contentClassName: r.default("ae-Settings-tabs-content"),
                activeKey: u,
                onSelect: this.handleSelect,
                mountOnEnter: !0,
                unmountOnExit: !0
            }, n.map((function(n) {
                return "insert" !== n.key ? i.default.createElement(o.Tab, {
                    key: n.key,
                    eventKey: n.key,
                    title: n.title,
                    icon: n.icon,
                    className: "ae-Editor-" + n.key + "Pane"
                }, n.key !== u ? null : n.render ? n.render({
                    id: s,
                    info: null == d ? void 0 : d.info,
                    path: null == d ? void 0 : d.path,
                    value: t.value,
                    onChange: a.panelChangeValue,
                    store: t,
                    manager: a,
                    popOverContainer: e.getPopOverContainer
                }) : n.component ? i.default.createElement(n.component, {
                    key: n.key,
                    id: s,
                    info: null == d ? void 0 : d.info,
                    path: null == d ? void 0 : d.path,
                    value: t.value,
                    onChange: a.panelChangeValue,
                    store: t,
                    manager: a,
                    popOverContainer: e.getPopOverContainer
                }) : null) : null
            }
            ))) : null), i.default.createElement(o.Drawer, {
                position: "left",
                size: "md",
                show: !!p,
                onHide: t.closeInsertPanel
            }, p && p.component ? i.default.createElement(p.component, {
                key: p.key,
                id: s,
                info: null == d ? void 0 : d.info,
                path: null == d ? void 0 : d.path,
                value: t.value,
                onChange: a.panelChangeValue,
                store: t,
                manager: a,
                popOverContainer: this.getPopOverContainer
            }) : null))
        }
        ,
        n.__decorate([s.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [String]), n.__metadata("design:returntype", void 0)], t.prototype, "handleSelect", null),
        n.__decorate([s.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], t.prototype, "getPopOverContainer", null),
        t = n.__decorate([l.observer], t)
    }(i.default.Component);
    t.Panels = u
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(7)
      , r = a(6)
      , o = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.handleClick = function(e) {
            var t, a = e.currentTarget, n = a.getAttribute("data-node-id"), l = a.getAttribute("data-node-region"), i = this.props.store, r = this.props.manager, o = i.getNodeById(n);
            !1 !== (null === (t = null == o ? void 0 : o.info) || void 0 === t ? void 0 : t.editable) && (l ? r.showInsertPanel(l, n) : i.setActiveId(n))
        }
        ,
        t.prototype.handleMouseEnter = function(e) {
            var t = e.currentTarget
              , a = t.getAttribute("data-node-id")
              , n = t.getAttribute("data-node-region");
            this.props.store.setHoverId(a, n)
        }
        ,
        t.prototype.render = function() {
            var e = this
              , t = this.props.store.bcn;
            return l.default.createElement("div", {
                className: "ae-Breadcrumb"
            }, l.default.createElement("span", null, "组件路径："), t.length ? l.default.createElement("ul", null, t.map((function(t, a) {
                var n, i = null === (n = t.parent) || void 0 === n ? void 0 : n.uniqueChildren;
                return l.default.createElement("li", {
                    key: a
                }, l.default.createElement("a", {
                    "data-node-id": t.id,
                    "data-node-region": t.region,
                    onClick: e.handleClick,
                    onMouseEnter: e.handleMouseEnter
                }, t.label), (null == i ? void 0 : i.length) > 1 ? l.default.createElement("ul", null, i.map((function(a) {
                    return l.default.createElement("li", {
                        key: a.id + "-" + a.region
                    }, l.default.createElement("a", {
                        "data-node-id": a.id,
                        "data-node-region": a.region,
                        onClick: e.handleClick,
                        onMouseEnter: e.handleMouseEnter,
                        className: a.id === t.id && a.region === t.region ? "is-active" : ""
                    }, a.label))
                }
                ))) : null)
            }
            ))) : l.default.createElement("span", null, "点选组件开始编辑"))
        }
        ,
        n.__decorate([r.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleClick", null),
        n.__decorate([r.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleMouseEnter", null),
        t = n.__decorate([i.observer], t)
    }(l.default.Component);
    t.default = o
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ClassNameControl = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(11)
      , o = [{
        label: "外边距",
        children: [{
            label: "整体",
            children: [{
                label: "极小",
                value: "m-xs"
            }, {
                label: "小",
                value: "m-sm"
            }, {
                label: "正常",
                value: "m"
            }, {
                label: "中",
                value: "m-md"
            }, {
                label: "大",
                value: "m-lg"
            }]
        }, {
            label: "上边距",
            children: [{
                label: "极小",
                value: "m-t-xs"
            }, {
                label: "小",
                value: "m-t-sm"
            }, {
                label: "正常",
                value: "m-t"
            }, {
                label: "中",
                value: "m-t-md"
            }, {
                label: "大",
                value: "m-t-lg"
            }]
        }, {
            label: "右边距",
            children: [{
                label: "极小",
                value: "m-r-xs"
            }, {
                label: "小",
                value: "m-r-sm"
            }, {
                label: "正常",
                value: "m-r"
            }, {
                label: "中",
                value: "m-r-md"
            }, {
                label: "大",
                value: "m-r-lg"
            }]
        }, {
            label: "下边距",
            children: [{
                label: "极小",
                value: "m-b-xs"
            }, {
                label: "小",
                value: "m-b-sm"
            }, {
                label: "正常",
                value: "m-b"
            }, {
                label: "中",
                value: "m-b-md"
            }, {
                label: "大",
                value: "m-b-lg"
            }]
        }, {
            label: "左边距",
            children: [{
                label: "极小",
                value: "m-l-xs"
            }, {
                label: "小",
                value: "m-l-sm"
            }, {
                label: "正常",
                value: "m-l"
            }, {
                label: "中",
                value: "m-l-md"
            }, {
                label: "大",
                value: "m-l-lg"
            }]
        }, {
            label: "置无",
            children: [{
                label: "全部",
                value: "m-none"
            }, "|", {
                label: "上",
                value: "m-t-none"
            }, {
                label: "右",
                value: "m-r-none"
            }, {
                label: "下",
                value: "m-b-none"
            }, {
                label: "左",
                value: "m-l-none"
            }]
        }]
    }, {
        label: "内边距",
        children: [{
            label: "整体",
            children: [{
                label: "极小",
                value: "p-xs"
            }, {
                label: "小",
                value: "p-sm"
            }, {
                label: "正常",
                value: "p"
            }, {
                label: "中",
                value: "p-md"
            }, {
                label: "大",
                value: "p-lg"
            }]
        }, {
            label: "上边距",
            children: [{
                label: "极小",
                value: "p-t-xs"
            }, {
                label: "小",
                value: "p-t-sm"
            }, {
                label: "正常",
                value: "p-t"
            }, {
                label: "中",
                value: "p-t-md"
            }, {
                label: "大",
                value: "p-t-lg"
            }]
        }, {
            label: "右边距",
            children: [{
                label: "极小",
                value: "p-r-xs"
            }, {
                label: "小",
                value: "p-r-sm"
            }, {
                label: "正常",
                value: "p-r"
            }, {
                label: "中",
                value: "p-r-md"
            }, {
                label: "大",
                value: "p-r-lg"
            }]
        }, {
            label: "下边距",
            children: [{
                label: "极小",
                value: "p-b-xs"
            }, {
                label: "小",
                value: "p-b-sm"
            }, {
                label: "正常",
                value: "p-b"
            }, {
                label: "中",
                value: "p-b-md"
            }, {
                label: "大",
                value: "p-b-lg"
            }]
        }, {
            label: "左边距",
            children: [{
                label: "极小",
                value: "p-l-xs"
            }, {
                label: "小",
                value: "p-l-sm"
            }, {
                label: "正常",
                value: "p-l"
            }, {
                label: "中",
                value: "p-l-md"
            }, {
                label: "大",
                value: "p-l-lg"
            }]
        }, {
            label: "置无",
            children: [{
                label: "全部",
                value: "p-none"
            }, "|", {
                label: "上",
                value: "p-t-none"
            }, {
                label: "右",
                value: "p-r-none"
            }, {
                label: "下",
                value: "p-b-none"
            }, {
                label: "左",
                value: "p-l-none"
            }]
        }]
    }, {
        label: "边框",
        className: "w2x",
        children: [{
            label: "位置",
            children: [{
                label: "全部",
                value: "b-a"
            }, "|", {
                label: "上",
                value: "b-t"
            }, {
                label: "右",
                value: "b-r"
            }, {
                label: "下",
                value: "b-b"
            }, {
                label: "左",
                value: "b-l"
            }, "|", {
                label: "置无",
                value: "no-border"
            }]
        }, {
            label: "大小",
            children: [{
                label: "2x",
                value: "b-2x"
            }, {
                label: "3x",
                value: "b-3x"
            }, {
                label: "4x",
                value: "b-4x"
            }, {
                label: "5x",
                value: "b-5x"
            }]
        }, {
            label: "颜色",
            children: [{
                label: "主色",
                value: "b-primary",
                className: "bg-primary"
            }, {
                label: "信息",
                value: "b-info",
                className: "bg-info"
            }, {
                label: "警告",
                value: "b-warning",
                className: "bg-warning"
            }, {
                label: "危险",
                value: "b-danger",
                className: "bg-danger"
            }, {
                label: "成功",
                value: "b-success",
                className: "bg-success"
            }, {
                label: "白色",
                value: "b-white",
                className: "bg-white"
            }, {
                label: "暗色",
                value: "b-dark",
                className: "bg-dark"
            }, {
                label: "浅色",
                value: "b-light",
                className: "bg-light"
            }]
        }]
    }, {
        label: "其他",
        className: "w2x",
        children: [{
            label: "圆角",
            children: [{
                label: "全部",
                value: "r"
            }, "|", {
                label: "上",
                value: "r-t"
            }, {
                label: "右",
                value: "r-r"
            }, {
                label: "下",
                value: "r-b"
            }, {
                label: "左",
                value: "r-l"
            }, "|", {
                label: "2x",
                value: "r-2x"
            }, {
                label: "3x",
                value: "r-3x"
            }]
        }, {
            label: "字体",
            children: [{
                label: "正常",
                value: "font-normal"
            }, {
                label: "细",
                value: "font-thin"
            }, {
                label: "粗",
                value: "font-bold"
            }, "|", {
                label: "极小",
                value: "text-xs"
            }, {
                label: "小",
                value: "text-sm"
            }, {
                label: "正常",
                value: "text-base"
            }, {
                label: "中",
                value: "text-md"
            }, {
                label: "大",
                value: "text-lg"
            }]
        }, {
            label: "颜色",
            children: [{
                label: "主色",
                value: "text-primary",
                className: "text-primary"
            }, {
                label: "信息",
                value: "text-info",
                className: "text-info"
            }, {
                label: "警告",
                value: "text-warning",
                className: "text-warning"
            }, {
                label: "危险",
                value: "text-danger",
                className: "text-danger"
            }, {
                label: "成功",
                value: "text-success",
                className: "text-success"
            }, {
                label: "白色",
                value: "text-white",
                className: "text-white bg-dark"
            }, {
                label: "暗色",
                value: "text-dark",
                className: "text-dark"
            }, {
                label: "淡色",
                value: "text-muted",
                className: "text-muted"
            }]
        }, {
            label: "背景",
            children: [{
                label: "主色",
                value: "bg-primary",
                className: "bg-primary"
            }, {
                label: "信息",
                value: "bg-info",
                className: "bg-info"
            }, {
                label: "警告",
                value: "bg-warning",
                className: "bg-warning"
            }, {
                label: "危险",
                value: "bg-danger",
                className: "bg-danger"
            }, {
                label: "成功",
                value: "bg-success",
                className: "bg-success"
            }, {
                label: "白色",
                value: "bg-white",
                className: "bg-white"
            }, {
                label: "暗色",
                value: "bg-dark",
                className: "bg-dark"
            }, {
                label: "浅色",
                value: "bg-light",
                className: "bg-light"
            }, "|", {
                label: "置无",
                value: "no-bg"
            }]
        }, {
            label: "宽度",
            children: [{
                label: "特小",
                value: "w-xxs"
            }, {
                label: "极小",
                value: "w-xs"
            }, {
                label: "小",
                value: "w-sm"
            }, {
                label: "正常",
                value: "w"
            }, {
                label: "中",
                value: "w-md"
            }, {
                label: "大",
                value: "w-lg"
            }, {
                label: "加大",
                value: "w-xl"
            }, {
                label: "特大",
                value: "w-xxl"
            }, {
                label: "占满",
                value: "w-full"
            }]
        }]
    }];
    var s = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.state = {
                isFocused: !1,
                isOpened: !1
            },
            t.values = [],
            t
        }
        return n.__extends(t, e),
        t.prototype.open = function() {
            this.setState({
                isOpened: !0
            })
        }
        ,
        t.prototype.close = function() {
            this.setState({
                isOpened: !1
            })
        }
        ,
        t.prototype.toggle = function() {
            this.setState({
                isOpened: !this.state.isOpened
            })
        }
        ,
        t.prototype.handleFocus = function(e) {
            this.setState({
                isFocused: !0
            }),
            this.props.onFocus && this.props.onFocus(e)
        }
        ,
        t.prototype.handleBlur = function(e) {
            this.setState({
                isFocused: !1
            }),
            this.props.onBlur && this.props.onBlur(e)
        }
        ,
        t.prototype.handleChange = function(e) {
            (0,
            this.props.onChange)(e.currentTarget.value)
        }
        ,
        t.prototype.getParent = function() {
            return r.findDOMNode(this)
        }
        ,
        t.prototype.getTarget = function() {
            return r.findDOMNode(this)
        }
        ,
        t.prototype.handlePopOverChange = function(e) {
            var t = this.props.value || ""
              , a = t.replace(/\s+/g, " ").split(/\s+/)
              , n = a.indexOf(e.value)
              , l = this.props.onChange;
            if (~n)
                a.splice(n, 1),
                t = a.join(" ");
            else {
                if (/(?:^|\s)(m|p)\-(t|r|b|l)(?:\-(?:xs|sm|md|lg))?(?:$|\s)/.test(e.value)) {
                    var i = new RegExp("(?:^|\\s)" + RegExp.$1 + "\\-" + RegExp.$2 + "(?:\\-(?:xs|sm|md|lg))?(?=(\\s|$))","ig");
                    t = t.replace(i, "")
                } else if (/(?:^|\s)(m|p)(?:\-(xs|sm|md|lg))?(?:$|\s)/.test(e.value)) {
                    i = new RegExp("(?:^|\\s)" + RegExp.$1 + "(?:\\-(?:xs|sm|md|lg))?(?=(\\s|$))","ig");
                    t = t.replace(i, "")
                } else if (/(?:^|\s)(m|p)(?:\-(t|r|b|l))?\-none(?:$|\s)/.test(e.value)) {
                    i = new RegExp(RegExp.$2 ? "(?:^|\\s)" + RegExp.$1 + "(?:(?:\\-" + RegExp.$2 + "(?:\\-(?:xs|sm|md|lg)))|\\-none)?(?=(\\s|$))" : "(?:^|\\s)" + RegExp.$1 + "(?:[^\\s$]+)?(?=(\\s|$))","ig");
                    t = t.replace(i, "$1")
                } else
                    /(?:^|\s)w(?:\-\w+)?(?:$|\s)/.test(e.value) ? t = t.replace(/(?:^|\s)w(?:\-\w+)?(?=(\s|$))/g, "") : "b-a" === e.value ? t = (t = t.replace(/(?:^|\s)b\-(?:t|r|b|l)(?=(\s|$))/g, "")).replace(/(?:^|\s)no\-border(?=(\s|$))/g, "") : /(?:^|\s)b\-(?:t|r|b|l)?(?:$|\s)/.test(e.value) ? t = (t = t.replace(/(?:^|\s)b\-a(?=(\s|$))/g, "")).replace(/(?:^|\s)no\-border(?=(\s|$))/g, "") : /(?:^|\s)b\-\dx(?:$|\s)/.test(e.value) ? t = t.replace(/(?:^|\s)b\-\dx(?=(\s|$))/g, "") : "no-border" === e.value ? t = t.replace(/(?:^|\s)b\-(?:\dx|\w+)(?=(\s|$))/g, "") : /(?:^|\s)b\-(?:primary|info|warning|danger|success|white|dark|light)(?:$|\s)/.test(e.value) ? t = t.replace(/(?:^|\s)b\-(?:primary|info|warning|danger|success|white|dark|light)(?=(\s|$))/g, "") : "r" === e.value ? t = t.replace(/(?:^|\s)r\-(?:t|r|b|l)(?=(\s|$))/g, "") : /(?:^|\s)r\-(?:t|r|b|l)?(?:$|\s)/.test(e.value) ? t = t.replace(/(?:^|\s)r(?=(\s|$))/g, "") : /(?:^|\s)r\-\dx(?:$|\s)/.test(e.value) ? t = t.replace(/(?:^|\s)r\-\dx(?=(\s|$))/g, "") : /(?:^|\s)text\-(?:xs|sm|base|md|lg)(?:$|\s)/.test(e.value) ? t = t.replace(/(?:^|\s)text\-(?:xs|sm|base|md|lg)(?=(\s|$))/g, "") : /(?:^|\s)font\-(?:normal|thin|bold)(?:$|\s)/.test(e.value) ? t = t.replace(/(?:^|\s)font\-(?:normal|thin|bold)(?=(\s|$))/g, "") : /(?:^|\s)text\-(?:primary|info|warning|danger|success|white|dark|light)(?:$|\s)/.test(e.value) ? t = t.replace(/(?:^|\s)text\-(?:primary|info|warning|danger|success|white|dark|light)(?=(\s|$))/g, "") : /(?:^|\s)bg\-(?:primary|info|warning|danger|success|white|dark|light)(?:$|\s)/.test(e.value) ? t = (t = t.replace(/(?:^|\s)bg\-(?:primary|info|warning|danger|success|white|dark|light)(?=(\s|$))/g, "")).replace(/(?:^|\s)no\-bg(?=(\s|$))/g, "") : "no-bg" === e.value && (t = t.replace(/(?:^|\s)bg\-(?:primary|info|warning|danger|success|white|dark|light)(?=(\s|$))/g, ""));
                t = t.replace(/\s+/g, " ").trim(),
                t += (t ? " " : "") + e.value
            }
            l(t)
        }
        ,
        t.prototype.renderGroup = function(e, t) {
            var a = this
              , n = this.props.classnames;
            return i.default.createElement("div", {
                key: t,
                className: n("ClassNameControl-group", e.className)
            }, i.default.createElement("label", {
                className: n("ClassNameControl-groupLabel", e.labelClassName)
            }, e.label), e.children && e.children.length ? e.children[0].value ? this.renderOptions(e.children, t) : e.children.map((function(e, t) {
                return a.renderGroup(e, t)
            }
            )) : null)
        }
        ,
        t.prototype.renderOptions = function(e, t) {
            var a = this
              , n = this.props.classnames;
            return function(e) {
                for (var t = [], a = t[0] = [], n = 0, l = e.length; n < l; n++) {
                    var i = e[n];
                    "|" === i ? (a = [],
                    t.push(a)) : a.push(i)
                }
                return t
            }(e).map((function(e, t) {
                return i.default.createElement("div", {
                    className: n("ButtonGroup"),
                    key: t
                }, e.map((function(e, t) {
                    return i.default.createElement("div", {
                        key: t,
                        onClick: function() {
                            return a.handlePopOverChange(e)
                        },
                        className: n("Button Button--xs", e.className, ~a.values.indexOf(e.value) ? "Button--primary" : "Button--default")
                    }, e.label)
                }
                )))
            }
            ))
        }
        ,
        t.prototype.renderPopover = function() {
            var e = this
              , t = this.props.value;
            return this.values = t ? t.split(" ") : [],
            i.default.createElement("div", null, o.map((function(t, a) {
                return e.renderGroup(t, a)
            }
            )))
        }
        ,
        t.prototype.render = function() {
            var e, t = this.props, a = t.classnames, n = t.readOnly, r = t.disabled, o = t.value, s = t.className, d = t.popOverContainer;
            return i.default.createElement("div", {
                className: a(s, "TextControl", (e = {},
                e["TextControl--withAddOn"] = !0,
                e["is-focused"] = this.state.isFocused,
                e["is-disabled"] = r,
                e))
            }, i.default.createElement("div", {
                className: a("TextControl-input")
            }, i.default.createElement("input", {
                name: name,
                placeholder: "请输入 css 类名",
                disabled: r,
                readOnly: n,
                type: "text",
                autoComplete: "off",
                onChange: this.handleChange,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
                value: null == o ? "" : "string" == typeof o ? o : JSON.stringify(o)
            })), i.default.createElement("div", {
                className: a("TextControl-button")
            }, i.default.createElement(l.Button, {
                onClick: this.toggle
            }, i.default.createElement("i", {
                className: "fa fa-cog"
            }))), i.default.createElement(l.Overlay, {
                placement: "right-bottom-right-top  right-top-right-bottom right-bottom-right-top",
                target: this.getTarget,
                container: d || this.getParent,
                rootClose: !1,
                show: this.state.isOpened,
                watchTargetSizeChange: !1
            }, i.default.createElement(l.PopOver, {
                className: a("ClassNamePicker-popover"),
                onHide: this.close,
                overlay: !0
            }, this.renderPopover())))
        }
        ,
        n.__decorate([l.utils.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], t.prototype, "open", null),
        n.__decorate([l.utils.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], t.prototype, "close", null),
        n.__decorate([l.utils.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], t.prototype, "toggle", null),
        n.__decorate([l.utils.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleFocus", null),
        n.__decorate([l.utils.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleBlur", null),
        n.__decorate([l.utils.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleChange", null),
        n.__decorate([l.utils.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], t.prototype, "getParent", null),
        n.__decorate([l.utils.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], t.prototype, "getTarget", null),
        t = n.__decorate([l.FormItem({
            type: "ae-classname"
        })], t)
    }(i.default.Component);
    t.ClassNameControl = s
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.AvailableRenderersPlugin = void 0;
    var n = a(0)
      , l = a(59)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.order = -9999,
            t
        }
        return n.__extends(t, e),
        t.prototype.buildEditorPanel = function(e, t) {
            e.node,
            e.info;
            var a = this.manager.store;
            a.activeContainerId && a.subRenderers.length && t.push({
                key: "renderers",
                icon: "fa fa-cube",
                title: "组件",
                component: l.AvailableRenderersPanel,
                position: "left",
                order: 4e3
            })
        }
        ,
        t
    }(a(2).BasePlugin);
    t.AvailableRenderersPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.AvailableRenderersPanel = void 0;
    var n = a(0)
      , l = a(5)
      , i = a(7)
      , r = n.__importDefault(a(4))
      , o = n.__importDefault(a(8))
      , s = a(6)
      , d = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.handleRegionFilterClick = function(e) {
            var t = e.currentTarget.getAttribute("data-value")
              , a = this.props
              , n = a.store
              , l = a.manager;
            t = t === n.subRendererRegion ? "" : t,
            l.switchToRegion(t)
        }
        ,
        t.prototype.handleDragStart = function(e) {
            var t = e.currentTarget.getAttribute("data-id");
            e.dataTransfer.setData('dnd-dom/[data-id="' + t + '"]', "")
        }
        ,
        t.prototype.renderThumb = function(e) {
            var t = this.props.manager;
            return e ? l.render(e, {
                onAction: s.noop
            }, t.env) : r.default.createElement("p", null, "没有预览图")
        }
        ,
        t.prototype.render = function() {
            var e = this
              , t = this.props.store
              , a = t.groupedSubRenderers
              , n = Object.keys(a)
              , i = t.getNodeById(t.activeContainerId);
            return r.default.createElement("div", {
                className: "ae-RendererList"
            }, r.default.createElement("div", {
                className: "p-l p-r m-b-xs"
            }, r.default.createElement(l.InputBox, {
                value: t.subRenderersKeywords,
                onChange: t.changeSubRenderersKeywords,
                placeholder: "输入关键字可过滤组件",
                clearable: !1
            }, t.subRenderersKeywords ? r.default.createElement("a", {
                onClick: t.resetSubRenderersKeywords
            }, r.default.createElement(l.Icon, {
                icon: "close",
                className: "icon"
            })) : r.default.createElement(l.Icon, {
                icon: "search",
                className: "icon"
            }))), r.default.createElement("div", {
                className: "ae-RendererList-tip"
            }, "请选择以下组件拖入「", null == i ? void 0 : i.label, "」中"), r.default.createElement("div", {
                className: "ae-RendererList-groupWrap"
            }, n.length ? n.map((function(t) {
                var n = a[t];
                return n && n.length ? r.default.createElement("div", {
                    key: t,
                    className: "ae-RendererList-group"
                }, r.default.createElement("div", {
                    className: "ae-RendererList-groupLabel"
                }, t), n.map((function(t) {
                    return r.default.createElement("div", {
                        onDragStart: e.handleDragStart,
                        "data-id": t.id,
                        "data-dnd-type": "subrenderer",
                        "data-dnd-id": t.id,
                        "data-dnd-data": JSON.stringify(t.scaffold || {
                            type: t.type
                        }),
                        key: t.id,
                        draggable: !0,
                        className: "ae-RendererList-item"
                    }, r.default.createElement("i", {
                        className: o.default("fa-fw", t.icon || "fa fa-dot-circle-o")
                    }), r.default.createElement("div", {
                        className: "ae-RendererList-itemLabel"
                    }, t.name), r.default.createElement("div", {
                        className: "ae-RendererList-itemInfo"
                    }, r.default.createElement(l.TooltipWrapper, {
                        tooltipClassName: "ae-RendererThumb",
                        trigger: "click",
                        rootClose: !0,
                        placement: "right",
                        tooltip: {
                            dom: r.default.createElement("div", {
                                className: "ae-RendererInfo"
                            }, r.default.createElement("div", null, r.default.createElement(l.Html, {
                                html: t.description
                            }), t.docLink ? r.default.createElement("a", {
                                target: "_blank",
                                href: t.docLink
                            }, " 详情 ") : null), r.default.createElement("div", {
                                className: "ae-RendererDiv"
                            }), r.default.createElement("div", {
                                className: "ae-RendererPreview"
                            }, e.renderThumb(t.previewSchema)))
                        }
                    }, r.default.createElement("a", {
                        className: "ae-RendererIcon",
                        "data-position": "bottom"
                    }, r.default.createElement(l.Icon, {
                        icon: "info",
                        className: "icon"
                    })))))
                }
                ))) : null
            }
            )) : r.default.createElement("span", null, "没有可用组件，也许你该切换容器试试。")))
        }
        ,
        n.__decorate([s.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleRegionFilterClick", null),
        t = n.__decorate([i.observer], t)
    }(r.default.Component);
    t.AvailableRenderersPanel = d
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.CodePlugin = void 0;
    var n = a(0)
      , l = a(61)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.order = -9999,
            t
        }
        return n.__extends(t, e),
        t.prototype.buildJSONSchema = function(e) {
            return e.info.$schema
        }
        ,
        t.prototype.buildEditorPanel = function(e, t) {
            e.info;
            this.manager.store.jsonSchemaUri && t.push({
                key: "code",
                icon: "fa fa-code",
                title: "代码",
                position: "left",
                component: l.CodeEditorPanel,
                order: 5e3
            })
        }
        ,
        t
    }(a(2).BasePlugin);
    t.CodePlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.CodeEditorPanel = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(6)
      , r = n.__importDefault(a(62))
      , o = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t.prototype.handleResizeMouseDown = function(e) {
            3 == e.nativeEvent.which || (this.codeWrap = e.currentTarget.parentElement,
            document.addEventListener("mousemove", this.handleResizeMouseMove),
            document.addEventListener("mouseup", this.handleResizeMouseUp),
            this.startX = e.clientX,
            this.startWidth = this.codeWrap.offsetWidth)
        }
        ,
        t.prototype.handleResizeMouseMove = function(e) {
            var t = e.clientX - this.startX;
            this.codeWrap.style.cssText += "width: " + Math.max(this.startWidth + t, 300) + "px"
        }
        ,
        t.prototype.handleResizeMouseUp = function() {
            document.removeEventListener("mousemove", this.handleResizeMouseMove),
            document.removeEventListener("mouseup", this.handleResizeMouseUp)
        }
        ,
        t.prototype.handleCodePaste = function() {
            var e = this;
            setTimeout((function() {
                e.props.manager.patchSchema(!0)
            }
            ), 500)
        }
        ,
        t.prototype.render = function() {
            var e = this.props
              , t = (e.value,
            e.onChange)
              , a = (e.info,
            e.manager)
              , n = e.store;
            return l.default.createElement(l.default.Fragment, null, l.default.createElement(r.default, {
                value: n.valueWithoutHiddenProps,
                onChange: t,
                $schema: n.jsonSchemaUri,
                $schemaUrl: a.config.$schemaUrl,
                onPaste: this.handleCodePaste
            }), l.default.createElement("div", {
                onMouseDown: this.handleResizeMouseDown,
                className: "ae-Editor-codeResizor"
            }))
        }
        ,
        n.__decorate([i.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "handleResizeMouseDown", null),
        n.__decorate([i.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [MouseEvent]), n.__metadata("design:returntype", void 0)], t.prototype, "handleResizeMouseMove", null),
        n.__decorate([i.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], t.prototype, "handleResizeMouseUp", null),
        n.__decorate([i.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", []), n.__metadata("design:returntype", void 0)], t.prototype, "handleCodePaste", null),
        t
    }(l.default.Component);
    t.CodeEditorPanel = o
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = n.__importDefault(a(63))
      , r = a(6)
      , o = n.__importDefault(a(8))
      , s = a(31)
      , d = a(10)
      , c = a(32)
      , u = /^https\:\/\/isuda\.baidu\.com\/schemas\/(.*).json$/;
    var p = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.state = {
                value: t.props.value,
                contents: t.obj2str(t.props.value, t.props)
            },
            t.toDispose = [],
            t.uri = "isuda://schema/" + r.guid() + ".json",
            t.emitChange = s((function() {
                var e = t.props
                  , a = e.onChange
                  , n = e.value
                  , l = t.str2obj(t.state.contents);
                if (l) {
                    delete l.$schema;
                    var i = r.diff(t.lastResult || n, l);
                    t.lastResult = l,
                    a(l, i)
                }
            }
            ), 250, {
                trailing: !0,
                leading: !1
            }),
            t.editorFactory = function(e, a, l) {
                var i = a.Uri.parse(t.uri);
                return t.model = a.editor.createModel(t.state.contents, "json", i),
                a.editor.create(e, n.__assign(n.__assign({
                    autoIndent: !0,
                    formatOnType: !0,
                    formatOnPaste: !0,
                    selectOnLineNumbers: !0,
                    scrollBeyondLastLine: !1,
                    folding: !0,
                    minimap: {
                        enabled: !1
                    }
                }, l), {
                    model: t.model
                }))
            }
            ,
            t.editorDidMount = function(e, a) {
                t.editor = e,
                t.monaco = a,
                t.changeJsonOptions(t.props),
                t.props.onPaste && t.toDispose.push(t.editor.onDidPaste(t.props.onPaste).dispose)
            }
            ,
            t.editorWillUnmount = function(e, a) {
                t.toDispose.forEach((function(e) {
                    return e()
                }
                )),
                t.toDispose = []
            }
            ,
            t.handleChange = function(e) {
                t.setState({
                    contents: e
                }, t.emitChange)
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.componentDidUpdate = function(e) {
            var t = this.props;
            e.$schema !== t.$schema && this.monaco && this.changeJsonOptions(t),
            r.isObjectShallowModified(t.value, e.value, !1) && r.isObjectShallowModified(t.value, this.lastResult, !1) && this.setState({
                value: t.value,
                contents: this.obj2str(t.value, t)
            })
        }
        ,
        t.prototype.obj2str = function(e, t) {
            var a;
            return !(e = n.__assign({
                type: null == e ? void 0 : e.type
            }, e)).type && (null === (a = t.$schema) || void 0 === a ? void 0 : a.match(/PageSchema/i)) ? e.type = "page" : e.type || delete e.type,
            delete e.$schema,
            c.stringify(e)
        }
        ,
        t.prototype.str2obj = function(e) {
            try {
                return c.parse(e)
            } catch (e) {
                return null
            }
        }
        ,
        t.prototype.changeJsonOptions = function(e) {
            var t;
            void 0 === e && (e = this.props);
            var a = this.monaco
              , n = function(e, t, a, n) {
                var l = Array.isArray(n) ? n.concat() : [];
                if (u.test(t)) {
                    var i = RegExp.$1
                      , r = "https://isuda.baidu.com/schemas/" + i + ".json"
                      , o = d(l, (function(e) {
                        var t;
                        return (null === (t = e.fileMatch) || void 0 === t ? void 0 : t[0]) === a
                    }
                    ));
                    ~o && l.splice(o, 1),
                    l.push({
                        uri: r,
                        fileMatch: [a],
                        schema: {
                            $schema: "http://json-schema.org/draft-07/schema#",
                            $ref: e + "#/definitions/" + i
                        }
                    })
                }
                return l
            }(e.$schemaUrl || window.location.protocol + "//" + window.location.host + "/schema.json", e.$schema, a.Uri.parse(this.uri).toString(), null === (t = a.languages.json) || void 0 === t ? void 0 : t.jsonDefaults.diagnosticsOptions.schemas);
            a.languages.json.jsonDefaults.setDiagnosticsOptions({
                schemas: n,
                validate: !0,
                enableSchemaRequest: !0,
                allowComments: !0
            })
        }
        ,
        t.prototype.render = function() {
            var e = this.props
              , t = e.disabled
              , a = e.className
              , n = e.theme;
            return l.default.createElement(i.default, {
                className: o.default("amis-code-editor", a),
                value: this.state.contents,
                onChange: this.handleChange,
                language: "json",
                theme: n,
                editorFactory: this.editorFactory,
                editorDidMount: this.editorDidMount,
                editorWillUnmount: this.editorWillUnmount,
                options: {
                    automaticLayout: !0,
                    lineNumbers: "off",
                    glyphMargin: !1,
                    lineDecorationsWidth: 0,
                    lineNumbersMinChars: 0,
                    selectOnLineNumbers: !0,
                    scrollBeyondLastLine: !1,
                    folding: !0,
                    minimap: {
                        enabled: !1
                    },
                    readOnly: t
                }
            })
        }
        ,
        t
    }(l.default.Component);
    t.default = p
}
, function(e, t) {
    e.exports = require("amis/lib/components/Editor")
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ErrorRendererPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.order = -9999,
            t.rendererName = "error",
            t.name = "Error",
            t
        }
        return n.__extends(t, e),
        t
    }(a(2).BasePlugin);
    t.ErrorRendererPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.BasicToolbarPlugin = void 0;
    var n = a(0)
      , l = a(2)
      , i = a(1)
      , r = a(28)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.order = -9999,
            t
        }
        return n.__extends(t, e),
        t.prototype.buildEditorToolbar = function(e, t) {
            var a, n, l, i = this, o = e.id, s = e.schema, d = this.manager.store, c = d.getNodeById(o), u = d.getSchemaParentById(o), p = !0, m = c.parent;
            if (Array.isArray(u) && (null == m ? void 0 : m.isRegion)) {
                var f = c.host;
                c.draggable && t.push({
                    icon: "fa fa-arrows",
                    tooltip: "按住拖动调整位置",
                    draggable: !0,
                    onDragStart: this.manager.startDrag.bind(this.manager, o)
                });
                var h = u.indexOf(s);
                if (h > 0 && c.moveable) {
                    var b = "fa fa-arrow-up"
                      , g = "向上移动"
                      , v = document.querySelector('[data-editor-id="' + o + '"]')
                      , y = document.querySelector('[data-editor-id="' + (null === (a = u[h - 1]) || void 0 === a ? void 0 : a.$$id) + '"]');
                    if (v && y) {
                        var _ = y.getBoundingClientRect()
                          , S = v.getBoundingClientRect();
                        Math.abs(S.x - _.x) > Math.abs(S.y - _.y) && (p = !1,
                        b = "fa fa-arrow-left",
                        g = "向前移动"),
                        t.push({
                            icon: b,
                            tooltip: g,
                            onClick: function() {
                                return i.manager.moveUp()
                            }
                        })
                    }
                }
                if (h < u.length - 1 && c.moveable) {
                    b = "fa fa-arrow-down",
                    g = "向下移动",
                    v = document.querySelector('[data-editor-id="' + o + '"]');
                    var x = document.querySelector('[data-editor-id="' + (null === (n = u[h + 1]) || void 0 === n ? void 0 : n.$$id) + '"]');
                    if (v && x) {
                        var C = x.getBoundingClientRect();
                        S = v.getBoundingClientRect();
                        Math.abs(S.x - C.x) > Math.abs(S.y - C.y) && (p = !1,
                        b = "fa fa-arrow-right",
                        g = "向后移动"),
                        t.push({
                            icon: b,
                            tooltip: g,
                            onClick: function() {
                                return i.manager.moveDown()
                            }
                        })
                    }
                }
                if (c.removable && t.push({
                    icon: "fa fa-trash-o",
                    tooltip: "删除",
                    onClick: function() {
                        return i.manager.del(o)
                    }
                }),
                !(null == f ? void 0 : f.memberImmutable(m.region)) && d.panels.some((function(e) {
                    return "renderers" === e.key
                }
                ))) {
                    var N = null === (l = u[h + 1]) || void 0 === l ? void 0 : l.$$id;
                    t.push({
                        icon: r.AddBTNSvg,
                        tooltip: "前面插入节点",
                        level: "special",
                        placement: p ? "bottom" : "right",
                        className: p ? "ae-InsertBefore is-vertical" : "ae-InsertBefore",
                        onClick: function() {
                            return i.manager.showInsertPanel(m.region, m.id, m.preferTag, "insert", void 0, o)
                        }
                    }, {
                        icon: r.AddBTNSvg,
                        tooltip: "后面插入节点",
                        level: "special",
                        placement: p ? "top" : "left",
                        className: p ? "ae-InsertAfter is-vertical" : "ae-InsertAfter",
                        onClick: function() {
                            return i.manager.showInsertPanel(m.region, m.id, m.preferTag, "insert", void 0, N)
                        }
                    })
                }
            }
            t.push({
                icon: "fa fa-ellipsis-v",
                tooltip: "更多",
                order: 999,
                onClick: function(e) {
                    if (!e.defaultPrevented) {
                        var t = e.target.parentElement.getBoundingClientRect();
                        i.manager.openContextMenu(o, "", {
                            x: window.scrollX + t.left + t.width - 185,
                            y: window.scrollY + t.top + t.height
                        })
                    }
                }
            })
        }
        ,
        t.prototype.buildEditorContextMenu = function(e, t) {
            var a, n, l = this, i = e.id, r = e.schema, o = e.region, s = this.manager, d = s.store, c = d.getSchemaParentById(i), u = d.getNodeById(i), p = d.getNodePathById(i), m = p.pop(), f = u.host, h = u.parent;
            if (o) {
                d.panels.find((function(e) {
                    return "renderers" === e.key
                }
                )) && (t.push({
                    label: "插入组件",
                    onHighlight: function(e) {
                        return e && d.setHoverId(i, o)
                    },
                    onSelect: function() {
                        return s.showInsertPanel(o, i)
                    }
                }),
                t.push({
                    label: "清空",
                    onSelect: function() {
                        return s.emptyRegion(i, o)
                    }
                }),
                t.push({
                    label: "粘贴",
                    onSelect: function() {
                        return s.paste(i, o)
                    }
                }))
            } else {
                if (t.push({
                    label: "选中" + m.label,
                    disabled: d.activeId === m.id,
                    data: i,
                    onSelect: function(e) {
                        return d.setActiveId(e)
                    },
                    onHighlight: function(e, t) {
                        return e && d.setHoverId(t)
                    }
                }),
                p.length) {
                    var b = p.filter((function(e) {
                        var t;
                        return !e.isRegion && !1 !== (null === (t = e.info) || void 0 === t ? void 0 : t.editable)
                    }
                    )).reverse().map((function(e) {
                        return {
                            label: e.label,
                            data: e.id,
                            onSelect: function(e) {
                                return d.setActiveId(e)
                            },
                            onHighlight: function(e, t) {
                                return e && d.setHoverId(t)
                            }
                        }
                    }
                    ));
                    b.length && t.push({
                        label: "选中层级",
                        children: b
                    })
                }
                t.push({
                    label: "取消选中",
                    disabled: !d.activeId,
                    onSelect: function() {
                        return d.setActiveId("")
                    }
                }),
                t.push("|"),
                t.push({
                    label: "重复一份",
                    disabled: !u.duplicatable,
                    onSelect: function() {
                        return s.duplicate(i)
                    }
                }),
                t.push({
                    label: "复制配置",
                    onSelect: function() {
                        return s.copy(i)
                    }
                }),
                t.push({
                    label: "剪切配置",
                    disabled: !u.removable,
                    onSelect: function() {
                        return s.cut(i)
                    }
                }),
                t.push({
                    label: "粘贴配置",
                    disabled: !Array.isArray(c) || !u.parent || !1 === (null === (a = u.info) || void 0 === a ? void 0 : a.typeMutable),
                    onSelect: function() {
                        return s.paste(i)
                    }
                }),
                t.push({
                    label: "删除",
                    disabled: !u.removable,
                    className: "text-danger",
                    onSelect: function() {
                        return s.del(i)
                    }
                }),
                t.push("|");
                var g = Array.isArray(c) ? c.indexOf(r) : -1;
                t.push({
                    label: "向前移动",
                    disabled: !(Array.isArray(c) && g > 0 && u.moveable && u.prevSibling),
                    onSelect: function() {
                        return s.moveUp()
                    }
                }),
                t.push({
                    label: "向后移动",
                    disabled: !(Array.isArray(c) && g < c.length - 1 && u.moveable && u.nextSibling),
                    onSelect: function() {
                        return s.moveDown()
                    }
                }),
                t.push({
                    label: "前面插入节点",
                    disabled: !Array.isArray(c) || !h || !h.isRegion || !f || f.memberImmutable(h.region) || !d.panels.some((function(e) {
                        return "renderers" === e.key
                    }
                    )),
                    onSelect: function() {
                        return l.manager.showInsertPanel(h.region, h.id, h.preferTag, "insert", void 0, i)
                    }
                }),
                t.push({
                    label: "后面插入节点",
                    disabled: !Array.isArray(c) || !h || !h.isRegion || !f || f.memberImmutable(h.region) || !d.panels.some((function(e) {
                        return "renderers" === e.key
                    }
                    )),
                    onSelect: function() {
                        var e;
                        return l.manager.showInsertPanel(h.region, h.id, h.preferTag, "insert", void 0, null === (e = c[g + 1]) || void 0 === e ? void 0 : e.$$id)
                    }
                }),
                t.push("|"),
                t.push({
                    label: "撤销（Undo）",
                    disabled: !d.canUndo,
                    onSelect: function() {
                        return d.undo()
                    }
                }),
                t.push({
                    label: "重做（Redo）",
                    disabled: !d.canRedo,
                    onSelect: function() {
                        return d.redo()
                    }
                }),
                t.push("|");
                var v = d.panels.find((function(e) {
                    return "renderers" === e.key
                }
                ));
                m.childRegions.length && v && (m.childRegions.length > 1 ? t.push({
                    label: "插入组件",
                    children: m.childRegions.map((function(e) {
                        return {
                            label: "" + e.label,
                            data: e.region,
                            onHighlight: function(e, t) {
                                return e ? d.setHoverId(i, t) : d.setHoverId("")
                            },
                            onSelect: function(e) {
                                return s.showInsertPanel(e, i)
                            }
                        }
                    }
                    ))
                }) : t.push({
                    label: "插入组件",
                    data: m.childRegions[0].region,
                    onHighlight: function(e, t) {
                        return e ? d.setHoverId(i, t) : d.setHoverId("")
                    },
                    onSelect: function(e) {
                        return s.showInsertPanel(e, i)
                    }
                })),
                t.push({
                    label: "更改类型",
                    disabled: !u.host || !1 === (null === (n = u.info) || void 0 === n ? void 0 : n.typeMutable) || !u.parent.isRegion || !d.panels.some((function(e) {
                        return "renderers" === e.key
                    }
                    )),
                    onSelect: function() {
                        return s.showReplacePanel(i)
                    }
                })
            }
        }
        ,
        t
    }(l.BasePlugin);
    t.BasicToolbarPlugin = o,
    i.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.UnkownRendererPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.order = 9999,
            t
        }
        return n.__extends(t, e),
        t.prototype.getRendererInfo = function(e) {
            var t = e.renderer;
            if (e.schema.$$id && t)
                return {
                    name: "Unkown",
                    $schema: "https://isuda.baidu.com/schemas/UnkownSchema.json"
                }
        }
        ,
        t
    }(a(2).BasePlugin);
    t.UnkownRendererPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ArrayControlPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = a(1)
      , r = a(2)
      , o = a(3)
      , s = n.__importDefault(a(4))
      , d = a(6)
      , c = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "array-control",
            t.$schema = "https://isuda.baidu.com/schemas/ArrayControlSchema.json",
            t.name = "数组输入框",
            t.description = "Array 数组输入框，可自定义成员输入形式。其实是 Combo 的 flat 值打平的一种用法，可直接用 combo 代替。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/array",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "array",
                label: "数组输入框",
                name: "array",
                items: {
                    type: "text",
                    placeholder: "请输入"
                }
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign(n.__assign({}, t.scaffold), {
                    value: [""]
                })]
            },
            t.panelTitle = "数组框",
            t.panelControlsCreator = function(e) {
                return [o.getSchemaTpl("switchDefaultValue"), {
                    type: "textarea",
                    name: "value",
                    label: "默认值",
                    visibleOn: 'typeof this.value !== "undefined"',
                    pipeOut: o.valuePipeOut
                }, {
                    children: s.default.createElement(l.Button, {
                        size: "sm",
                        level: "danger",
                        className: "m-b",
                        block: !0,
                        onClick: t.editDetail.bind(t, e.id)
                    }, "配置子表单项")
                }, {
                    label: "是否可新增",
                    type: "switch",
                    name: "addable",
                    mode: "inline",
                    className: "w-full",
                    pipeIn: o.defaultValue(!0)
                }, {
                    label: "新增按钮文字",
                    name: "addButtonText",
                    type: "text",
                    visibleOn: "data.addable",
                    pipeIn: o.defaultValue("新增")
                }, {
                    type: "textarea",
                    name: "scaffold",
                    label: "新增初始值",
                    visibleOn: "this.addable !== false",
                    pipeOut: o.valuePipeOut,
                    pipeIn: o.defaultValue("")
                }, {
                    label: "是否可删除",
                    type: "switch",
                    name: "removable",
                    mode: "inline",
                    className: "w-full",
                    pipeIn: o.defaultValue(!0)
                }, o.getSchemaTpl("api", {
                    name: "deleteApi",
                    label: "删除前的请求",
                    visibleOn: "data.removable"
                }), {
                    label: "删除确认提示",
                    name: "deleteConfirmText",
                    type: "text",
                    visibleOn: "data.deleteApi",
                    pipeIn: o.defaultValue("确认要删除")
                }, {
                    name: "draggable",
                    label: "启用拖拽排序",
                    type: "switch",
                    mode: "inline",
                    className: "w-full"
                }, {
                    label: "拖拽排序的提示文字",
                    name: "draggableTip",
                    type: "text",
                    visibleOn: "data.draggable",
                    pipeIn: o.defaultValue("可通过拖动每行中的【交换】按钮进行顺序调整")
                }, {
                    name: "draggableTip",
                    visibleOn: "data.draggable",
                    type: "text",
                    label: "可拖拽排序提示文字",
                    pipeIn: o.defaultValue("可通过拖动每行中的【交换】按钮进行顺序调整")
                }, {
                    name: "addButtonText",
                    type: "text",
                    label: "新增按钮文字",
                    pipeIn: o.defaultValue("新增")
                }, o.getSchemaTpl("minLength"), o.getSchemaTpl("maxLength")]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.filterProps = function(e) {
            return (e = d.JSONPipeOut(e, !0)).value || (e.value = [""]),
            e
        }
        ,
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t.prototype.buildEditorToolbar = function(e, t) {
            var a = e.id;
            "array-control" === e.info.renderer.name && t.push({
                icon: "fa fa-expand",
                order: 100,
                tooltip: "配置子表单项",
                onClick: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.buildEditorContextMenu = function(e, t) {
            var a = e.id;
            e.schema,
            e.region;
            "array-control" === e.info.renderer.name && t.push("|", {
                label: "配置成员渲染器",
                onSelect: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.editDetail = function(e) {
            var t = this.manager
              , a = t.store
              , l = a.getNodeById(e)
              , i = a.getValueOf(e);
            l && i && this.manager.openSubEditor({
                title: "配置子表单项",
                value: i.items,
                slot: {
                    type: "form",
                    mode: "normal",
                    controls: "$$",
                    wrapWithPanel: !1,
                    className: "wrapper"
                },
                onChange: function(e) {
                    e = n.__assign(n.__assign({}, i), {
                        items: e
                    }),
                    t.panelChangeValue(e, d.diff(i, e))
                }
            })
        }
        ,
        t
    }(r.BasePlugin);
    t.ArrayControlPlugin = c,
    i.registerEditorPlugin(c)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ButtonGroupControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "button-group-control",
            t.$schema = "https://isuda.baidu.com/schemas/ButtonGroupControlSchema.json",
            t.name = "按钮组",
            t.description = "用来展示多个按钮，视觉上会作为一个整体呈现，同时可以作为表单项选项选择器来用。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/button-group",
            t.tags = ["表单项", "按钮"],
            t.scaffold = {
                type: "button-group",
                name: "a",
                options: [{
                    label: "选项1",
                    value: "a"
                }, {
                    label: "选项2",
                    value: "b"
                }]
            },
            t.previewSchema = {
                type: "form",
                wrapWithPanel: !1,
                controls: n.__assign(n.__assign({}, t.scaffold), {
                    value: "a"
                })
            },
            t.panelTitle = "按钮组",
            t.panelControls = [],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.ButtonGroupControlPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ButtonToolbarControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "button-toolbar-control",
            t.$schema = "https://isuda.baidu.com/schemas/ButtonToolbarControlSchema.json",
            t.name = "按钮工具栏",
            t.description = "多个按钮的集合",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/group",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "button-toolbar",
                buttons: [{
                    type: "button",
                    label: "按钮1",
                    actionType: "dialog",
                    dialog: {
                        title: "系统提示",
                        body: "对你点击了"
                    }
                }, {
                    type: "button",
                    label: "按钮2",
                    actionType: "dialog",
                    dialog: {
                        title: "系统提示",
                        body: "对你点击了"
                    }
                }]
            },
            t.previewSchema = {
                type: "form",
                wrapWithPanel: !1,
                controls: n.__assign({}, t.scaffold)
            },
            t.regions = [{
                key: "buttons",
                label: "按钮集合",
                preferTag: "按钮",
                renderMethod: "renderButtons"
            }],
            t.panelTitle = "工具栏",
            t.panelControls = [r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [r.getSchemaTpl("label"), r.getSchemaTpl("description"), r.getSchemaTpl("remark"), r.getSchemaTpl("labelRemark")]
            }, {
                title: "外观",
                controls: [r.getSchemaTpl("formItemMode"), r.getSchemaTpl("horizontalMode"), r.getSchemaTpl("horizontal", {
                    label: "",
                    visibleOn: '(data.$$formMode == "horizontal" || data.mode == "horizontal") && data.label !== false && data.horizontal'
                }), r.getSchemaTpl("className"), r.getSchemaTpl("className", {
                    label: "Label CSS 类名",
                    name: "labelClassName"
                }), r.getSchemaTpl("className", {
                    label: "Input CSS 类名",
                    name: "inputClassName"
                }), r.getSchemaTpl("className", {
                    label: "描述 CSS 类名",
                    name: "descriptionClassName",
                    visibleOn: "data.description"
                })]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
            }])],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(i.BasePlugin);
    t.ButtonToolbarControlPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ChainedSelectControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "chained-select-control",
            t.$schema = "https://isuda.baidu.com/schemas/ChainedSelectControlSchema.json",
            t.name = "级联下拉框",
            t.description = "通过<code>source</code>拉取选项，只要有返回结果，就可以无限级别增加",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/chained-select",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "chained-select",
                label: "级联选择",
                name: "chained-select"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: n.__assign({}, t.scaffold)
            },
            t.panelTitle = "级联选择",
            t.panelControls = [r.getSchemaTpl("switchDefaultValue"), {
                type: "text",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"',
                description: "请填入选项 Options 中 value 值"
            }, r.getSchemaTpl("api", {
                name: "source",
                label: "获取选项接口",
                description: "<div>可用变量说明</div><ul>\n                                <li><code>value</code>当前值</li>\n                                <li><code>level</code>拉取级别，从 <code>1</code>开始。</li>\n                                <li><code>parentId</code>上一层选中的 <code>value</code> 值</li>\n                                <li><code>parent</code>上一层选中选项，包含 <code>label</code> 和 <code>value</code> 的值。</li>\n                            </ul>"
            }), r.getSchemaTpl("joinValues", {
                visibleOn: !0
            }), r.getSchemaTpl("delimiter", {
                visibleOn: "data.joinValues"
            }), r.getSchemaTpl("extractValue")],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(i.BasePlugin);
    t.ChainedSelectControlPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.CheckboxControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "checkbox-control",
            t.$schema = "https://isuda.baidu.com/schemas/CheckboxControlSchema.json",
            t.name = "勾选框",
            t.description = "勾选框",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/text",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "checkbox",
                option: "勾选框",
                name: "checkbox"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({
                    value: !0
                }, t.scaffold)]
            },
            t.panelTitle = "勾选框",
            t.panelControls = [{
                name: "option",
                type: "text",
                label: "选项说明"
            }, l.getSchemaTpl("switchDefaultValue", {
                name: "value",
                pipeOut: function(e, t, a) {
                    var n;
                    return e ? null === (n = a.trueValue) || void 0 === n || n : void 0
                }
            }), {
                type: "switch",
                name: "value",
                label: "默认勾选",
                mode: "inline",
                className: "w-full",
                visibleOn: 'typeof this.value !== "undefined"',
                pipeOut: function(e, t, a) {
                    var n, l;
                    return e ? null === (n = a.trueValue) || void 0 === n || n : null !== (l = a.falseValue) && void 0 !== l && l
                }
            }, {
                type: "text",
                label: "勾选后的值",
                name: "trueValue",
                pipeIn: l.defaultValue(!0),
                pipeOut: l.valuePipeOut
            }, {
                type: "text",
                label: "未勾选的值",
                name: "falseValue",
                pipeIn: l.defaultValue(!1),
                pipeOut: l.valuePipeOut
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.CheckboxControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.CheckboxesControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "checkboxes-control",
            t.$schema = "https://isuda.baidu.com/schemas/CheckboxesControlSchema.json",
            t.order = -470,
            t.name = "复选框",
            t.description = "通过<code>options</code>配置多个勾选框，也可以通过<code>source</code>拉取选项",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/checkboxes",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "checkboxes",
                label: "复选框",
                name: "checkboxes",
                options: [{
                    label: "选项A",
                    value: "A"
                }, {
                    label: "选项B",
                    value: "B"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({
                    value: "A"
                }, t.scaffold)]
            },
            t.panelTitle = "复选框",
            t.panelControls = [l.getSchemaTpl("switchDefaultValue", {
                visibleOn: "!this.defaultCheckAll"
            }), {
                type: "checkboxes",
                name: "value",
                label: "默认值",
                source: "${options}",
                visibleOn: 'typeof this.value !== "undefined"',
                multiple: !0
            }, l.getSchemaTpl("options"), l.getSchemaTpl("source"), {
                name: "checkAll",
                label: "是否开启全选功能",
                type: "switch",
                mode: "inline",
                className: "w-full"
            }, {
                name: "defaultCheckAll",
                label: "是否默认全选",
                type: "switch",
                mode: "inline",
                className: "w-full",
                description: "勾选后，默认值的配置将无效。",
                onChange: function(e, t, a, n) {
                    return e && n.setValueByName("value", void 0)
                }
            }, l.getSchemaTpl("joinValues", {
                visibleOn: !0
            }), l.getSchemaTpl("delimiter", {
                hiddenOn: "data.joinValues === false"
            }), l.getSchemaTpl("extractValue"), {
                label: "每行显示多少列",
                name: "columnsCount",
                hiddenOn: "data.inline === true",
                type: "range",
                min: 1,
                max: 6,
                pipeIn: l.defaultValue(1)
            }, l.getSchemaTpl("className", {
                label: "单个 checkbox 类名",
                name: "itemClassName"
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.CheckboxesControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.CityControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "city-control",
            t.$schema = "https://isuda.baidu.com/schemas/CityControlSchema.json",
            t.name = "城市选择",
            t.description = "可配置是否选择区域或者城市",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/city",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "city",
                label: "城市选择",
                name: "city"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "城市选择",
            t.panelControls = [{
                type: "switch",
                name: "allowDistrict",
                label: "允许选择区域",
                mode: "inline",
                className: "w-full",
                pipeIn: l.defaultValue(!0)
            }, {
                type: "switch",
                name: "allowCity",
                label: "允许选择城市",
                mode: "inline",
                className: "w-full",
                pipeIn: l.defaultValue(!0)
            }, l.getSchemaTpl("switchDefaultValue"), {
                name: "value",
                type: "city",
                label: "默认值",
                visibleOn: 'typeof data.value !== "undefined"',
                validations: "isNumeric",
                labelRemark: {
                    trigger: "click",
                    className: "m-l-xs",
                    rootClose: !0,
                    content: "城市编码",
                    placement: "left"
                }
            }, l.getSchemaTpl("extractValue")],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.CityControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ColorControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "color-control",
            t.$schema = "https://isuda.baidu.com/schemas/ColorControlSchema.json",
            t.name = "颜色框",
            t.description = "支持<code>hex、hls、rgb、rgba</code>格式，默认为<code>hex</code>格式",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/color",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "color",
                label: "颜色",
                name: "color"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "颜色框",
            t.panelControls = [{
                label: "格式",
                name: "format",
                type: "button-group",
                size: "sm",
                pipeIn: l.defaultValue("hex"),
                options: ["hex", "hls", "rgb", "rgba"]
            }, l.getSchemaTpl("switchDefaultValue"), {
                type: "color",
                name: "value",
                visibleOn: 'typeof this.value !== "undefined"',
                label: "默认值"
            }, l.getSchemaTpl("switchDefaultValue", {
                name: "presetColors",
                label: "设置选择器中颜色默认值",
                description: "为空时不显示选择器中的默认值"
            }), {
                type: "array",
                name: "presetColors",
                label: "选择器中颜色默认值",
                addable: !0,
                removable: !0,
                visibleOn: 'typeof this.presetColors !== "undefined"',
                items: {
                    type: "color"
                },
                value: ["#D0021B", "#F5A623", "#F8E71C", "#8B572A", "#7ED321", "#417505", "#BD10E0", "#9013FE", "#4A90E2", "#50E3C2", "#B8E986", "#000000", "#4A4A4A", "#9B9B9B", "#FFFFFF"]
            }, l.getSchemaTpl("clearable", {
                label: "显示清除按钮",
                pipeIn: l.defaultValue(!0)
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.ColorControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ComboControlPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = a(1)
      , r = a(2)
      , o = a(3)
      , s = n.__importDefault(a(4))
      , d = a(6)
      , c = a(6)
      , u = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "combo-control",
            t.$schema = "https://isuda.baidu.com/schemas/ComboControlSchema.json",
            t.name = "组合输入框",
            t.description = "多个表单项的组合，可配置是否增加和删除初始设定的模板",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/combo",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "combo",
                label: "组合输入",
                name: "combo",
                multiple: !0,
                controls: [{
                    type: "text",
                    name: "text",
                    placeholder: "文本"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign(n.__assign({}, t.scaffold), {
                    value: [{}]
                })]
            },
            t.panelTitle = "组合输入",
            t.panelControlsCreator = function(e) {
                return [{
                    name: "conditions",
                    type: "button-group",
                    size: "sm",
                    mode: "inline",
                    className: "block",
                    options: [{
                        label: "固定成员类型",
                        value: "1"
                    }, {
                        label: "多分支",
                        value: "2"
                    }],
                    pipeIn: function(e) {
                        return e ? "2" : "1"
                    },
                    pipeOut: function(e) {
                        return 2 == e ? [{
                            label: "类型名称",
                            test: "",
                            controls: [{
                                type: "text",
                                label: "文本",
                                name: "text"
                            }],
                            scaffold: {}
                        }] : void 0
                    }
                }, {
                    name: "conditions",
                    visibleOn: "this.conditions",
                    type: "combo",
                    label: "分支管理",
                    multiple: !0,
                    multiLine: !0,
                    minLength: 1,
                    controls: [{
                        label: "名称",
                        name: "label",
                        type: "text",
                        required: !0
                    }, {
                        label: "命中条件",
                        name: "test",
                        required: !0,
                        type: "text",
                        placeholder: '比如: this.type === "text"',
                        description: "根据成员数据判断是否使用此分支"
                    }, {
                        children: function(a) {
                            a.value,
                            a.onChange;
                            return s.default.createElement(l.Button, {
                                size: "sm",
                                level: "danger",
                                className: "m-b",
                                block: !0,
                                onClick: t.editDetail.bind(t, e.id)
                            }, "配置子表单集合")
                        }
                    }, {
                        type: "textarea",
                        name: "scaffold",
                        required: !0,
                        label: "新增初始值",
                        pipeOut: o.valuePipeOut
                    }],
                    scaffold: {
                        label: "类型名称",
                        test: "",
                        controls: [{
                            type: "text",
                            label: "文本",
                            name: "text"
                        }],
                        scaffold: {}
                    }
                }, {
                    name: "typeSwitchable",
                    visibleOn: "this.conditions",
                    label: "是否可切换类型",
                    type: "switch",
                    mode: "inline",
                    className: "block",
                    pipeIn: o.defaultValue(!0)
                }, {
                    name: "controls",
                    visibleOn: "!this.conditions",
                    children: function(e) {
                        var a = e.value
                          , n = e.onChange;
                        return s.default.createElement(l.Button, {
                            size: "sm",
                            level: "danger",
                            className: "m-b",
                            block: !0,
                            onClick: function() {
                                t.manager.openSubEditor({
                                    title: "配置子表单集合",
                                    value: a,
                                    slot: {
                                        type: "form",
                                        mode: "normal",
                                        controls: "$$",
                                        wrapWithPanel: !1,
                                        className: "wrapper"
                                    },
                                    onChange: function(e) {
                                        return n(e)
                                    }
                                })
                            }
                        }, "配置子表单集合")
                    }
                }, o.getSchemaTpl("switchDefaultValue", {
                    visibleOn: "!this.defaultCheckAll"
                }), {
                    type: "textarea",
                    name: "value",
                    label: "默认值",
                    pipeOut: o.valuePipeOut,
                    visibleOn: 'typeof this.value !== "undefined"'
                }, {
                    label: "多行模式",
                    name: "multiLine",
                    type: "switch",
                    mode: "inline",
                    className: "w-full",
                    value: !1,
                    option: "即是否要换行"
                }, o.getSchemaTpl("multiple"), o.getSchemaTpl("joinValues"), o.getSchemaTpl("delimiter"), {
                    type: "switch",
                    name: "flat",
                    mode: "inline",
                    className: "w-full",
                    label: "是否将值打平",
                    visibleOn: "Array.isArray(data.controls) && data.controls.length === 1 && data.multiple",
                    description: "默认数组内的数据结构为对象，如果只有一个表单项，可以配置将值打平，那么数组内放置的就是那个表单项的值"
                }, {
                    label: "是否可新增",
                    type: "switch",
                    name: "addable",
                    mode: "inline",
                    className: "w-full",
                    visibleOn: "this.multiple",
                    pipeIn: o.defaultValue(!0)
                }, {
                    type: "textarea",
                    name: "scaffold",
                    label: "新增初始值",
                    visibleOn: "this.multiple && this.addable !== false",
                    pipeOut: o.valuePipeOut,
                    pipeIn: o.defaultValue({})
                }, {
                    label: "新增按钮文字",
                    name: "addButtonText",
                    type: "text",
                    visibleOn: "data.addable",
                    pipeIn: o.defaultValue("新增")
                }, {
                    label: "是否可删除",
                    type: "switch",
                    name: "removable",
                    mode: "inline",
                    className: "w-full",
                    visibleOn: "this.multiple",
                    pipeIn: o.defaultValue(!0)
                }, o.getSchemaTpl("api", {
                    name: "deleteApi",
                    label: "删除前的请求",
                    hiddenOn: "!data.removable"
                }), {
                    label: "删除确认提示",
                    name: "deleteConfirmText",
                    type: "text",
                    visibleOn: "data.deleteApi",
                    pipeIn: o.defaultValue("确认要删除")
                }, {
                    name: "draggable",
                    label: "是否可拖拽排序",
                    type: "switch",
                    visibleOn: "this.multiple",
                    mode: "inline",
                    className: "w-full"
                }, {
                    label: "拖拽排序的提示文字",
                    name: "draggableTip",
                    type: "text",
                    visibleOn: "data.draggable",
                    pipeIn: o.defaultValue("可通过拖动每行中的【交换】按钮进行顺序调整")
                }, {
                    name: "noBorder",
                    label: "去掉边框",
                    type: "switch",
                    visibleOn: "this.multiLine",
                    mode: "inline",
                    className: "w-full"
                }, {
                    name: "minLength",
                    type: "number",
                    label: "限制最小数量"
                }, {
                    name: "maxLength",
                    type: "number",
                    label: "限制最大数量"
                }, {
                    label: "默认消息提示",
                    type: "combo",
                    name: "messages",
                    multiLine: !0,
                    description: "",
                    controls: [{
                        label: "有子表单项限制失败时提示",
                        type: "text",
                        name: "validateFailed"
                    }, {
                        label: "最小长度验证失败时提示",
                        type: "text",
                        name: "minLengthValidateFailed"
                    }, {
                        label: "最大长度验证失败时提示",
                        type: "text",
                        name: "maxLengthValidateFailed"
                    }]
                }, {
                    name: "canAccessSuperData",
                    label: "是否自动填充父级同名变量",
                    type: "switch",
                    pipeIn: o.defaultValue(!1),
                    mode: "inline",
                    className: "w-full"
                }, {
                    name: "strictMode",
                    label: "严格模式",
                    type: "switch",
                    mode: "inline",
                    className: "w-full",
                    pipeIn: o.defaultValue(!0),
                    description: "如果你希望环境变量的值实时透传到 Combo 中，请关闭此选项。"
                }, {
                    name: "controls",
                    label: "各列 CSS 配置",
                    hiddenOn: "this.multiLine",
                    type: "combo",
                    addable: !1,
                    removable: !1,
                    multiple: !0,
                    controls: [{
                        name: "columnClassName",
                        placeholder: "CSS 类名",
                        type: "text"
                    }]
                }]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.filterProps = function(e) {
            return (e = c.JSONPipeOut(e, !0)).multiple && !e.value && (e.value = [{}]),
            e
        }
        ,
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t.prototype.buildEditorToolbar = function(e, t) {
            var a = e.id;
            "combo-control" === e.info.renderer.name && t.push({
                icon: "fa fa-expand",
                order: 100,
                tooltip: "配置子表单项",
                onClick: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.buildEditorContextMenu = function(e, t) {
            var a = e.id;
            e.schema,
            e.region;
            "combo-control" === e.info.renderer.name && t.push("|", {
                label: "配置成员渲染器",
                onSelect: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.editDetail = function(e) {
            var t = this.manager
              , a = t.store
              , l = a.getNodeById(e)
              , i = a.getValueOf(e);
            l && i && this.manager.openSubEditor({
                title: "配置子表单项",
                value: i.controls,
                slot: {
                    type: "form",
                    mode: "normal",
                    controls: "$$",
                    wrapWithPanel: !1,
                    className: "wrapper"
                },
                onChange: function(e) {
                    e = n.__assign(n.__assign({}, i), {
                        controls: e
                    }),
                    t.panelChangeValue(e, d.diff(i, e))
                }
            })
        }
        ,
        t
    }(r.BasePlugin);
    t.ComboControlPlugin = u,
    i.registerEditorPlugin(u)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ContainerControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "container-control",
            t.$schema = "https://isuda.baidu.com/schemas/ContainerControlSchema.json",
            t.regions = [{
                key: "controls",
                label: "子表单项",
                renderMethod: "renderBody",
                preferTag: "表单项",
                matchRegion: function(e, t) {
                    return Array.isArray(t.props.controls)
                },
                optional: !0
            }, {
                key: "body",
                label: "子内容",
                renderMethod: "renderBody",
                matchRegion: function(e, t) {
                    return !Array.isArray(t.props.controls)
                },
                insertPosition: "outter",
                optional: !0
            }],
            t.name = "容器",
            t.description = "表单项容器，本身是个表单项，同时可以作为容器包含多个表单项。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/container",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "container",
                label: "label",
                controls: [{
                    placeholder: "文本1",
                    type: "text",
                    name: "a",
                    label: !1
                }, {
                    placeholder: "文本2",
                    type: "text",
                    name: "b",
                    label: !1
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "容器配置",
            t.panelControls = [{
                label: "内容形式",
                name: "__mode",
                type: "button-group",
                size: "xs",
                description: "如果选择表单，内容默认为表单项，如果选择其他则可以放其他类型渲染器",
                pipeIn: function(e, t) {
                    return Array.isArray(t.body) ? "other" : "form"
                },
                onChange: function(e, t, a, n) {
                    "form" === e ? (n.setValues({
                        controls: n.data.__controls || [{
                            placeholder: "文本1",
                            type: "text",
                            name: "a",
                            label: !1
                        }],
                        __body: n.data.body
                    }),
                    n.deleteValueByName("body")) : (n.setValues({
                        body: n.data.__body || [{
                            type: "tpl",
                            tpl: "内容",
                            inline: !1
                        }],
                        __controls: n.data.controls
                    }),
                    n.deleteValueByName("controls"))
                },
                options: [{
                    label: "表单",
                    value: "form"
                }, {
                    label: "其他",
                    value: "other"
                }]
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.ContainerControlPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DateControlPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = a(3)
      , r = a(1)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "date-control",
            t.$schema = "https://isuda.baidu.com/schemas/DateControlSchema.json",
            t.order = -450,
            t.icon = "fa fa-calendar",
            t.name = "日期框",
            t.description = "年月日选择，支持相对值设定，如<code>+2days</code>两天后",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/date",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "date",
                label: "日期",
                name: "date"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "日期配置",
            t.panelControls = [i.getSchemaTpl("placeholder", {
                pipeIn: i.defaultValue("请选择日期")
            }), {
                type: "text",
                name: "format",
                label: "值格式",
                description: '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。',
                pipeIn: i.defaultValue("X")
            }, i.getSchemaTpl("switchDefaultValue"), {
                type: "text",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"',
                placeholder: "请输入相对值",
                description: "支持 <code>now、+1day、-2weeks</code>这种相对值用法"
            }, {
                type: "fieldSet",
                title: "固定值选择",
                collapsed: !0,
                collapsable: !0,
                className: "fieldset",
                visibleOn: 'typeof this.value !== "undefined"',
                controls: [{
                    type: "date",
                    name: "value",
                    pipeIn: function(e) {
                        return l.relativeValueRe.test(e) || ~["now", "today"].indexOf(e) ? "" : e
                    }
                }]
            }, i.getSchemaTpl("clearable", {
                pipeIn: i.defaultValue(!0)
            }), {
                type: "text",
                name: "minDate",
                label: "最小日期",
                placeholder: "请输入相对值",
                description: "支持 <code>now、+1day、-2weeks</code>这种相对值用法，同时支持变量如<code>\\${start_date}</code>"
            }, {
                type: "fieldSet",
                title: "固定值选择",
                collapsed: !0,
                collapsable: !0,
                className: "fieldset",
                controls: [{
                    type: "date",
                    name: "minDate",
                    pipeIn: function(e) {
                        return l.relativeValueRe.test(e) || ~["now", "today"].indexOf(e) ? "" : e
                    }
                }]
            }, {
                type: "divider"
            }, {
                type: "text",
                name: "maxDate",
                label: "最大日期",
                placeholder: "请输入相对值",
                description: "支持 <code>now、+1day、-2weeks</code>这种相对值用法，同时支持变量如<code>\\${start_date}</code>"
            }, {
                type: "fieldSet",
                title: "固定值选择",
                collapsed: !0,
                collapsable: !0,
                className: "fieldset",
                controls: [{
                    type: "date",
                    name: "maxDate",
                    pipeIn: function(e) {
                        return l.relativeValueRe.test(e) || ~["now", "today"].indexOf(e) ? "" : e
                    }
                }]
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.DateControlPlugin = o,
    r.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DateRangeControlPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = a(3)
      , r = a(1)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "date-range-control",
            t.$schema = "https://isuda.baidu.com/schemas/DateRangeControlSchema.json",
            t.order = -440,
            t.icon = "fa fa-calendar",
            t.name = "日期范围",
            t.description = "日期范围选择，可通过<code>minDate</code>、<code>maxDate</code>设定最小、最大日期",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/date-range",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "date-range",
                label: "日期范围",
                name: "date-range"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "日期范围",
            t.panelControls = [i.getSchemaTpl("placeholder", {
                pipeIn: i.defaultValue("请选择日期范围")
            }), {
                type: "text",
                name: "format",
                label: "值格式",
                description: '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。',
                pipeIn: i.defaultValue("X")
            }, i.getSchemaTpl("switchDefaultValue"), {
                type: "text",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"',
                placeholder: "请输入相对值",
                description: "支持 <code>now、+1day、-2weeks</code>这种相对值用法，由于包含开始和结束时间，请用逗号隔开。"
            }, {
                type: "fieldSet",
                title: "固定值选择",
                visibleOn: 'typeof this.value !== "undefined"',
                collapsed: !0,
                collapsable: !0,
                className: "fieldset",
                controls: [{
                    type: "date-range",
                    name: "value",
                    pipeIn: function(e) {
                        return e ? e.split(",").map((function(e) {
                            return l.relativeValueRe.test(e) || ~["now", "today"].indexOf(e) ? "" : e
                        }
                        )) : ""
                    }
                }]
            }, i.getSchemaTpl("clearable", {
                pipeIn: i.defaultValue(!0)
            }), {
                type: "text",
                name: "minDate",
                label: "最小日期",
                placeholder: "请输入相对值",
                description: "支持 <code>now、+1day、-2weeks</code>这种相对值用法，同时支持变量如<code>\\${start_date}</code>"
            }, {
                type: "fieldSet",
                title: "固定值选择",
                collapsed: !0,
                collapsable: !0,
                className: "fieldset",
                controls: [{
                    type: "date",
                    name: "minDate",
                    pipeIn: function(e) {
                        return l.relativeValueRe.test(e) || ~["now", "today"].indexOf(e) ? "" : e
                    }
                }]
            }, {
                type: "divider"
            }, {
                type: "text",
                name: "maxDate",
                label: "最大日期",
                placeholder: "请输入相对值",
                description: "支持 <code>now、+1day、-2weeks</code>这种相对值用法，同时支持变量如<code>\\${start_date}</code>"
            }, {
                type: "fieldSet",
                title: "固定值选择",
                collapsed: !0,
                collapsable: !0,
                className: "fieldset",
                controls: [{
                    type: "date",
                    name: "maxDate",
                    pipeIn: function(e) {
                        return l.relativeValueRe.test(e) || ~["now", "today"].indexOf(e) ? "" : e
                    }
                }]
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.DateRangeControlPlugin = o,
    r.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DateTimeControlPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = a(3)
      , r = a(1)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "datetime-control",
            t.$schema = "https://isuda.baidu.com/schemas/DateTimeControlSchema.json",
            t.icon = "fa fa-calendar",
            t.name = "日期时间",
            t.description = "年月日时分选择",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/datetime",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "datetime",
                label: "日期时间",
                name: "datetime"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "日期时间",
            t.panelControls = [i.getSchemaTpl("placeholder", {
                pipeIn: i.defaultValue("请选择日期时间")
            }), {
                type: "text",
                name: "format",
                label: "值格式",
                description: '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。',
                pipeIn: i.defaultValue("X")
            }, i.getSchemaTpl("switchDefaultValue"), {
                type: "text",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"',
                placeholder: "请输入相对值",
                description: "支持 <code>now、+1day、-2weeks</code>这种相对值用法"
            }, {
                type: "fieldSet",
                title: "固定值选择",
                collapsed: !0,
                collapsable: !0,
                className: "fieldset",
                visibleOn: 'typeof this.value !== "undefined"',
                controls: [{
                    type: "datetime",
                    name: "value",
                    pipeIn: function(e) {
                        return l.relativeValueRe.test(e) || ~["now", "today"].indexOf(e) ? "" : e
                    }
                }]
            }, i.getSchemaTpl("clearable", {
                pipeIn: i.defaultValue(!0)
            }), {
                type: "text",
                name: "inputFormat",
                label: "显示格式",
                description: '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。',
                pipeIn: i.defaultValue("YYYY-MM-DD HH:mm")
            }, {
                type: "text",
                name: "minDate",
                label: "最小日期",
                placeholder: "请输入相对值",
                description: "支持 <code>now、+1day、-2weeks</code>这种相对值用法，同时支持变量如<code>\\${start_date}</code>"
            }, {
                type: "fieldSet",
                title: "固定值选择",
                collapsed: !0,
                collapsable: !0,
                className: "fieldset",
                controls: [{
                    type: "date",
                    name: "minDate",
                    pipeIn: function(e) {
                        return l.relativeValueRe.test(e) || ~["now", "today"].indexOf(e) ? "" : e
                    }
                }]
            }, {
                type: "divider"
            }, {
                type: "text",
                name: "maxDate",
                label: "最大日期",
                placeholder: "请输入相对值",
                description: "支持 <code>now、+1day、-2weeks</code>这种相对值用法，同时支持变量如<code>\\${start_date}</code>"
            }, {
                type: "fieldSet",
                title: "固定值选择",
                collapsed: !0,
                collapsable: !0,
                className: "fieldset",
                controls: [{
                    type: "date",
                    name: "maxDate",
                    pipeIn: function(e) {
                        return l.relativeValueRe.test(e) || ~["now", "today"].indexOf(e) ? "" : e
                    }
                }]
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.DateTimeControlPlugin = o,
    r.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DiffEditorControlPlugin = void 0;
    var n = a(0)
      , l = a(25)
      , i = a(3)
      , r = a(1)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "diff-editor-control",
            t.$schema = "https://isuda.baidu.com/schemas/DiffEditorControlSchema.json",
            t.name = "diff编辑器",
            t.description = "左右两边的代码做对比，支持的语言包括：" + l.availableLanguages.slice(0, 10).join("，") + "等等",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/diff-editor",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "diff-editor",
                label: "diff编辑器",
                name: "diff"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "Diff编辑器",
            t.panelControls = [{
                type: "textarea",
                name: "diffValue",
                label: "左侧值",
                pipeOut: i.valuePipeOut,
                description: "支持使用 <code>\\${xxx}</code> 来获取变量"
            }, i.getSchemaTpl("switchDefaultValue", {
                label: "设置右侧默认值"
            }), {
                type: "textarea",
                name: "value",
                label: "右侧默认值",
                pipeOut: i.valuePipeOut,
                visibleOn: 'typeof this.value !== "undefined"'
            }, {
                label: "语言",
                name: "language",
                type: "select",
                value: "javascript",
                searchable: !0,
                options: l.availableLanguages.concat()
            }, {
                name: "size",
                type: "button-group",
                size: "sm",
                pipeIn: i.defaultValue(""),
                className: "w-full",
                label: "控件尺寸",
                options: [{
                    label: "默认",
                    value: ""
                }, {
                    label: "中",
                    value: "md"
                }, {
                    label: "大",
                    value: "lg"
                }, {
                    label: "加大",
                    value: "xl"
                }, {
                    label: "再加大",
                    value: "xxl"
                }]
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.DiffEditorControlPlugin = o,
    r.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.EditorControlPlugin = void 0;
    var n = a(0)
      , l = a(25)
      , i = a(3)
      , r = a(1)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "editor-control",
            t.$schema = "https://isuda.baidu.com/schemas/EditorControlSchema.json",
            t.name = "代码编辑器",
            t.description = "代码编辑器，采用 monaco-editor 支持：" + l.availableLanguages.slice(0, 10).join("，") + "等等",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/editor",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "editor",
                label: "代码编辑器",
                name: "editor"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "Editor",
            t.panelControls = [{
                label: "语言",
                name: "language",
                type: "select",
                value: "javascript",
                searchable: !0,
                options: l.availableLanguages.concat()
            }, {
                name: "size",
                type: "button-group",
                size: "xs",
                pipeIn: i.defaultValue(""),
                label: "控件大小",
                options: [{
                    label: "默认",
                    value: ""
                }, {
                    label: "中",
                    value: "md"
                }, {
                    label: "大",
                    value: "lg"
                }, {
                    label: "加大",
                    value: "xl"
                }, {
                    label: "加加大",
                    value: "xxl"
                }]
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.EditorControlPlugin = o,
    r.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.EmailControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "email-control",
            t.$schema = "https://isuda.baidu.com/schemas/TextControlSchema.json",
            t.name = "邮箱框",
            t.description = "验证输入是否符合邮箱的格式",
            t.scaffold = {
                type: "email",
                label: "邮箱",
                name: "email"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: n.__assign({}, t.scaffold)
            },
            t.panelTitle = t.name,
            t
        }
        return n.__extends(t, e),
        t
    }(a(20).TextControlPlugin);
    t.EmailControlPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.FieldSetControlPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(3)
      , o = a(1)
      , s = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "fieldset",
            t.$schema = "https://isuda.baidu.com/schemas/FieldSetControlSchema.json",
            t.name = "字段集",
            t.description = "多个表单项的组合，可配置是否折叠",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/fieldset",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "fieldset",
                title: "标题",
                controls: [{
                    type: "text",
                    label: "文本",
                    name: "text"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.regions = [{
                key: "controls",
                label: "子表单项",
                renderMethod: "renderBody",
                insertPosition: "inner",
                preferTag: "表单项"
            }],
            t.panelTitle = "字段集",
            t.panelControlsCreator = function(e) {
                return [{
                    label: "标题",
                    name: "title",
                    type: "text"
                }, {
                    name: "collapsable",
                    label: "是否可折叠",
                    type: "switch",
                    mode: "inline",
                    className: "w-full",
                    pipeIn: r.defaultValue(!1)
                }, {
                    name: "collapsed",
                    label: "默认是否折叠",
                    type: "switch",
                    mode: "inline",
                    visibleOn: "this.collapsable",
                    className: "w-full"
                }, {
                    name: "className",
                    type: "button-group",
                    clearable: !0,
                    size: "sm",
                    label: "控件样式",
                    className: "w-full",
                    pipeIn: r.defaultValue(""),
                    options: [{
                        label: "默认",
                        value: ""
                    }, {
                        value: "Collapse--xs",
                        label: "极小"
                    }, {
                        value: "Collapse--sm",
                        label: "小"
                    }, {
                        value: "Collapse--base",
                        label: "正常"
                    }, {
                        value: "Collapse--md",
                        label: "大"
                    }, {
                        value: "Collapse--lg",
                        label: "超大"
                    }]
                }, r.getSchemaTpl("className", {
                    name: "headingClassName",
                    label: "标题 CSS 类名"
                }), r.getSchemaTpl("className", {
                    name: "bodyClassName",
                    label: "内容区域 CSS 类名"
                }), {
                    children: i.default.createElement(l.Button, {
                        level: "info",
                        size: "sm",
                        className: "m-b-sm",
                        block: !0,
                        onClick: function() {
                            t.manager.showInsertPanel("controls", e.id)
                        }
                    }, "添加子表单项")
                }]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t.prototype.filterProps = function(e) {
            return e.collapsed = !1,
            e
        }
        ,
        t
    }(a(2).BasePlugin);
    t.FieldSetControlPlugin = s,
    o.registerEditorPlugin(s)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.FileControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "file-control",
            t.$schema = "https://isuda.baidu.com/schemas/FileControlSchema.json",
            t.name = "文件上传",
            t.description = "可上传多个文件，可配置是否自动上传以及大文件分片上传",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/file",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "file",
                label: "文件上传",
                name: "file"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "文件域",
            t.panelControls = [l.getSchemaTpl("fieldSet", {
                title: "常规",
                controls: [{
                    type: "text",
                    name: "btnLabel",
                    label: "上传按钮名称",
                    value: "请选择文件"
                }, l.getSchemaTpl("apiString", {
                    label: "文件接收器",
                    name: "reciever",
                    description: "默认不填写将上传到 bos，可以在系统配置中设置为自己的 bos 地址。",
                    value: "/api/upload/file"
                }), {
                    type: "fieldSet",
                    title: "分块上传相关",
                    collapsed: !0,
                    collapsable: !0,
                    className: "fieldset",
                    controls: [{
                        type: "button-group",
                        name: "useChunk",
                        label: "启用分块",
                        size: "xs",
                        pipeOut: l.valuePipeOut,
                        value: "auto",
                        options: [{
                            label: "自动",
                            value: "auto"
                        }, {
                            label: "启用",
                            value: !0
                        }, {
                            label: "关闭",
                            value: !1
                        }]
                    }, {
                        name: "chunkSize",
                        type: "number",
                        label: "分块大小",
                        visibleOn: "data.useChunk != false",
                        value: 5242880
                    }, l.getSchemaTpl("apiString", {
                        name: "startChunkApi",
                        label: "startChunkApi",
                        value: "/api/upload/startChunk"
                    }), l.getSchemaTpl("apiString", {
                        name: "chunkApi",
                        label: "chunkApi",
                        value: "/api/upload/chunk"
                    }), l.getSchemaTpl("apiString", {
                        name: "finishChunkApi",
                        label: "finishChunkApi",
                        value: "/api/upload/finishChunk"
                    })]
                }, {
                    type: "text",
                    name: "accept",
                    label: "文件类型",
                    value: "text/plain",
                    description: "请填写文件的 <code>mime-types</code>，参考 <code>input[type=file]</code> 的 <code>accept</code> 说明"
                }, l.getSchemaTpl("switchDefaultValue"), {
                    type: "text",
                    name: "value",
                    label: "默认值",
                    visibleOn: 'typeof this.value !== "undefined"'
                }, l.getSchemaTpl("multiple", {
                    pipeIn: l.defaultValue(!1)
                }), l.getSchemaTpl("joinValues"), l.getSchemaTpl("delimiter"), l.getSchemaTpl("extractValue")]
            }), l.getSchemaTpl("fieldSet", {
                title: "样式",
                collapsed: !0,
                controls: [l.getSchemaTpl("className", {
                    name: "btnClassName",
                    label: "按钮 CSS 类名",
                    pipeIn: l.defaultValue("btn-sm btn-info")
                }), l.getSchemaTpl("className", {
                    name: "btnUploadClassName",
                    label: "上传按钮 CSS 类名",
                    pipeIn: l.defaultValue("btn-sm btn-success")
                })]
            }), l.getSchemaTpl("fieldSet", {
                title: "其他",
                collapsed: !0,
                controls: [{
                    name: "maxSize",
                    type: "number",
                    label: "文件最大体积",
                    description: "超出大小不允许上传，单位字节"
                }, {
                    name: "maxLength",
                    type: "number",
                    label: "文件最大数量",
                    description: "超出数量不允许上传"
                }, {
                    name: "fileField",
                    type: "text",
                    label: "文件域名称",
                    value: "file"
                }, {
                    name: "asBase64",
                    type: "switch",
                    mode: "inline",
                    className: "block",
                    label: "作为 Base64 提交",
                    description: "小文件时可以使用，默认给 Form 提交的是文件下载地址，设置后给 Form 提交文件内容的 base64 格式字符串。"
                }, {
                    name: "asBlob",
                    type: "switch",
                    mode: "inline",
                    className: "block",
                    label: "作为二进制提交",
                    description: "File 控件不接管文件上传，直接由表单的保存接口完成。和 Base64 选项二选一。"
                }, {
                    name: "autoUpload",
                    type: "switch",
                    mode: "inline",
                    className: "block",
                    label: "是否自动上传"
                }, {
                    name: "hideUploadButton",
                    type: "switch",
                    mode: "inline",
                    className: "block",
                    label: "是否隐藏上传按钮",
                    value: !1
                }]
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.FileControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.FormPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = a(15)
      , s = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "form",
            t.$schema = "https://isuda.baidu.com/schemas/FormSchema.json",
            t.order = -201,
            t.name = "表单",
            t.description = "可用于新建、编辑或者展示数据，配置初始化接口可从远端加载数据，配置提交接口可将数据发送远端。另外也可以将数据提交给其他组件，与其他组件通信。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/page",
            t.tags = ["功能"],
            t.icon = "fa fa-list-alt",
            t.scaffold = {
                type: "form",
                title: "表单",
                controls: [{
                    label: "文本框",
                    type: "text",
                    name: "text"
                }]
            },
            t.previewSchema = {
                type: "form",
                panelClassName: "Panel--default text-left m-b-none",
                controls: [{
                    label: "文本",
                    name: "a",
                    type: "text"
                }]
            },
            t.regions = [{
                key: "controls",
                label: "表单集合",
                matchRegion: function(e) {
                    return !!(null == e ? void 0 : e.props.noValidate)
                },
                renderMethod: "renderBody",
                preferTag: "表单项"
            }, {
                label: "按钮组",
                key: "actions",
                preferTag: "按钮"
            }],
            t.panelTitle = "表单",
            t.panelControlsCreator = function(e) {
                var t = /\/crud\/filter\/form$/.test(e.path)
                  , a = /(?:\/|^)dialog\/.+$/.test(e.path);
                return [r.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        name: "submitText",
                        type: "text",
                        label: "提交按钮名称",
                        pipeIn: r.defaultValue("提交"),
                        visibleOn: "this.wrapWithPanel !== false && !this.actions && (!Array.isArray(this.controls) || !this.controls.some(function(item) {return !!~['submit','button','reset','button-group'].indexOf(item.type);}))",
                        description: "当没有自定义按钮时有效。"
                    }, {
                        name: "autoFocus",
                        type: "switch",
                        label: "自动聚焦",
                        mode: "inline",
                        className: "block",
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "设置后将让表单的第一个可输入的表单项获得焦点",
                            placement: "left"
                        }
                    }, r.getSchemaTpl("submitOnChange"), {
                        label: "提交完后重置表单",
                        type: "switch",
                        name: "resetAfterSubmit",
                        mode: "inline",
                        className: "block",
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "即表单提交完后，让所有表单项的值还原成初始值",
                            placement: "left"
                        }
                    }, t ? null : {
                        label: "初始化后提交一次",
                        type: "switch",
                        name: "submitOnInit",
                        mode: "inline",
                        className: "block",
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "开启后，表单初始完成便会触发一次提交。",
                            placement: "left"
                        }
                    }, a ? {
                        label: "提交后是否关闭对话框",
                        type: "switch",
                        name: "closeDialogOnSubmit",
                        mode: "inline",
                        className: "block",
                        pipeIn: function(e) {
                            return !1 !== e
                        }
                    } : null, t ? null : {
                        label: "提交给其他组件",
                        name: "target",
                        type: "text",
                        description: "可以通过设置此属性，把当前表单的值提交给目标组件，而不是自己来通过接口保存，请填写目标组件的 <code>name</code> 属性，多个组件请用逗号隔开。当 <code>target</code> 为 <code>window</code> 时，则把表单数据附属到地址栏。"
                    }, r.getSchemaTpl("reload", {
                        test: !t
                    }), t ? null : {
                        label: "跳转",
                        name: "redirect",
                        type: "text",
                        description: "当设置此值后，表单提交完后跳转到目标地址。"
                    }, {
                        name: "canAccessSuperData",
                        label: "是否自动填充父级同名变量",
                        type: "switch",
                        pipeIn: r.defaultValue(!0),
                        mode: "inline",
                        className: "block"
                    }, {
                        name: "persistData",
                        label: "是否开启本地缓存",
                        type: "switch",
                        pipeIn: r.defaultValue(!1),
                        mode: "inline",
                        className: "block",
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "开启后，表单的数据会缓存在浏览器中，切换页面或关闭弹框不会清空当前表单内的数据",
                            placement: "left"
                        }
                    }, {
                        name: "clearPersistDataAfterSubmit",
                        label: "提交成功后清空本地缓存",
                        type: "switch",
                        pipeIn: r.defaultValue(!1),
                        mode: "inline",
                        className: "block",
                        visibleOn: "data.persistData",
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "开启本地缓存并开启本配置项后，表单提交成功后，会自动清除浏览器中当前表单的缓存数据",
                            placement: "left"
                        }
                    }]
                }, {
                    title: "接口",
                    controls: [r.getSchemaTpl("api", {
                        label: "保存接口",
                        description: "用来保存表单数据",
                        sampleBuilder: function(e) {
                            return '{\n    "status": 0,\n    "msg": "",\n\n    // 可以不返回，如果返回了数据将被 merge 进来。\n    data: {} \n  }'
                        }
                    }), {
                        label: "采用异步方式?",
                        remark: {
                            trigger: "click",
                            rootClose: !0,
                            title: "什么是异步方式？",
                            content: "异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。",
                            placement: "left"
                        },
                        type: "switch",
                        name: "asyncApi",
                        visibleOn: "data.api",
                        pipeIn: function(e) {
                            return null != e
                        },
                        pipeOut: function(e) {
                            return e ? "" : void 0
                        },
                        mode: "inline",
                        className: "block"
                    }, r.getSchemaTpl("api", {
                        name: "asyncApi",
                        label: "异步检测接口",
                        visibleOn: "data.asyncApi != null",
                        description: "设置此属性后，表单提交发送保存接口后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束"
                    }), {
                        type: "divider"
                    }, r.getSchemaTpl("api", {
                        name: "initApi",
                        label: "初始化接口",
                        description: "用来初始化表单数据",
                        sampleBuilder: function(e) {
                            var t = {};
                            return Array.isArray(e.controls) && e.controls.forEach((function(e) {
                                e.name && !~["combo", "array", "form"].indexOf(e.type) && o.setVariable(t, e.name, "sample")
                            }
                            )),
                            JSON.stringify({
                                status: 0,
                                msg: "",
                                data: t
                            }, null, 2)
                        }
                    }), {
                        label: "开启定时刷新",
                        type: "switch",
                        name: "interval",
                        visibleOn: "data.initApi",
                        pipeIn: function(e) {
                            return !!e
                        },
                        pipeOut: function(e) {
                            return e ? 3e3 : void 0
                        },
                        mode: "inline"
                    }, {
                        name: "interval",
                        type: "number",
                        visibleOn: "data.interval",
                        step: 500,
                        className: "m-t-n-sm",
                        description: "设置后将自动定时刷新，单位 ms"
                    }, {
                        name: "silentPolling",
                        label: "静默刷新",
                        type: "switch",
                        mode: "inline",
                        visibleOn: "!!data.interval",
                        description: "设置自动定时刷新时是否显示loading"
                    }, {
                        name: "stopAutoRefreshWhen",
                        label: "停止定时刷新检测表达式",
                        type: "text",
                        visibleOn: "!!data.interval",
                        description: "定时刷新一旦设置会一直刷新，除非给出表达式，条件满足后则不刷新了。"
                    }, {
                        label: "采用异步方式？",
                        remark: {
                            trigger: "click",
                            rootClose: !0,
                            title: "什么是异步方式？",
                            content: "异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。",
                            placement: "left"
                        },
                        type: "switch",
                        name: "initAsyncApi",
                        visibleOn: "data.initApi",
                        pipeIn: function(e) {
                            return null != e
                        },
                        pipeOut: function(e) {
                            return e ? "" : void 0
                        },
                        mode: "inline"
                    }, r.getSchemaTpl("api", {
                        name: "initAsyncApi",
                        label: "异步检测接口",
                        visibleOn: "data.initAsyncApi != null",
                        description: "设置此属性后，表单请求 initApi 后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束"
                    }), {
                        type: "divider"
                    }, t ? {
                        name: "messages",
                        pipeIn: r.defaultValue({
                            fetchFailed: "初始化失败"
                        }),
                        label: "默认消息信息",
                        type: "combo",
                        multiLine: !0,
                        description: "可以不设置，接口返回的 msg 字段，优先级更高",
                        controls: [{
                            label: "获取成功提示",
                            name: "fetchSuccess",
                            type: "text"
                        }, {
                            label: "获取失败提示",
                            name: "fetchFailed",
                            type: "text"
                        }]
                    } : {
                        name: "messages",
                        pipeIn: r.defaultValue({
                            fetchFailed: "初始化失败",
                            saveSuccess: "保存成功",
                            saveFailed: "保存失败"
                        }),
                        label: "默认消息提示",
                        type: "combo",
                        multiLine: !0,
                        description: "可以不设置，接口返回的 msg 字段，优先级更高",
                        controls: [{
                            label: "获取成功提示",
                            name: "fetchSuccess",
                            type: "text"
                        }, {
                            label: "获取失败提示",
                            name: "fetchFailed",
                            type: "text"
                        }, {
                            label: "保存成功提示",
                            name: "saveSuccess",
                            type: "text"
                        }, {
                            label: "保存失败提示",
                            name: "saveFailed",
                            type: "text"
                        }, {
                            label: "验证失败提示",
                            name: "validateFailed",
                            type: "text"
                        }]
                    }]
                }, {
                    title: "外观",
                    controls: [{
                        name: "wrapWithPanel",
                        type: "switch",
                        mode: "inline",
                        className: "block",
                        label: "用 Panel 包裹",
                        pipeIn: r.defaultValue(!0),
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "关闭后，表单只会展示表单项，标题和操作栏将不会显示。",
                            placement: "left"
                        }
                    }, {
                        name: "mode",
                        label: "展示模式",
                        type: "button-group",
                        size: "sm",
                        pipeIn: r.defaultValue("normal", !1),
                        options: [{
                            label: "默认",
                            value: "normal"
                        }, {
                            label: "左右摆放",
                            value: "horizontal"
                        }, {
                            label: "内联",
                            value: "inline"
                        }]
                    }, r.getSchemaTpl("horizontal", {
                        visibleOn: 'this.mode == "horizontal"'
                    }), r.getSchemaTpl("className"), r.getSchemaTpl("className", {
                        name: "panelClassName",
                        visibleOn: "this.wrapWithPanel !== false",
                        label: "Panel 的 CSS 类名",
                        description: "可以设置 Panel--info 之类的"
                    })]
                }, {
                    title: "其他",
                    controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("name", {
                        test: !t
                    }), {
                        name: "debug",
                        label: "开启调试",
                        type: "switch",
                        mode: "inline",
                        labelRemark: "显示当前表单的数据在表单顶部"
                    }, r.getSchemaTpl("disabled"), r.getSchemaTpl("visible")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.afterUpdate = function(e) {
            var t, a = e.context;
            ("form" === a.info.renderer.name || a.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )) && (null === (t = a.diff) || void 0 === t ? void 0 : t.some((function(e) {
                var t;
                return "wrapWithPanel" === (null === (t = e.path) || void 0 === t ? void 0 : t.join("."))
            }
            )))) && this.manager.buildPanels()
        }
        ,
        t
    }(i.BasePlugin);
    t.FormPlugin = s,
    l.registerEditorPlugin(s)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.FormulaControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "formula-control",
            t.$schema = "https://isuda.baidu.com/schemas/FormulaControlSchema.json",
            t.name = "公式",
            t.description = "通过公式计算指定的变量值，并将其结果作用到指定的变量中",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/formula",
            t.tags = ["表单项", "功能"],
            t.scaffold = {
                type: "formula",
                name: "formula"
            },
            t.previewSchema = {
                type: "tpl",
                tpl: "计算公式"
            },
            t.panelTitle = "公式",
            t.panelControls = [{
                label: "字段名",
                name: "name",
                type: "text",
                description: "公式计算结果会作用到此字段名对应的变量中。"
            }, {
                type: "text",
                name: "value",
                label: "默认值"
            }, {
                type: "text",
                name: "formula",
                label: "公式",
                description: "支持 JS 表达式，如： <code>data.var_a + 2</code>，即当表单项 <code>var_a</code> 变化的时候，会自动给当前表单项设置为 <code>var_a + 2</code> 的值。若设置为字符串，则需要加引号"
            }, {
                type: "text",
                name: "condition",
                label: "作用条件",
                description: '支持如：<code>\\${xxx}</code>或者<code>data.xxx == "a"</code> 表达式来配置作用条件，当满足该作用条件时，会将计算结果设置到目标变量上。'
            }, {
                name: "initSet",
                type: "switch",
                label: "是否初始应用",
                pipeIn: l.defaultValue(!0),
                description: "是否初始化的时候运行公式结果，并设置到目标变量上。",
                mode: "inline",
                className: "block"
            }, {
                name: "autoSet",
                type: "switch",
                label: "是否自动应用",
                pipeIn: l.defaultValue(!0),
                mode: "inline",
                className: "block",
                description: "是否自动计算公式结果，有变化时自动设置到目标变量上。<br />关闭后，通过按钮也能触发运算。"
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t.prototype.renderRenderer = function(e) {
            return this.renderPlaceholder("功能组件（公式）", e.key)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.FormulaControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.GridControlPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(3)
      , o = a(13)
      , s = a(1)
      , d = a(2)
      , c = a(12)
      , u = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "grid-control",
            t.$schema = "https://isuda.baidu.com/schemas/GridControlSchema.json",
            t.icon = "fa fa-columns",
            t.name = "Grid",
            t.description = "格子布局",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/grid",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "grid",
                label: "Grid",
                columns: [{
                    controls: [{
                        label: "文本",
                        name: "var1",
                        type: "text"
                    }]
                }, {
                    controls: [{
                        label: "文本2",
                        name: "var2",
                        type: "text"
                    }]
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "格子布局",
            t.panelControls = [{
                name: "columns",
                type: "combo",
                multiple: !0,
                controls: [{
                    type: "tpl",
                    tpl: '<span class="label label-default">列${index | plus}</span>',
                    columnClassName: "no-grow v-middle"
                }],
                draggable: !0,
                draggableTip: "",
                minLength: 2,
                addButtonText: "新增一列",
                scaffold: {
                    controls: [{
                        label: "文本",
                        name: "var1",
                        type: "text"
                    }]
                }
            }, r.getSchemaTpl("className")],
            t.vRendererConfig = {
                regions: {
                    body: {
                        key: "body",
                        label: "内容区"
                    },
                    controls: {
                        key: "controls",
                        label: "子表单项",
                        preferTag: "表单项"
                    }
                },
                panelTitle: "格子",
                panelControlsCreator: function(e) {
                    return [r.getSchemaTpl("className", {
                        label: "格子 CSS 类名",
                        name: "columnClassName"
                    }), {
                        type: "switch",
                        name: "__mode",
                        label: "宽度自动分配",
                        mode: "inline",
                        className: "block",
                        pipeIn: function(e, t) {
                            return !(t.xs || t.sm || t.md || t.lg)
                        },
                        columnClassName: "w-xs v-middle",
                        onChange: function(e, t, a, n) {
                            e ? (n.deleteValueByName("xsHidden"),
                            n.deleteValueByName("xs"),
                            n.deleteValueByName("smHidden"),
                            n.deleteValueByName("sm"),
                            n.deleteValueByName("mdHidden"),
                            n.deleteValueByName("md"),
                            n.deleteValueByName("lgHidden"),
                            n.deleteValueByName("lg")) : n.setValues({
                                xs: 6
                            })
                        }
                    }, {
                        type: "tabs",
                        visibleOn: "this.xs || this.sm || this.md || this.lg",
                        tabs: [{
                            title: "xs",
                            controls: [{
                                type: "switch",
                                name: "xsHidden",
                                label: "是否隐藏",
                                mode: "inline",
                                className: "block",
                                pipeIn: r.defaultValue("false")
                            }, {
                                label: "宽度占比",
                                type: "range",
                                name: "xs",
                                min: 1,
                                max: 12,
                                step: 1,
                                pipeIn: r.defaultValue(6)
                            }]
                        }, {
                            title: "sm",
                            controls: [{
                                type: "switch",
                                name: "xsHidden",
                                label: "是否隐藏",
                                mode: "inline",
                                className: "block",
                                pipeIn: r.defaultValue("false")
                            }, {
                                label: "宽度占比",
                                type: "range",
                                name: "sm",
                                min: 1,
                                max: 12,
                                step: 1,
                                pipeIn: r.defaultValue(6)
                            }]
                        }, {
                            title: "md",
                            controls: [{
                                type: "switch",
                                name: "mdHidden",
                                label: "是否隐藏",
                                mode: "inline",
                                className: "block",
                                pipeIn: r.defaultValue("false")
                            }, {
                                label: "宽度占比",
                                type: "range",
                                name: "md",
                                min: 1,
                                max: 12,
                                step: 1,
                                pipeIn: r.defaultValue(6)
                            }]
                        }, {
                            title: "lg",
                            controls: [{
                                type: "switch",
                                name: "lgHidden",
                                label: "是否隐藏",
                                mode: "inline",
                                className: "block",
                                pipeIn: r.defaultValue("false")
                            }, {
                                label: "宽度占比",
                                type: "range",
                                name: "lg",
                                min: 1,
                                max: 12,
                                step: 1,
                                pipeIn: r.defaultValue(6)
                            }]
                        }]
                    }, {
                        label: "内容形式",
                        name: "__mode",
                        type: "button-group",
                        size: "xs",
                        description: "如果选择表单，内容默认为表单项，如果选择其他则可以放其他非表单类渲染器",
                        pipeIn: function(e, t) {
                            return Array.isArray(t.controls) ? "form" : "other"
                        },
                        onChange: function(e, t, a, n) {
                            "form" === e ? (n.setValues({
                                controls: n.data.__controls || [{
                                    label: "文本",
                                    name: "var1",
                                    type: "text"
                                }],
                                __body: n.data.body
                            }),
                            n.deleteValueByName("body")) : (n.setValues({
                                body: n.data.__body || {
                                    type: "tpl",
                                    tpl: "内容",
                                    inline: !1
                                },
                                __controls: n.data.controls
                            }),
                            n.deleteValueByName("controls"))
                        },
                        options: [{
                            label: "表单",
                            value: "form"
                        }, {
                            label: "其他",
                            value: "other"
                        }]
                    }, {
                        children: function(a) {
                            var n = a.data;
                            return i.default.createElement(l.Button, {
                                size: "sm",
                                level: "info",
                                className: "m-b",
                                block: !0,
                                onClick: t.addControl.bind(t, Array.isArray(n.controls) ? "controls" : "body", e.id)
                            }, "添加成员")
                        }
                    }]
                }
            },
            t.vWrapperResolve = function(e) {
                return e.parentElement
            }
            ,
            t.overrides = {
                renderChild: function(e, t, a, n) {
                    var l = this.super(e, t, a, n)
                      , r = this.props.$$editor;
                    if (r && t.$$id) {
                        var s = r.plugin
                          , d = Array.isArray(t.controls) ? s.vRendererConfig.regions.controls : s.vRendererConfig.regions.body;
                        return i.default.createElement(o.VRenderer, {
                            key: t.$$id,
                            plugin: r.plugin,
                            renderer: r.renderer,
                            $schema: "",
                            hostId: r.id,
                            memberIndex: a,
                            name: "格子" + (a + 1),
                            id: t.$$id,
                            draggable: !1,
                            schemaPath: r.schemaPath + "/tabs/" + a,
                            wrapperResolve: s.vWrapperResolve,
                            path: this.props.$path + "/" + a,
                            data: this.props.data
                        }, d ? i.default.createElement(c.RegionWrapper, {
                            key: d.key,
                            preferTag: d.preferTag,
                            name: d.key,
                            label: d.label,
                            regionConfig: d,
                            editorStore: s.manager.store,
                            manager: s.manager,
                            children: l,
                            wrapperResolve: d.wrapperResolve,
                            rendererName: r.renderer.name
                        }) : l)
                    }
                    return l
                }
            },
            t
        }
        return n.__extends(t, e),
        t.prototype.addControl = function(e, t) {
            this.manager.showInsertPanel(e, t)
        }
        ,
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(d.BasePlugin);
    t.GridControlPlugin = u,
    s.registerEditorPlugin(u)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.GroupControlPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = a(6)
      , c = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "group-control",
            t.$schema = "https://isuda.baidu.com/schemas/GroupControlSchema.json",
            t.name = "表单组",
            t.description = "水平展示多个表单项",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/group",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "group",
                controls: [{
                    type: "text",
                    label: "文本",
                    name: "var1"
                }, {
                    type: "text",
                    label: "文本",
                    name: "var2"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.regions = [{
                key: "controls",
                label: "子表单",
                renderMethod: "renderInput",
                preferTag: "表单项",
                wrapperResolve: function(e) {
                    return e
                }
            }],
            t.panelTitle = "表单组",
            t.panelControls = [s.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    label: "Label",
                    name: "label",
                    type: "text"
                }, s.getSchemaTpl("description", {
                    visible: "this.label"
                }), {
                    children: i.default.createElement(l.Button, {
                        className: "m-b",
                        onClick: function() {
                            return t.manager.showInsertPanel("controls")
                        },
                        level: "danger",
                        tooltip: "插入一个新的元素",
                        size: "sm",
                        block: !0
                    }, "新增元素")
                }, s.getSchemaTpl("remark"), s.getSchemaTpl("labelRemark")]
            }, {
                title: "外观",
                controls: [s.getSchemaTpl("formItemMode"), s.getSchemaTpl("horizontalMode"), s.getSchemaTpl("horizontal", {
                    visibleOn: '(data.$$formMode == "horizontal" || data.mode == "horizontal") && data.label !== false && data.horizontal',
                    pipeIn: function(e, t) {
                        return {
                            leftRate: (e = e || t.formHorizontal && d.makeHorizontalDeeper(t.formHorizontal, t.controls.length)) && "number" == typeof e.left ? e.left : e && /\bcol\-(?:xs|sm|md|lg)\-(\d+)\b/.test(e.left) ? parseInt(RegExp.$1, 10) : 2,
                            leftFixed: e && e.leftFixed || ""
                        }
                    }
                }), {
                    name: "controls",
                    type: "combo",
                    label: "列宽度配置",
                    multiple: !0,
                    removable: !1,
                    addable: !1,
                    multiLine: !0,
                    visibleOn: 'data.$$formMode != "inline"',
                    controls: [{
                        type: "switch",
                        name: "columnRatio",
                        label: "自动分配",
                        disabledOn: 'this.mode === "inline"',
                        mode: "inline",
                        className: "block",
                        pipeIn: function(e, t) {
                            return "number" != typeof e && (!t.columnClassName || !/\bcol\-(?:xs|sm|md|lg)\-(\d+)\b/.test(t.columnClassName))
                        },
                        pipeOut: function(e) {
                            return e ? void 0 : 4
                        },
                        onChange: function(e, t, a, n) {
                            return !e && n.getValueByName("columnClassName") && n.setValueByName("columnClassName", n.getValueByName("columnClassName").replace(/\bcol\-(?:xs|sm|md|lg)\-(\d+)\b/g, ""))
                        },
                        columnClassName: "w-xs v-middle"
                    }, {
                        label: "宽度占比",
                        type: "range",
                        name: "columnRatio",
                        visibleOn: 'typeof this.columnRatio !== "undefined" || this.columnClassName && /\\bcol\\-(?:xs|sm|md|lg)\\-(\\d+)\\b/.test(this.columnClassName)',
                        pipeIn: function(e, t) {
                            return "number" == typeof e ? e : t.columnClassName && /\bcol\-(?:xs|sm|md|lg)\-(\d+)\b/.test(t.columnClassName) && parseInt(RegExp.$1, 10) || 2
                        },
                        min: 1,
                        max: 12,
                        step: 1
                    }]
                }, {
                    type: "button-group",
                    name: "gap",
                    label: "间隔大小",
                    pipeIn: s.defaultValue(""),
                    size: "xs",
                    options: [{
                        value: "xs",
                        label: "极小"
                    }, {
                        value: "sm",
                        label: "小"
                    }, {
                        value: "",
                        label: "正常"
                    }]
                }, s.getSchemaTpl("className"), {
                    name: "controls",
                    type: "combo",
                    label: "列 CSS 类名配置",
                    multiple: !0,
                    removable: !1,
                    addable: !1,
                    controls: [{
                        type: "text",
                        name: "columnClassName"
                    }]
                }]
            }, {
                title: "其他",
                controls: [s.getSchemaTpl("ref"), s.getSchemaTpl("visible")]
            }])],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(o.BasePlugin);
    t.GroupControlPlugin = c,
    r.registerEditorPlugin(c)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.HBoxControlPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(3)
      , o = a(13)
      , s = a(1)
      , d = a(2)
      , c = a(12)
      , u = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "hbox-control",
            t.$schema = "https://isuda.baidu.com/schemas/HBoxControlSchema.json",
            t.name = "HBox",
            t.description = "HBox布局，实现表单项左右排列",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/hbox",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "hbox",
                label: "HBox",
                columns: [{
                    controls: [{
                        label: "文本",
                        name: "var1",
                        type: "text"
                    }]
                }, {
                    controls: [{
                        label: "文本2",
                        name: "var2",
                        type: "text"
                    }]
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "HBox",
            t.panelControls = [{
                type: "combo",
                name: "columns",
                label: "列设置",
                multiple: !0,
                multiLine: !0,
                minLength: 1,
                draggable: !0,
                draggableTip: "",
                addButtonText: "新增一列",
                scaffold: {
                    controls: [{
                        label: "文本",
                        name: "var",
                        type: "text"
                    }]
                },
                strictMode: !1,
                controls: [{
                    name: "mode",
                    label: "展示模式",
                    type: "button-group",
                    size: "xs",
                    pipeIn: r.defaultValue("normal", !1),
                    hiddenOn: "!Array.isArray(this.controls)",
                    options: [{
                        label: "默认",
                        value: "normal"
                    }, {
                        label: "左右摆放",
                        value: "horizontal"
                    }, {
                        label: "内联",
                        value: "inline"
                    }]
                }, r.getSchemaTpl("horizontal", {
                    visibleOn: 'this.mode == "horizontal"'
                }), r.getSchemaTpl("className", {
                    name: "columnClassName",
                    label: "列 CSS 类名",
                    description: "可配置  <code>w 、w-xxs、w-xs、w-sm、w-md、w-lg、w-xl、w-xxl</code> 来固定列的宽度。"
                })]
            }, {
                type: "button-group",
                name: "gap",
                label: "间隔大小",
                pipeIn: r.defaultValue(""),
                size: "xs",
                options: [{
                    value: "xs",
                    label: "极小"
                }, {
                    value: "sm",
                    label: "小"
                }, {
                    value: "",
                    label: "正常"
                }]
            }],
            t.vRendererConfig = {
                regions: {
                    body: {
                        key: "body",
                        label: "内容区"
                    },
                    controls: {
                        key: "controls",
                        label: "子表单项",
                        preferTag: "表单项"
                    }
                },
                panelTitle: "列",
                panelControlsCreator: function(e) {
                    return [{
                        name: "mode",
                        label: "展示模式",
                        type: "button-group",
                        size: "xs",
                        pipeIn: r.defaultValue("normal", !1),
                        hiddenOn: "!Array.isArray(this.controls)",
                        options: [{
                            label: "默认",
                            value: "normal"
                        }, {
                            label: "左右摆放",
                            value: "horizontal"
                        }, {
                            label: "内联",
                            value: "inline"
                        }]
                    }, r.getSchemaTpl("horizontal", {
                        visibleOn: 'this.mode == "horizontal"'
                    }), r.getSchemaTpl("className", {
                        name: "columnClassName",
                        label: "列 CSS 类名",
                        description: "可配置  <code>w 、w-xxs、w-xs、w-sm、w-md、w-lg、w-xl、w-xxl</code> 来固定列的宽度。"
                    }), {
                        label: "内容形式",
                        name: "__mode",
                        type: "button-group",
                        size: "xs",
                        description: "如果选择表单，内容默认为表单项，如果选择其他则可以放其他非表单类渲染器",
                        pipeIn: function(e, t) {
                            return Array.isArray(t.controls) ? "form" : "other"
                        },
                        onChange: function(e, t, a, n) {
                            "form" === e ? (n.setValues({
                                controls: n.data.__controls || [{
                                    label: "文本",
                                    name: "var1",
                                    type: "text"
                                }],
                                __body: n.data.body
                            }),
                            n.deleteValueByName("body")) : (n.setValues({
                                body: n.data.__body || {
                                    type: "tpl",
                                    tpl: "内容",
                                    inline: !1
                                },
                                __controls: n.data.controls
                            }),
                            n.deleteValueByName("controls"))
                        },
                        options: [{
                            label: "表单",
                            value: "form"
                        }, {
                            label: "其他",
                            value: "other"
                        }]
                    }, {
                        children: function(a) {
                            var n = a.data;
                            return i.default.createElement(l.Button, {
                                size: "sm",
                                level: "info",
                                className: "m-b",
                                block: !0,
                                onClick: t.addControl.bind(t, Array.isArray(n.controls) ? "controls" : "body", e.id)
                            }, "添加成员")
                        }
                    }]
                }
            },
            t.vWrapperResolve = function(e) {
                return e.parentElement
            }
            ,
            t.overrides = {
                renderChild: function(e, t, a) {
                    var n = this.super(e, t, a)
                      , l = this.props.$$editor;
                    if (l && t.$$id) {
                        var r = l.plugin
                          , s = Array.isArray(t.controls) ? r.vRendererConfig.regions.controls : r.vRendererConfig.regions.body;
                        return i.default.createElement(o.VRenderer, {
                            key: t.$$id,
                            plugin: l.plugin,
                            renderer: l.renderer,
                            $schema: "",
                            hostId: l.id,
                            memberIndex: a,
                            name: "列" + (a + 1),
                            id: t.$$id,
                            draggable: !1,
                            schemaPath: l.schemaPath + "/tabs/" + a,
                            wrapperResolve: r.vWrapperResolve,
                            path: this.props.$path + "/" + a,
                            data: this.props.data
                        }, s ? i.default.createElement(c.RegionWrapper, {
                            key: s.key,
                            preferTag: s.preferTag,
                            name: s.key,
                            label: s.label,
                            regionConfig: s,
                            editorStore: r.manager.store,
                            manager: r.manager,
                            children: n,
                            wrapperResolve: s.wrapperResolve,
                            rendererName: l.renderer.name
                        }) : n)
                    }
                    return n
                }
            },
            t
        }
        return n.__extends(t, e),
        t.prototype.addControl = function(e, t) {
            this.manager.showInsertPanel(e, t)
        }
        ,
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(d.BasePlugin);
    t.HBoxControlPlugin = u,
    s.registerEditorPlugin(u)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.HiddenControlPlugin = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "hidden-control",
            t.$schema = "https://isuda.baidu.com/schemas/HiddenControlSchema.json",
            t.name = "隐藏域",
            t.description = "隐藏表单项",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/hidden",
            t.tags = ["表单项", "功能"],
            t.scaffold = {
                type: "hidden",
                name: "var1"
            },
            t.previewSchema = {
                type: "tpl",
                tpl: "隐藏域"
            },
            t.panelTitle = "隐藏域",
            t.panelControls = [{
                type: "text",
                name: "value",
                label: "默认值"
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t.prototype.renderRenderer = function(e) {
            return l.default.createElement("div", {
                key: e.key,
                className: "wrapper-sm b-a b-light m-b-sm"
            }, l.default.createElement("span", {
                className: "text-muted"
            }, "功能组件（隐藏字段）"))
        }
        ,
        t
    }(a(2).BasePlugin);
    t.HiddenControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ImageControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "image-control",
            t.$schema = "https://isuda.baidu.com/schemas/ImageControlSchema.json",
            t.name = "图片上传",
            t.description = "可以对图片实现裁剪，限制图片的宽高以及大小，支持自动上传及上传多张图片",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/image",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "image",
                label: "图片上传",
                name: "image",
                imageClassName: "r w-full"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "图片上传",
            t.panelControls = [l.getSchemaTpl("switchDefaultValue"), {
                type: "text",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"'
            }, l.getSchemaTpl("multiple", {
                value: !1
            }), l.getSchemaTpl("joinValues"), l.getSchemaTpl("delimiter"), l.getSchemaTpl("extractValue"), {
                name: "maxSize",
                type: "number",
                label: "图片最大体积",
                description: "超出大小不允许上传，单位字节"
            }, {
                name: "maxLength",
                type: "number",
                label: "图片最大数量",
                visibleOn: "data.multiple",
                description: "超出数量不允许上传"
            }, l.getSchemaTpl("apiString", {
                label: "文件接收接口",
                name: "reciever",
                description: "文件接收接口，默认不填则上传到 hiphoto",
                value: "/api/upload"
            }), {
                type: "text",
                value: ".jpeg, .jpg, .png, .gif",
                name: "accept",
                label: "图片类型",
                description: "请填入图片的后缀或 <code>MimeType</code>，多个类型用<code>,</code>隔开。"
            }, {
                type: "switch",
                name: "hideUploadButton",
                value: !1,
                label: "隐藏上传按钮",
                mode: "inline",
                className: "w-full"
            }, {
                type: "switch",
                name: "autoUpload",
                value: !1,
                label: "自动上传",
                mode: "inline",
                className: "w-full"
            }, {
                name: "compress",
                type: "switch",
                label: "开启压缩",
                value: !0,
                mode: "inline",
                className: "w-full",
                description: "由 hiphoto 实现，自定义接口将无效。"
            }, {
                type: "combo",
                name: "compressOptions",
                multiLine: !0,
                label: "压缩配置",
                visibleOn: "data.compress",
                controls: [{
                    type: "number",
                    label: "最大宽度",
                    name: "maxWidth"
                }, {
                    type: "number",
                    label: "最大高度",
                    name: "maxHeight"
                }]
            }, {
                name: "showCompressOptions",
                type: "switch",
                label: "是否显示压缩选项",
                mode: "inline",
                className: "w-full"
            }, {
                name: "crop",
                type: "switch",
                label: "是否开启裁剪",
                mode: "inline",
                className: "w-full",
                pipeIn: function(e) {
                    return !!e
                }
            }, {
                name: "crop.aspectRatio",
                type: "text",
                label: "裁剪比率",
                visibleOn: "data.crop",
                pipeOut: l.valuePipeOut
            }, {
                name: "crop.rotatable",
                type: "switch",
                label: "裁剪时是否可旋转",
                visibleOn: "data.crop",
                pipeOut: l.valuePipeOut
            }, {
                name: "crop.scalable",
                type: "switch",
                label: "裁剪时否可缩放",
                visibleOn: "data.crop",
                pipeOut: l.valuePipeOut
            }, {
                name: "crop.viewMode",
                type: "select",
                label: "裁剪区域限制",
                value: 1,
                options: [{
                    label: "无限制",
                    value: 0
                }, {
                    label: "绘图区域",
                    value: 1
                }],
                visibleOn: "data.crop",
                pipeOut: l.valuePipeOut
            }, {
                type: "fieldSet",
                title: "图片限制",
                collapsed: !0,
                collapsable: !0,
                className: "fieldset",
                controls: [{
                    type: "number",
                    name: "limit.width",
                    label: "限制宽度"
                }, {
                    type: "number",
                    name: "limit.height",
                    label: "限制高度"
                }, {
                    type: "number",
                    name: "limit.maxWidth",
                    label: "限制最大宽度"
                }, {
                    type: "number",
                    name: "limit.maxHeight",
                    label: "限制最大高度"
                }, {
                    type: "number",
                    name: "limit.minWidth",
                    label: "限制最小宽度"
                }, {
                    type: "number",
                    name: "limit.minHeight",
                    label: "限制最小高度"
                }, {
                    type: "number",
                    name: "limit.aspectRatio",
                    label: "限制宽高比率"
                }, {
                    type: "text",
                    name: "limit.限制最小高度",
                    label: "宽高比描述",
                    description: "当宽高比没有满足条件时，此描述将作为提示信息显示"
                }]
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.ImageControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.InputGroupControlPlugin = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(5)
      , r = a(3)
      , o = a(1)
      , s = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "input-group-control",
            t.$schema = "https://isuda.baidu.com/schemas/InputGroupControlSchema.json",
            t.name = "InputGroup",
            t.description = "输入组合，支持多种类型的控件组合",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/input-group",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "input-group",
                name: "input-group",
                label: "input 组合",
                controls: [{
                    type: "text",
                    placeholder: "搜索作业ID/名称",
                    inputClassName: "b-r-none p-r-none",
                    name: "input-group"
                }, {
                    type: "submit",
                    label: "提交",
                    level: "primary"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "Input 组合",
            t.panelControls = [[{
                name: "controls",
                type: "combo",
                multiple: !0,
                addable: !1,
                draggable: !0,
                draggableTip: "可排序、可移除、如要编辑请在预览区选中编辑",
                editable: !1,
                visibleOn: "this.controls && this.controls.length",
                controls: [{
                    type: "tpl",
                    inline: !1,
                    className: "p-t-xs",
                    tpl: '<%= data.label %><% if (data.icon) { %><i class="<%= data.icon %>"/><% }%>'
                }]
            }, {
                children: l.default.createElement(i.Button, {
                    className: "m-b",
                    onClick: function() {
                        return t.manager.showInsertPanel("controls")
                    },
                    level: "danger",
                    tooltip: "插入一个新的元素",
                    size: "sm",
                    block: !0
                }, "新增元素")
            }, r.getSchemaTpl("formItemName", {
                required: !0
            })]],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.InputGroupControlPlugin = s,
    o.registerEditorPlugin(s)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = n.__importDefault(a(9))
      , s = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.panelTitle = "表单项",
            t.panelControlsCreator = function(e) {
                var t = ~["button", "submit", "reset"].indexOf(e.schema.type)
                  , a = ~["button-toobar", "container", "fieldSet", "group", "grid", "hbox", "input-group", "panel", "service", "tabs", "table"].indexOf(e.schema.type)
                  , n = e.info.renderer;
                return [r.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [t ? null : r.getSchemaTpl("formItemName", {
                        required: !a
                    }), !1 !== n.renderLabel ? r.getSchemaTpl("label") : null, {
                        type: "switch",
                        name: "readOnly",
                        label: "只读模式",
                        mode: "inline",
                        className: "w-full"
                    }, r.getSchemaTpl("required"), r.getSchemaTpl("description"), r.getSchemaTpl("placeholder"), r.getSchemaTpl("remark"), !1 !== n.renderLabel ? r.getSchemaTpl("labelRemark") : null]
                }, {
                    title: "外观",
                    controls: [r.getSchemaTpl("formItemMode"), r.getSchemaTpl("horizontalMode"), r.getSchemaTpl("horizontal", {
                        label: "",
                        visibleOn: 'data.mode == "horizontal" && data.label !== false && data.horizontal'
                    }), !1 !== n.sizeMutable ? r.getSchemaTpl("formItemSize") : null, r.getSchemaTpl("formItemInline"), r.getSchemaTpl("className"), r.getSchemaTpl("className", {
                        label: "Label CSS 类名",
                        name: "labelClassName"
                    }), r.getSchemaTpl("className", {
                        label: "控件 CSS 类名",
                        name: "inputClassName"
                    }), r.getSchemaTpl("className", {
                        label: "描述 CSS 类名",
                        name: "descriptionClassName",
                        visibleOn: "this.description"
                    })]
                }, {
                    title: "显隐",
                    controls: [r.getSchemaTpl("disabled"), r.getSchemaTpl("visible")]
                }, {
                    title: "验证",
                    controls: [r.getSchemaTpl("validations"), r.getSchemaTpl("validationErrors"), r.getSchemaTpl("validateOnChange"), r.getSchemaTpl("submitOnChange")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.buildEditorPanel = function(e, t) {
            var a = e.info.renderer;
            !e.info.hostId && (null == a ? void 0 : a.isFormItem) && t.push({
                key: "form-item",
                icon: "fa fa-desktop",
                title: this.panelTitle,
                render: this.manager.makeSchemaFormRender({
                    controls: this.panelControlsCreator(e)
                }),
                order: -200
            })
        }
        ,
        t.prototype.onDndAccept = function(e) {
            var t = e.context
              , a = this.manager.store;
            if ("schema" === t.sourceType) {
                var n = a.getNodeById(t.sourceId);
                "controls" !== (null == n ? void 0 : n.parentRegion) || "controls" === t.targetRegion || ~["button", "reset", "submit"].indexOf(t.data.type) || e.preventDefault()
            }
        }
        ,
        t.prototype.afterUpdate = function(e) {
            var t, a, n = e.context;
            if (/\-control$/.test(n.info.renderer.name) && (null === (t = n.diff) || void 0 === t ? void 0 : t.some((function(e) {
                var t;
                return "value" === (null === (t = e.path) || void 0 === t ? void 0 : t.join("."))
            }
            )))) {
                var l = o.default(n.diff, (function(e) {
                    var t;
                    return "value" === (null === (t = e.path) || void 0 === t ? void 0 : t.join("."))
                }
                ))
                  , i = null === (a = this.manager.store.getNodeById(n.id)) || void 0 === a ? void 0 : a.getComponent();
                null == i || i.props.onChange(null == l ? void 0 : l.rhs)
            }
        }
        ,
        t.prototype.beforeReplace = function(e) {
            var t = e.context;
            t.info.renderer.isFormItem && t.data && t.subRenderer && !~t.subRenderer.tags.indexOf("表单项") && ~t.subRenderer.tags.indexOf("展示") && (t.data.type = "static-" + t.data.type,
            t.data.label = t.data.label || t.schema.label,
            t.data.name = t.data.name || t.schema.name)
        }
        ,
        t
    }(i.BasePlugin);
    t.ControlPlugin = s,
    l.registerEditorPlugin(s)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ListControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "list-control",
            t.$schema = "https://isuda.baidu.com/schemas/ListControlSchema.json",
            t.order = -430,
            t.name = "列表选择",
            t.description = "单选或者多选，支持<code>source</code>拉取选项，选项可配置图片，也可以自定义<code>HTML</code>配置",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/list",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "list",
                label: "列表",
                name: "list",
                options: [{
                    label: "选项A",
                    value: "A"
                }, {
                    label: "选项B",
                    value: "B"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "列表选择",
            t.panelControls = [l.getSchemaTpl("switchDefaultValue"), {
                type: "list",
                name: "value",
                label: "默认值",
                description: "请填入选项 Options 中 value 值",
                source: "${options}",
                visibleOn: 'typeof this.value !== "undefined"'
            }, l.getSchemaTpl("fieldSet", {
                title: "选项",
                controls: [l.getSchemaTpl("multiple"), l.getSchemaTpl("joinValues"), l.getSchemaTpl("delimiter"), l.getSchemaTpl("extractValue"), l.getSchemaTpl("options"), l.getSchemaTpl("source")]
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.ListControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.MatrixControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "matrix-control",
            t.$schema = "https://isuda.baidu.com/schemas/MatrixControlSchema.json",
            t.name = "矩阵开关",
            t.description = "可配置行单选，列单选，以及全部选项只能单选或者全部选项多选",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/matrrix",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "matrix",
                name: "matrix",
                label: "矩阵开关",
                rowLabel: "行标题说明",
                columns: [{
                    label: "列1"
                }, {
                    label: "列2"
                }],
                rows: [{
                    label: "行1"
                }, {
                    label: "行2"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "矩阵开关",
            t.panelControls = [l.getSchemaTpl("api", {
                name: "source",
                label: "获取矩阵数据接口"
            }), l.getSchemaTpl("multiple", {
                value: !0
            }), {
                type: "button-group",
                name: "singleSelectMode",
                label: "单选模式",
                description: "行级、列级或者单个单元单选",
                size: "xs",
                mode: "inline",
                className: "w-full",
                visibleOn: "!this.multiple",
                options: [{
                    label: "行级",
                    value: "row"
                }, {
                    label: "列级",
                    value: "column"
                }, {
                    label: "单个单元",
                    value: "cell"
                }],
                pipeIn: l.defaultValue("column")
            }, l.getSchemaTpl("fieldSet", {
                title: "矩阵配置",
                controls: [{
                    label: "列配置",
                    name: "columns",
                    type: "combo",
                    multiple: !0,
                    addButtonText: "添加一列",
                    scaffold: {
                        label: "列说明"
                    },
                    controls: [{
                        type: "text",
                        name: "label",
                        placeholder: "列说明"
                    }]
                }, {
                    name: "rowLabel",
                    label: "行标题文字",
                    type: "text"
                }, {
                    label: "行配置",
                    name: "rows",
                    type: "combo",
                    multiple: !0,
                    scaffold: {
                        label: "行说明"
                    },
                    addButtonText: "添加一行",
                    controls: [{
                        type: "text",
                        name: "label",
                        placeholder: "行说明"
                    }]
                }]
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.MatrixControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.NestedSelectControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "nested-select-control",
            t.$schema = "https://isuda.baidu.com/schemas/NestedSelectControlSchema.json",
            t.name = "嵌套下拉框",
            t.description = "适用于选项中含有子项，可通过<code>source</code>拉取选项，支持多选",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/nested-select",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "nested-select",
                label: "嵌套下拉框",
                name: "nestedSelect",
                options: [{
                    label: "选项A",
                    value: "A"
                }, {
                    label: "选项B",
                    value: "B",
                    children: [{
                        label: "选项C",
                        value: "C"
                    }, {
                        label: "选项D",
                        value: "D"
                    }]
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "嵌套下拉",
            t.panelDefinitions = {
                options: {
                    label: "选项 Options",
                    name: "options",
                    type: "combo",
                    multiple: !0,
                    multiLine: !0,
                    draggable: !0,
                    addButtonText: "新增选项",
                    scaffold: {
                        label: "",
                        value: ""
                    },
                    controls: [{
                        type: "group",
                        controls: [{
                            type: "text",
                            name: "label",
                            placeholder: "名称",
                            required: !0
                        }, {
                            type: "text",
                            name: "value",
                            placeholder: "值",
                            unique: !0
                        }]
                    }, {
                        $ref: "options",
                        label: "子选项",
                        name: "children",
                        addButtonText: "新增子选项"
                    }]
                }
            },
            t.panelControls = [l.getSchemaTpl("switchDefaultValue"), {
                type: "text",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"'
            }, {
                type: "switch",
                name: "searchable",
                label: "可否检索"
            }, {
                type: "switch",
                name: "withChildren",
                label: "选中父节点时包含子节点的值"
            }, l.getSchemaTpl("fieldSet", {
                title: "选项",
                controls: [{
                    $ref: "options",
                    name: "options"
                }, l.getSchemaTpl("api", {
                    name: "source",
                    label: "获取选项接口"
                }), l.getSchemaTpl("multiple"), l.getSchemaTpl("joinValues"), l.getSchemaTpl("delimiter"), l.getSchemaTpl("extractValue")]
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.NestedSelectControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.NumberControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "number-control",
            t.$schema = "https://isuda.baidu.com/schemas/NumberControlSchema.json",
            t.order = -410,
            t.name = "数字框",
            t.description = "支持设定最大值和最小值，以及步长与精度",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/number",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "number",
                label: "数字",
                name: "text"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "数字框",
            t.panelControls = [r.getSchemaTpl("switchDefaultValue"), {
                type: "number",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"'
            }, {
                type: "text",
                name: "min",
                label: "最小值",
                description: "请输入数字或使用 <code>\\${xxx}</code> 来获取变量，否则该配置不生效"
            }, {
                type: "text",
                name: "max",
                label: "最大值",
                description: "请输入数字或使用 <code>\\${xxx}</code> 来获取变量，否则该配置不生效"
            }, {
                type: "number",
                name: "step",
                label: "步长"
            }, {
                type: "number",
                name: "precision",
                label: "小数点精度",
                min: 0,
                max: 100
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(i.BasePlugin);
    t.NumberControlPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.PanelControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "panel-control",
            t.$schema = "https://isuda.baidu.com/schemas/ContainerControlSchema.json",
            t.regions = [{
                key: "controls",
                label: "子表单项",
                renderMethod: "renderBody",
                preferTag: "表单项",
                matchRegion: function(e, t) {
                    return Array.isArray(t.props.controls)
                },
                optional: !0
            }, {
                key: "body",
                label: "子内容",
                renderMethod: "renderBody",
                matchRegion: function(e, t) {
                    return !Array.isArray(t.props.controls)
                },
                insertPosition: "outter",
                optional: !0
            }, {
                key: "actions",
                label: "按钮组",
                renderMethod: "renderActions",
                preferTag: "按钮"
            }],
            t.name = "面板",
            t.description = "集合多个表单项进行展示，可以配置标题和底部",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/panel",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "panel",
                title: "标题",
                controls: [{
                    label: "文本",
                    type: "text",
                    name: "text"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "容器配置",
            t.panelControls = [{
                label: "标题",
                name: "title",
                type: "text"
            }, {
                label: "内容形式",
                name: "__mode",
                type: "button-group",
                size: "xs",
                description: "如果选择表单，内容默认为表单项，如果选择其他则可以放其他类型渲染器",
                pipeIn: function(e, t) {
                    return Array.isArray(t.body) ? "other" : "form"
                },
                onChange: function(e, t, a, n) {
                    "form" === e ? (n.setValues({
                        controls: n.data.__controls || [{
                            placeholder: "文本1",
                            type: "text",
                            name: "a",
                            label: !1
                        }],
                        __body: n.data.body
                    }),
                    n.deleteValueByName("body")) : (n.setValues({
                        body: n.data.__body || [{
                            type: "tpl",
                            tpl: "内容",
                            inline: !1
                        }],
                        __controls: n.data.controls
                    }),
                    n.deleteValueByName("controls"))
                },
                options: [{
                    label: "表单",
                    value: "form"
                }, {
                    label: "其他",
                    value: "other"
                }]
            }, {
                name: "className",
                label: "样式",
                type: "button-group",
                size: "sm",
                pipeIn: function(e) {
                    return "string" == typeof e && /(?:^|\s)(Panel\-\-(\w+))(?:$|\s)/.test(e) ? RegExp.$1 : ""
                },
                pipeOut: function(e, t) {
                    return t ? (t.replace(/(?:^|\s)(Panel\-\-(\w+))(?=($|\s))/g, "") + " " + e).replace(/\s+/g, " ").trim() : e
                },
                options: [{
                    label: "默认",
                    value: "Panel--default"
                }, {
                    label: "主色",
                    value: "Panel--primary"
                }, {
                    label: "提示",
                    value: "Panel--info"
                }, {
                    label: "成功",
                    value: "Panel--success"
                }, {
                    label: "警告",
                    value: "Panel--warning"
                }, {
                    label: "危险",
                    value: "Panel--danger"
                }]
            }, l.getSchemaTpl("className", {
                name: "headerClassName",
                label: "头部区域 CSS 类名"
            }), l.getSchemaTpl("className", {
                name: "bodyClassName",
                label: "内容区域 CSS 类名"
            }), l.getSchemaTpl("className", {
                name: "footerClassName",
                label: "底部区域 CSS 类名"
            }), l.getSchemaTpl("className", {
                name: "actionsClassName",
                label: "按钮外层 CSS 类名"
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.PanelControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.PasswordControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "password-control",
            t.$schema = "https://isuda.baidu.com/schemas/TextControlSchema.json",
            t.name = "密码框",
            t.description = "验证输入是否符合邮箱的格式",
            t.scaffold = {
                type: "password",
                label: "密码",
                name: "password"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: n.__assign({}, t.scaffold)
            },
            t.panelTitle = t.name,
            t
        }
        return n.__extends(t, e),
        t
    }(a(20).TextControlPlugin);
    t.PasswordControlPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.PickerControlPlugin = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(5)
      , r = a(3)
      , o = a(1)
      , s = a(2)
      , d = a(6)
      , c = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "picker-control",
            t.$schema = "https://isuda.baidu.com/schemas/PickerControlSchema.json",
            t.name = "列表选取",
            t.description = "通过<code>pickerSchema</code>配置可供选取的数据源进行选择需要的数据，支持多选",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/picker",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "picker",
                label: "列表选取",
                name: "picker",
                options: [{
                    label: "选项A",
                    value: "A"
                }, {
                    label: "选项B",
                    value: "B"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "列表选取",
            t.panelControlsCreator = function(e) {
                return [{
                    type: "switch",
                    name: "embed",
                    mode: "inline",
                    className: "w-full",
                    label: "开启内嵌模式"
                }, r.getSchemaTpl("switchDefaultValue"), {
                    type: "text",
                    name: "value",
                    label: "默认值",
                    visibleOn: 'typeof this.value !== "undefined"'
                }, r.getSchemaTpl("fieldSet", {
                    title: "选项",
                    controls: [r.getSchemaTpl("options"), r.getSchemaTpl("api", {
                        name: "source",
                        label: "获取选项接口"
                    }), {
                        children: l.default.createElement(i.Button, {
                            size: "sm",
                            level: "danger",
                            className: "m-b",
                            onClick: t.editDetail.bind(t, e.id),
                            block: !0
                        }, "配置选框详情")
                    }, {
                        label: "labelTpl",
                        type: "textarea",
                        name: "labelTpl",
                        labelRemark: "已选定数据的展示样式",
                        description: '支持使用 <code>\\${xxx}</code> 来获取变量，或者用 lodash.template 语法来写模板逻辑。<a target="_blank" href="/docs/renderers/Tpl">详情</a>'
                    }, {
                        type: "button-group",
                        name: "modalMode",
                        label: "选框类型",
                        value: "dialog",
                        size: "xs",
                        options: [{
                            label: "弹框",
                            value: "dialog"
                        }, {
                            label: "抽出式弹框",
                            value: "drawer"
                        }]
                    }, r.getSchemaTpl("multiple"), r.getSchemaTpl("joinValues"), r.getSchemaTpl("delimiter"), r.getSchemaTpl("extractValue")]
                })]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t.prototype.buildEditorToolbar = function(e, t) {
            var a = e.id;
            e.info.renderer.name === this.rendererName && t.push({
                icon: "fa fa-expand",
                order: 100,
                tooltip: "配置选框详情",
                onClick: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.buildEditorContextMenu = function(e, t) {
            var a = e.id;
            e.schema,
            e.region;
            e.info.renderer.name === this.rendererName && t.push("|", {
                label: "配置选框详情",
                onSelect: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.editDetail = function(e) {
            var t = this.manager
              , a = t.store
              , l = a.getNodeById(e)
              , i = a.getValueOf(e);
            if (l && i) {
                var r = l.getComponent()
                  , o = n.__assign(n.__assign({
                    type: "crud",
                    mode: "list"
                }, i.pickerSchema || {
                    listItem: {
                        title: "${label}"
                    }
                }), {
                    api: i.source,
                    pickerMode: !0,
                    multiple: i.multiple
                });
                this.manager.openSubEditor({
                    title: "配置选框详情",
                    value: o,
                    data: {
                        options: r.props.options
                    },
                    onChange: function(e) {
                        delete (e = n.__assign(n.__assign({}, i), {
                            pickerSchema: n.__assign({}, e),
                            source: e.api
                        })).pickerSchema.api,
                        delete e.pickerSchema.type,
                        delete e.pickerSchema.pickerMode,
                        delete e.pickerSchema.multiple,
                        t.panelChangeValue(e, d.diff(i, e))
                    }
                })
            }
        }
        ,
        t
    }(s.BasePlugin);
    t.PickerControlPlugin = c,
    o.registerEditorPlugin(c)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.QRCodeControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "qr-code-control",
            t.$schema = "https://isuda.baidu.com/schemas/QRCodeControlSchema.json",
            t.name = "二维码",
            t.description = "支持配置宽高，前景色和背景色以及复杂度",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/qrcode",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "qr-code",
                label: "二维码",
                name: "qrcode",
                value: "http://baidu.gitee.io/amis/"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "二维码",
            t.panelControls = [l.getSchemaTpl("switchDefaultValue"), {
                name: "value",
                type: "text",
                label: "二维码默认值",
                description: "支持使用 <code>\\${xxx}</code> 来获取变量",
                visibleOn: 'typeof this.value !== "undefined"'
            }, {
                name: "codeSize",
                type: "number",
                label: "宽高值",
                pipeIn: l.defaultValue(128)
            }, {
                name: "backgroundColor",
                type: "color",
                label: "背景色",
                pipeIn: l.defaultValue("#fff")
            }, {
                name: "foregroundColor",
                type: "color",
                label: "前景色",
                pipeIn: l.defaultValue("#000")
            }, {
                name: "level",
                type: "select",
                label: "复杂度",
                pipeIn: l.defaultValue("L"),
                options: [{
                    label: "L",
                    value: "L"
                }, {
                    label: "M",
                    value: "M"
                }, {
                    label: "Q",
                    value: "Q"
                }, {
                    label: "H",
                    value: "H"
                }]
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.QRCodeControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.RadiosControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "radios-control",
            t.$schema = "https://isuda.baidu.com/schemas/RadiosControlSchema.json",
            t.order = -460,
            t.name = "单选框",
            t.description = "通过<code>options</code>配置选项，可通过<code>source</code>拉取选项",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/radios",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "radios",
                label: "单选框",
                name: "radios",
                options: [{
                    label: "选项A",
                    value: "A"
                }, {
                    label: "选项B",
                    value: "B"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "单选框",
            t.panelControls = [l.getSchemaTpl("switchDefaultValue"), {
                type: "radios",
                name: "value",
                label: "默认值",
                source: "${options}",
                visibleOn: 'typeof this.value !== "undefined"',
                multiple: !0
            }, l.getSchemaTpl("fieldSet", {
                title: "选项",
                controls: [l.getSchemaTpl("options"), l.getSchemaTpl("source"), l.getSchemaTpl("joinValues", {
                    visibleOn: !0
                }), l.getSchemaTpl("extractValue")]
            }), l.getSchemaTpl("fieldSet", {
                title: "外观",
                controls: [{
                    label: "每行显示多少列",
                    name: "columnsCount",
                    hiddenOn: "data.inline === true",
                    type: "range",
                    min: 1,
                    max: 6,
                    pipeIn: l.defaultValue(1)
                }, l.getSchemaTpl("className", {
                    label: "单个 Radio 的 CSS 类名",
                    name: "itemClassName"
                })]
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.RadiosControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.RangeControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "range-control",
            t.$schema = "https://isuda.baidu.com/schemas/RangeControlSchema.json",
            t.name = "滑块",
            t.description = "选择某个值或者某个范围",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/range",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "range",
                label: "滑块",
                name: "range"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "滑块",
            t.panelControls = [l.getSchemaTpl("switchDefaultValue"), {
                type: "number",
                name: "value",
                label: "默认值",
                validations: "isNumeric",
                visibleOn: 'typeof data.value !== "undefined" && !data.multiple',
                pipeIn: function(e) {
                    return "number" == typeof e ? e : 0
                },
                pipeOut: function(e, t, a) {
                    return e < a.min && a.min || e > a.max && a.max || e
                }
            }, {
                type: "combo",
                name: "value",
                visibleOn: 'typeof data.value !== "undefined" && this.multiple',
                controls: [{
                    type: "number",
                    validations: "isNumeric",
                    name: "min",
                    label: "小值"
                }, {
                    type: "number",
                    validations: "isNumeric",
                    name: "max",
                    label: "大值"
                }]
            }, {
                label: "最小值",
                name: "min",
                type: "number",
                value: 0
            }, {
                label: "最大值",
                name: "max",
                type: "number",
                value: 100
            }, {
                label: "步长",
                name: "step",
                type: "number",
                value: 1
            }, {
                type: "text",
                name: "unit",
                label: "单位",
                value: ""
            }, {
                type: "switch",
                name: "showInput",
                mode: "inline",
                label: "是否显示输入框",
                value: !1
            }, l.getSchemaTpl("clearable"), l.getSchemaTpl("multiple", {
                pipeIn: l.defaultValue(!1)
            }), l.getSchemaTpl("joinValues"), l.getSchemaTpl("delimiter")],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.RangeControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.RangeControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "rating-control",
            t.$schema = "https://isuda.baidu.com/schemas/RatingControlSchema.json",
            t.name = "评分",
            t.description = "支持只读、半星选择",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/range",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "rating",
                label: "评分",
                name: "rating"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "评分",
            t.panelControls = [l.getSchemaTpl("switchDefaultValue"), {
                type: "number",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"'
            }, {
                label: "最大值",
                name: "count",
                type: "number",
                value: 5
            }, {
                type: "switch",
                name: "half",
                mode: "inline",
                className: "w-full",
                label: "允许半星",
                value: !1
            }, l.getSchemaTpl("className", {
                label: "描述 CSS 类名",
                name: "descriptionClassName",
                visibleOn: "data.description"
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.RangeControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.RepeatControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "repeat-control",
            t.$schema = "https://isuda.baidu.com/schemas/RepeatControlSchema.json",
            t.name = "重复周期选择器",
            t.description = "选择重复的频率，如每时、每天、每周等",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/repeat",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "repeat",
                label: "周期",
                name: "repeat"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "周期",
            t.panelControls = [l.getSchemaTpl("switchDefaultValue"), {
                type: "text",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"'
            }, {
                name: "options",
                type: "select",
                label: "启用单位",
                options: "secondly,minutely,hourly,daily,weekdays,weekly,monthly,yearly".split(","),
                value: "hourly,daily,weekly,monthly",
                multiple: !0
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.RepeatControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ResetControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "reset-control",
            t.name = "重置",
            t.panelTitle = "重置",
            t
        }
        return n.__extends(t, e),
        t
    }(a(24).ButtonControlPlugin);
    t.ResetControlPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.RichTextControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "rich-text-control",
            t.$schema = "https://isuda.baidu.com/schemas/RichTextControlSchema.json",
            t.name = "富文本编辑器",
            t.description = "可自定义富文本的配置栏",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/rich-text",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "rich-text",
                label: "富文本",
                name: "rich-text"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "富文本",
            t.panelControls = [l.getSchemaTpl("switchDefaultValue"), {
                type: "textarea",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"'
            }, l.getSchemaTpl("api", {
                name: "reciever",
                label: "文件接收接口",
                value: "/api/upload/image"
            }), {
                type: "select",
                name: "vendor",
                label: "编辑器类型",
                value: "tinymce",
                options: ["tinymce", "froala"]
            }, l.getSchemaTpl("fieldSet", {
                title: "froala 设置项",
                visibleOn: 'data.vendor === "froala"',
                controls: [{
                    type: "combo",
                    name: "options",
                    noBorder: !0,
                    multiLine: !0,
                    controls: [{
                        type: "select",
                        name: "language",
                        label: "语言",
                        labelRemark: "鼠标覆盖配置栏中配置时显示的提示语言",
                        defaultValue: "zh_cn",
                        options: [{
                            label: "中文",
                            value: "zh_cn"
                        }, {
                            label: "英文",
                            value: "en_us"
                        }]
                    }, {
                        type: "textarea",
                        name: "toolbarButtons",
                        label: "大屏时展示的配置项",
                        labelRemark: "屏幕宽度 ≥ 1200px",
                        description: '使用空格分开配置，使用<code>|</code>可将配置栏分组，<a target="_blank" href="https://www.froala.com/wysiwyg-editor/docs/options">参考文档</a>',
                        minRows: 5,
                        value: ["paragraphFormat", "quote", "color", "|", "bold", "italic", "underline", "strikeThrough", "|", "formatOL", "formatUL", "align", "|", "insertLink", "insertImage", "insertEmotion", "insertTable", "|", "undo", "redo", "html"],
                        pipeIn: function(e) {
                            return Array.isArray(e) ? e.join(" ") : ""
                        },
                        pipeOut: function(e) {
                            return e.replace(/\s+/g, " ").split(" ")
                        }
                    }, {
                        type: "textarea",
                        name: "toolbarButtonsMD",
                        label: "中屏时展示的配置项",
                        labelRemark: "屏幕宽度 ≥ 992px",
                        description: '使用空格分开配置，使用<code>|</code>可将配置栏分组，<a target="_blank" href="https://www.froala.com/wysiwyg-editor/docs/options">参考文档</a>',
                        minRows: 5,
                        pipeIn: function(e) {
                            return Array.isArray(e) ? e.join(" ") : ""
                        },
                        pipeOut: function(e) {
                            return e.replace(/\s+/g, " ").split(" ")
                        }
                    }, {
                        type: "textarea",
                        name: "toolbarButtonsSM",
                        label: "小屏时展示的配置项",
                        labelRemark: "屏幕宽度 ≥ 768px",
                        description: '使用空格分开配置，使用<code>|</code>可将配置栏分组，<a target="_blank" href="https://www.froala.com/wysiwyg-editor/docs/options">参考文档</a>',
                        minRows: 5,
                        pipeIn: function(e) {
                            return Array.isArray(e) ? e.join(" ") : ""
                        },
                        pipeOut: function(e) {
                            return e.replace(/\s+/g, " ").split(" ")
                        }
                    }]
                }]
            }), l.getSchemaTpl("fieldSet", {
                title: "tinymce 设置项",
                visibleOn: 'data.vendor === "tinymce"',
                controls: [{
                    type: "combo",
                    name: "options",
                    noBorder: !0,
                    multiLine: !0,
                    controls: [{
                        type: "switch",
                        label: "是否显示菜单栏",
                        value: "true",
                        name: "menubar"
                    }, {
                        type: "number",
                        label: "高度",
                        min: 0,
                        value: 400,
                        name: "height"
                    }, {
                        type: "textarea",
                        name: "plugins",
                        label: "启用的插件",
                        description: '使用空格分开配置，<a target="_blank" href="https://www.tiny.cloud/docs/general-configuration-guide/basic-setup/">参考文档</a>',
                        value: "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking table emoticons template paste help"
                    }, {
                        type: "textarea",
                        name: "toolbar",
                        label: "工具栏",
                        value: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons | help"
                    }]
                }]
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.RichTextControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.SelectControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "select-control",
            t.$schema = "https://isuda.baidu.com/schemas/SelectControlSchema.json",
            t.order = -480,
            t.name = "下拉框",
            t.description = "支持多选，输入提示，可使用<code>source</code>获取选项",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/select",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "select",
                label: "选项",
                name: "select",
                options: [{
                    label: "选项A",
                    value: "A"
                }, {
                    label: "选项B",
                    value: "B"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "下拉框",
            t.panelControls = [l.getSchemaTpl("switchDefaultValue"), {
                type: "select",
                name: "value",
                label: "默认值",
                source: "${options}",
                visibleOn: '!data.multiple && typeof this.value !== "undefined"'
            }, {
                type: "select",
                name: "value",
                label: "默认值",
                source: "${options}",
                multiple: !0,
                visibleOn: ' data.multiple && typeof this.value !== "undefined"'
            }, l.getSchemaTpl("clearable"), {
                label: "可检索",
                name: "searchable",
                type: "switch",
                mode: "inline",
                className: "w-full"
            }, {
                label: "是可创建",
                name: "creatable",
                type: "switch",
                mode: "inline",
                className: "w-full"
            }, l.getSchemaTpl("fieldSet", {
                title: "选项",
                controls: [l.getSchemaTpl("multiple"), {
                    label: "可全选",
                    name: "checkAll",
                    type: "switch",
                    mode: "inline",
                    value: !1,
                    className: "w-full"
                }, {
                    label: "默认全选",
                    name: "defaultCheckAll",
                    type: "switch",
                    value: !1,
                    visibleOn: "this.checkAll",
                    mode: "inline",
                    className: "w-full"
                }, {
                    type: "text",
                    name: "checkAllLabel",
                    label: '默认为 "全选" 的文字',
                    visibleOn: "this.checkAll",
                    value: "全选"
                }, l.getSchemaTpl("options"), l.getSchemaTpl("source"), l.getSchemaTpl("api", {
                    name: "autoComplete",
                    label: "自动完成接口",
                    description: "每次输入新内容后，将调用接口，根据接口返回更新选项。当前用户输入值在 <code>\\${term}</code> 中。"
                }), l.getSchemaTpl("joinValues"), l.getSchemaTpl("delimiter"), l.getSchemaTpl("extractValue")]
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.SelectControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ServiceControlPlugin = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(5)
      , r = a(3)
      , o = a(1)
      , s = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "service-control",
            t.$schema = "https://isuda.baidu.com/schemas/ServiceControlSchema.json",
            t.order = -199,
            t.name = "服务(Service)",
            t.description = "功能型容器，自身不负责展示内容，主要职责在于通过配置的 <code>api</code> 拉取数据，数据可用于子组件。通过<code>schemaApi</code>拉取远程<code>schema</code>渲染在当前页面",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/service",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "service",
                controls: [{
                    type: "text",
                    label: "文本",
                    name: "text"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.regions = [{
                key: "controls",
                label: "子表单项",
                renderMethod: "renderBody",
                preferTag: "表单项",
                matchRegion: function(e, t) {
                    return Array.isArray(t.props.controls)
                },
                optional: !0
            }, {
                key: "body",
                label: "子内容",
                renderMethod: "renderBody",
                matchRegion: function(e, t) {
                    return !Array.isArray(t.props.controls)
                },
                insertPosition: "outter",
                optional: !0
            }],
            t.panelTitle = "服务",
            t.panelControlsCreator = function(e) {
                return [{
                    label: "内容形式",
                    name: "__mode",
                    type: "button-group",
                    size: "xs",
                    description: "如果选择表单，内容默认为表单项，如果选择其他则可以放其他类型渲染器",
                    pipeIn: function(e, t) {
                        return Array.isArray(t.body) ? "other" : "form"
                    },
                    onChange: function(e, t, a, n) {
                        "form" === e ? (n.setValues({
                            controls: n.data.__controls || [{
                                placeholder: "文本1",
                                type: "text",
                                name: "a",
                                label: !1
                            }],
                            __body: n.data.body
                        }),
                        n.deleteValueByName("body")) : (n.setValues({
                            body: n.data.__body || [{
                                type: "tpl",
                                tpl: "内容",
                                inline: !1
                            }],
                            __controls: n.data.controls
                        }),
                        n.deleteValueByName("controls"))
                    },
                    options: [{
                        label: "表单",
                        value: "form"
                    }, {
                        label: "其他",
                        value: "other"
                    }]
                }, {
                    children: function(a) {
                        var n = a.data;
                        return l.default.createElement(i.Button, {
                            size: "sm",
                            level: "info",
                            className: "m-b",
                            block: !0,
                            onClick: function() {
                                t.manager.showInsertPanel(Array.isArray(n.controls) ? "controls" : "body", e.id)
                            }
                        }, "新增内容")
                    }
                }, {
                    type: "divider"
                }, r.getSchemaTpl("api", {
                    label: "数据接口"
                }), r.getSchemaTpl("initFetch"), {
                    name: "interval",
                    label: "定时刷新间隔",
                    visibleOn: "this.api",
                    type: "number",
                    step: 500,
                    description: "设置后将自动定时刷新，单位 ms"
                }, {
                    name: "silentPolling",
                    label: "静默加载",
                    mode: "inline",
                    className: "block",
                    type: "switch",
                    visibleOn: "!!data.interval",
                    description: "设置自动定时刷新是否显示加载动画"
                }, {
                    name: "stopAutoRefreshWhen",
                    label: "停止定时刷新检测",
                    type: "text",
                    visibleOn: "!!data.interval",
                    description: "定时刷新一旦设置会一直刷新，除非给出表达式，条件满足后则不刷新了。"
                }, {
                    type: "divider"
                }, r.getSchemaTpl("api", {
                    name: "schemaApi",
                    label: "内容 Schema 接口"
                }), {
                    type: "divider"
                }, r.getSchemaTpl("initFetch", {
                    name: "initFetchSchema",
                    visibleOn: "data.schemaApi",
                    label: "初始是否拉取内容 Schema 接口"
                }), {
                    label: "默认消息信息",
                    type: "combo",
                    name: "messages",
                    multiLine: !0,
                    description: "设置 service 默认提示信息，当 service 没有返回 msg 信息时有用，如果 service 返回携带了 msg 值，则还是以 service 返回为主",
                    controls: [{
                        label: "获取成功",
                        type: "text",
                        name: "fetchSuccess"
                    }, {
                        label: "获取失败",
                        type: "text",
                        name: "fetchFailed"
                    }]
                }]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.ServiceControlPlugin = s,
    o.registerEditorPlugin(s)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.StaticControlPlugin = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(5)
      , r = a(3)
      , o = a(1)
      , s = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "static-control",
            t.$schema = "https://isuda.baidu.com/schemas/StaticControlSchema.json",
            t.order = -390,
            t.name = "静态展示框",
            t.description = "纯用来展示数据，可用来展示<code>json、date、image、progress</code>等数据",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/static",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "static",
                label: "描述"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign(n.__assign({}, t.scaffold), {
                    value: "静态值"
                })]
            },
            t.multifactor = !0,
            t.panelTitle = "静态展示",
            t.panelControlsCreator = function(e) {
                return [{
                    children: l.default.createElement(i.Button, {
                        size: "sm",
                        level: "info",
                        className: "m-b",
                        block: !0,
                        onClick: t.exchangeRenderer.bind(t, e.id)
                    }, "更改渲染器类型")
                }, r.getSchemaTpl("switchDefaultValue"), {
                    type: "text",
                    name: "value",
                    label: "默认值",
                    visibleOn: 'typeof this.value !== "undefined"'
                }, {
                    name: "quickEdit",
                    label: "启用快速编辑",
                    type: "switch",
                    pipeIn: function(e) {
                        return !!e
                    },
                    mode: "inline",
                    className: "w-full"
                }, {
                    visibleOn: "data.quickEdit",
                    name: "quickEdit.mode",
                    type: "button-group",
                    value: "popOver",
                    label: "快速编辑模式",
                    size: "xs",
                    mode: "inline",
                    className: "w-full",
                    options: [{
                        label: "下拉",
                        value: "popOver"
                    }, {
                        label: "内嵌",
                        value: "inline"
                    }]
                }, {
                    visibleOn: "data.quickEdit",
                    name: "quickEdit.saveImmediately",
                    label: "是否立即保存",
                    type: "switch",
                    mode: "inline",
                    className: "w-full",
                    description: "开启后修改即提交，而不是标记修改批量提交。",
                    descriptionClassName: "help-block m-b-none",
                    pipeIn: function(e) {
                        return !!e
                    }
                }, r.getSchemaTpl("api", {
                    label: "立即保存接口",
                    description: "是否单独给立即保存配置接口，如果不配置，则默认使用quickSaveItemApi。",
                    name: "quickEdit.saveImmediately.api",
                    visibleOn: "this.quickEdit && this.quickEdit.saveImmediately"
                }), {
                    visibleOn: "data.quickEdit",
                    name: "quickEdit",
                    children: function(e) {
                        var a = e.value
                          , r = e.onChange
                          , o = e.data;
                        !0 === a && (a = {});
                        var s = a.mode;
                        return delete (a = n.__assign({
                            type: "text",
                            name: o.name
                        }, a)).mode,
                        l.default.createElement(i.Button, {
                            level: "info",
                            className: "m-b",
                            size: "sm",
                            block: !0,
                            onClick: function() {
                                t.manager.openSubEditor({
                                    title: "配置快速编辑类型",
                                    value: a,
                                    slot: {
                                        type: "form",
                                        mode: "normal",
                                        controls: ["$$"],
                                        wrapWithPanel: !1
                                    },
                                    onChange: function(e) {
                                        return r(n.__assign(n.__assign({}, e), {
                                            mode: s
                                        }))
                                    }
                                })
                            }
                        }, "配置快速编辑")
                    }
                }, {
                    name: "popOver",
                    label: "启用查看更多展示",
                    type: "switch",
                    pipeIn: function(e) {
                        return !!e
                    },
                    mode: "inline",
                    className: "w-full"
                }, {
                    name: "popOver.mode",
                    label: "查看更多弹出模式",
                    type: "select",
                    visibleOn: "data.popOver",
                    pipeIn: r.defaultValue("popOver"),
                    options: [{
                        label: "默认",
                        value: "popOver"
                    }, {
                        label: "弹框",
                        value: "dialog"
                    }, {
                        label: "抽出式弹框",
                        value: "drawer"
                    }]
                }, {
                    name: "popOver.position",
                    label: "查看更多弹出模式",
                    type: "select",
                    visibleOn: 'data.popOver && data.popOver.mode === "popOver"',
                    pipeIn: r.defaultValue("center"),
                    options: [{
                        label: "目标中部",
                        value: "center"
                    }, {
                        label: "目标左上角",
                        value: "left-top"
                    }, {
                        label: "目标右上角",
                        value: "right-top"
                    }, {
                        label: "目标左下角",
                        value: "left-bottom"
                    }, {
                        label: "目标右下角",
                        value: "right-bottom"
                    }, {
                        label: "页面左上角",
                        value: "fixed-left-top"
                    }, {
                        label: "页面右上角",
                        value: "fixed-right-top"
                    }, {
                        label: "页面左下角",
                        value: "fixed-left-bottom"
                    }, {
                        label: "页面右下角",
                        value: "fixed-right-bottom"
                    }]
                }, {
                    visibleOn: "data.popOver",
                    name: "popOver",
                    children: function(e) {
                        var a = e.value
                          , r = e.onChange;
                        return a = n.__assign({
                            type: "panel",
                            title: "查看详情",
                            body: "内容详情"
                        }, a),
                        l.default.createElement(i.Button, {
                            level: "info",
                            className: "m-b",
                            size: "sm",
                            block: !0,
                            onClick: function() {
                                t.manager.openSubEditor({
                                    title: "配置查看更多展示内容",
                                    value: a,
                                    onChange: r
                                })
                            }
                        }, "查看更多内容配置")
                    }
                }, {
                    name: "copyable",
                    label: "启用内容复制功能",
                    type: "switch",
                    pipeIn: function(e) {
                        return !!e
                    },
                    mode: "inline",
                    className: "w-full"
                }, {
                    visibleOn: "data.copyable",
                    name: "copyable.content",
                    type: "textarea",
                    label: "复制内容模板",
                    description: "默认为当前字段值，可定制。"
                }]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.filterProps = function(e, t) {
            return e.$$id = t.id,
            e
        }
        ,
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t.prototype.exchangeRenderer = function(e) {
            this.manager.showReplacePanel(e, "展示")
        }
        ,
        t
    }(a(2).BasePlugin);
    t.StaticControlPlugin = s,
    o.registerEditorPlugin(s)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.SubFormControlPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(6)
      , d = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "form-control",
            t.$schema = "https://isuda.baidu.com/schemas/SubFormControlSchema.json",
            t.name = "子表单项",
            t.description = "SubForm, 配置一个子<code>form</code>作为当前的表单项",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/subform",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "form",
                name: "subform",
                label: "子表单",
                form: {
                    title: "标题",
                    controls: [{
                        type: "text",
                        label: "文本",
                        name: "text"
                    }]
                }
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "子表单项",
            t.panelControlsCreator = function(e) {
                return [{
                    children: function(a) {
                        a.value,
                        a.onChange;
                        return i.default.createElement(l.Button, {
                            size: "sm",
                            level: "danger",
                            className: "m-b",
                            block: !0,
                            onClick: t.editDetail.bind(t, e.id)
                        }, "配置成员渲染器")
                    }
                }, {
                    name: "labelField",
                    type: "text",
                    value: "label",
                    label: "名称字段名",
                    description: "当值中存在这个字段，则按钮名称将使用此字段的值来展示。"
                }, {
                    name: "btnLabel",
                    label: "按钮标签名",
                    value: "设置",
                    type: "text"
                }, {
                    name: "minLength",
                    visibleOn: "data.multiple",
                    label: "允许最少个数",
                    type: "number"
                }, {
                    name: "maxLength",
                    visibleOn: "data.multiple",
                    label: "允许最多个数",
                    type: "number"
                }]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t.prototype.filterProps = function(e) {
            return (e = s.JSONPipeOut(e, !0)).value || (e.value = [""]),
            e
        }
        ,
        t.prototype.buildEditorToolbar = function(e, t) {
            var a = e.id;
            "form-control" === e.info.renderer.name && t.push({
                icon: "fa fa-expand",
                order: 100,
                tooltip: "配置成员渲染器",
                onClick: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.buildEditorContextMenu = function(e, t) {
            var a = e.id;
            e.schema,
            e.region;
            "form-control" === e.info.renderer.name && t.push("|", {
                label: "配置成员渲染器",
                onSelect: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.editDetail = function(e) {
            var t = this.manager
              , a = t.store
              , l = a.getNodeById(e)
              , i = a.getValueOf(e);
            if (l && i) {
                var r = i.form
                  , o = r.title
                  , d = r.actions
                  , c = r.name
                  , u = r.size
                  , p = r.closeOnEsc
                  , m = r.showCloseButton
                  , f = r.bodyClassName
                  , h = (r.type,
                n.__rest(r, ["title", "actions", "name", "size", "closeOnEsc", "showCloseButton", "bodyClassName", "type"]))
                  , b = {
                    title: o,
                    actions: d,
                    name: c,
                    size: u,
                    closeOnEsc: p,
                    showCloseButton: m,
                    bodyClassName: f,
                    type: "dialog",
                    body: n.__assign({
                        type: "form"
                    }, h)
                };
                this.manager.openSubEditor({
                    title: "配置子表单项",
                    value: b,
                    memberImmutable: ["body"],
                    onChange: function(e) {
                        var a = e.body[0];
                        delete (e = n.__assign(n.__assign({}, i), {
                            form: n.__assign(n.__assign({}, e), a)
                        })).form.body,
                        delete e.form.type,
                        t.panelChangeValue(e, s.diff(i, e))
                    }
                })
            }
        }
        ,
        t
    }(o.BasePlugin);
    t.SubFormControlPlugin = d,
    r.registerEditorPlugin(d)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.SubmitControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "submit-control",
            t.name = "提交",
            t.panelTitle = "提交",
            t
        }
        return n.__extends(t, e),
        t
    }(a(24).ButtonControlPlugin);
    t.SubmitControlPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.SwitchControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "switch-control",
            t.$schema = "https://isuda.baidu.com/schemas/SwitchControlSchema.json",
            t.order = -400,
            t.name = "开关",
            t.description = "开关控件",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/switch",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "switch",
                option: "开关",
                name: "switch"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: [n.__assign({}, t.scaffold)]
            },
            t.panelTitle = "开关",
            t.panelControls = [l.getSchemaTpl("switchDefaultValue", {
                pipeOut: function(e, t, a) {
                    return e ? a.trueValue : void 0
                }
            }), {
                type: "switch",
                name: "value",
                label: "默认勾选",
                mode: "inline",
                className: "w-full",
                visibleOn: 'typeof this.value !== "undefined"',
                pipeOut: function(e, t, a) {
                    return e ? a.trueValue : a.falseValue
                }
            }, {
                name: "option",
                type: "text",
                label: "选项说明"
            }, {
                label: "选项位置",
                name: "optionAtLeft",
                type: "button-group",
                size: "sm",
                value: !1,
                options: [{
                    label: "左",
                    value: !0
                }, {
                    label: "右",
                    value: !1
                }]
            }, {
                type: "text",
                label: "勾选后的值",
                name: "trueValue",
                value: !0,
                pipeOut: l.valuePipeOut
            }, {
                type: "text",
                label: "未勾选的值",
                name: "falseValue",
                value: !1,
                pipeOut: l.valuePipeOut
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.SwitchControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TableControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "table-control",
            t.$schema = "https://isuda.baidu.com/schemas/TableControlSchema.json",
            t.name = "表格编辑框",
            t.description = "可以用来展现数据的,可以用来展示数组类型的数据，比如 <code>multiple</code> 的子 <code>form</code>",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/table",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "table",
                label: "表格",
                name: "table",
                editable: !0,
                addable: !0,
                columns: [{
                    name: "a",
                    label: "列A"
                }, {
                    name: "b",
                    label: "列B"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: {
                    type: "table",
                    value: [{
                        color: "green",
                        name: "绿色"
                    }],
                    name: "table",
                    columns: [{
                        label: "color",
                        name: "color",
                        quickEdit: {
                            type: "color"
                        }
                    }, {
                        label: "说明文字",
                        name: "name",
                        quickEdit: {
                            type: "text",
                            mode: "inline"
                        }
                    }]
                }
            },
            t.panelTitle = "表格编辑",
            t.panelControls = [],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.TableControlPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TabsControlPlugin = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(16)
      , r = a(3)
      , o = a(13)
      , s = a(1)
      , d = a(36)
      , c = a(12)
      , u = n.__importDefault(a(10))
      , p = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "tabs-control",
            t.$schema = "https://isuda.baidu.com/schemas/TabsControlSchema.json",
            t.name = "选项卡(Tabs)",
            t.description = "可以将多个表单项通过选项卡的方式分组",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/tabs",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "tabs",
                tabs: [{
                    title: "选项卡1",
                    controls: [{
                        label: "文本",
                        name: "text1",
                        type: "text"
                    }]
                }, {
                    title: "选项卡2",
                    controls: [{
                        label: "文本",
                        name: "text1",
                        type: "text"
                    }]
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: n.__assign({}, t.scaffold)
            },
            t.patchContainers = ["tabs.body", "tabs.controls"],
            t.vRendererConfig = {
                regions: {
                    body: {
                        key: "body",
                        label: "内容区"
                    },
                    controls: {
                        key: "controls",
                        label: "子表单项",
                        preferTag: "表单项"
                    }
                },
                panelTitle: "卡片",
                panelControls: [r.getSchemaTpl("fieldSet", {
                    title: "常规",
                    controls: [{
                        name: "title",
                        label: "标题",
                        type: "text",
                        required: !0
                    }, r.getSchemaTpl("icon"), {
                        label: "Hash",
                        name: "hash",
                        type: "text",
                        description: "设置后，会同步更新地址栏的 Hash。"
                    }, {
                        label: "内容形式",
                        name: "__mode",
                        type: "button-group",
                        size: "xs",
                        description: "如果选择表单，内容默认为表单项，如果选择其他则可以放其他类型渲染器",
                        pipeIn: function(e, t) {
                            return Array.isArray(t.body) ? "other" : "form"
                        },
                        onChange: function(e, t, a, n) {
                            "form" === e ? (n.setValues({
                                controls: n.data.__controls || [{
                                    placeholder: "文本1",
                                    type: "text",
                                    name: "a",
                                    label: !1
                                }],
                                __body: n.data.body
                            }),
                            n.deleteValueByName("body")) : (n.setValues({
                                body: n.data.__body || [{
                                    type: "tpl",
                                    tpl: "内容",
                                    inline: !1
                                }],
                                __controls: n.data.controls
                            }),
                            n.deleteValueByName("controls"))
                        },
                        options: [{
                            label: "表单",
                            value: "form"
                        }, {
                            label: "其他",
                            value: "other"
                        }]
                    }]
                }), r.getSchemaTpl("fieldSet", {
                    title: "外观",
                    controls: [r.getSchemaTpl("className")],
                    collapsed: !0
                }), r.getSchemaTpl("fieldSet", {
                    title: "其他",
                    controls: [{
                        type: "switch",
                        name: "reload",
                        label: "内容刷新",
                        mode: "inline",
                        className: "block",
                        description: "配置后，每次点开内容都会重新刷新，如果配置了，下面两个选项就不用配置了。"
                    }, {
                        type: "switch",
                        name: "mountOnEnter",
                        visibleOn: "!this.reload",
                        label: "激活时才渲染",
                        mode: "inline",
                        className: "block",
                        description: "设置后选项卡的内容只有点开才会渲染，如果有选项卡放的可拉取接口的组件，那么这个接口只有在点开的时候才会拉取。"
                    }, {
                        visibleOn: "!this.reload",
                        type: "switch",
                        name: "unmountOnExit",
                        label: "隐藏即销毁",
                        mode: "inline",
                        className: "block",
                        description: "设置后，如果选项卡内容关闭则销毁，配置「激活时才渲染」选项可以做到卡片内容每次点开都重新加载的效果。"
                    }, r.getSchemaTpl("visible"), r.getSchemaTpl("disabled")]
                })]
            },
            t.overrides = {
                renderTabs: function() {
                    var e = this
                      , t = this.super();
                    if (this.renderTab && this.props.$$editor && t) {
                        var a = this.props.tabs;
                        return i.mapReactElement(t, (function(t) {
                            var n;
                            if (~(null === (n = t.type.displayName) || void 0 === n ? void 0 : n.indexOf("TabComponent")) && t.props.$$id) {
                                var i = t.props.$$id
                                  , r = u.default(a, (function(e) {
                                    return e.$$id === i
                                }
                                ))
                                  , s = a[r]
                                  , d = e.props.$$editor
                                  , p = d.plugin;
                                if (~r) {
                                    var m = Array.isArray(s.controls) ? p.vRendererConfig.regions.controls : p.vRendererConfig.regions.body;
                                    return l.default.cloneElement(t, {
                                        children: l.default.createElement(o.VRenderer, {
                                            plugin: d.plugin,
                                            renderer: d.renderer,
                                            key: i,
                                            $schema: "https://isuda.baidu.com/schemas/TabControlSchema.json",
                                            hostId: d.id,
                                            memberIndex: r,
                                            name: "" + (t.props.title || "卡片" + (r + 1)),
                                            id: i,
                                            draggable: !1,
                                            wrapperResolve: p.tabWrapperResolve,
                                            schemaPath: d.schemaPath + "/tabs/" + r,
                                            path: e.props.$path + "/" + r,
                                            data: e.props.data
                                        }, l.default.createElement(c.RegionWrapper, {
                                            key: m.key,
                                            preferTag: m.preferTag,
                                            name: m.key,
                                            label: m.label,
                                            regionConfig: m,
                                            editorStore: p.manager.store,
                                            manager: p.manager,
                                            children: t.props.children,
                                            wrapperResolve: m.wrapperResolve,
                                            rendererName: d.renderer.name
                                        }))
                                    })
                                }
                            }
                            return t
                        }
                        ))
                    }
                    return t
                }
            },
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(d.TabsPlugin);
    t.TabsControlPlugin = p,
    s.registerEditorPlugin(p)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TagControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "tag-control",
            t.$schema = "https://isuda.baidu.com/schemas/TagControlSchema.json",
            t.order = -420,
            t.name = "标签",
            t.description = "配置<code>options</code>可以实现选择选项",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/tag",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "tag",
                label: "标签",
                name: "tag",
                options: ["A", "B", "C"]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: n.__assign({}, t.scaffold)
            },
            t.panelTitle = "标签",
            t.panelControls = [{
                type: "text",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"'
            }, l.getSchemaTpl("clearable"), l.getSchemaTpl("fieldSet", {
                title: "选项",
                controls: [l.getSchemaTpl("options", {
                    visibleOn: "data.autoComplete !== false",
                    description: "设置选项后，输入时会下拉这些选项供用户参考。"
                }), l.getSchemaTpl("source", {
                    visibleOn: "data.autoComplete !== false"
                }), {
                    type: "text",
                    name: "optionsTip",
                    label: "选项提示",
                    value: "最近您使用的标签"
                }, l.getSchemaTpl("joinValues"), l.getSchemaTpl("delimiter"), l.getSchemaTpl("extractValue")]
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.TagControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TextareaControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "textarea-control",
            t.$schema = "https://isuda.baidu.com/schemas/TextareaControlSchema.json",
            t.order = -490,
            t.name = "多行文本框",
            t.description = "支持换行输入",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/textarea",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "textarea",
                label: "多行文本",
                name: "textarea"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: n.__assign({}, t.scaffold)
            },
            t.panelTitle = "多行文本",
            t.panelControls = [l.getSchemaTpl("switchDefaultValue"), {
                type: "textarea",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"'
            }, {
                type: "number",
                name: "minRows",
                value: 3,
                label: "最小行数"
            }, {
                type: "number",
                name: "maxRows",
                value: 20,
                label: "最大行数"
            }, {
                type: "switch",
                name: "trimContents",
                label: "去除首尾空白",
                mode: "inline",
                className: "w-full",
                description: "开启后，将不允许用户输入前后空格"
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.TextareaControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TimeControlPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = a(3)
      , r = a(1)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "time-control",
            t.$schema = "https://isuda.baidu.com/schemas/TimeControlSchema.json",
            t.name = "时间框",
            t.description = "时分秒输入",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/time",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "time",
                label: "时间",
                name: "time"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: n.__assign({}, t.scaffold)
            },
            t.panelTitle = "时间框",
            t.panelControls = [i.getSchemaTpl("switchDefaultValue"), {
                type: "text",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"',
                placeholder: "请输入相对值",
                description: "支持 <code>now、+1day、-2weeks</code>这种相对值用法"
            }, {
                type: "fieldSet",
                title: "固定值选择",
                collapsed: !0,
                collapsable: !0,
                className: "fieldset",
                visibleOn: 'typeof this.value !== "undefined"',
                controls: [{
                    type: "time",
                    name: "value",
                    pipeIn: function(e) {
                        return l.relativeValueRe.test(e) || ~["now", "today"].indexOf(e) ? "" : e
                    }
                }]
            }, {
                type: "text",
                name: "format",
                label: "值格式",
                description: '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。',
                pipeIn: i.defaultValue("X")
            }, i.getSchemaTpl("clearable", {
                pipeIn: i.defaultValue(!0)
            }), {
                type: "text",
                name: "inputFormat",
                label: "显示格式",
                description: '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。',
                pipeIn: i.defaultValue("HH:mm")
            }],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.TimeControlPlugin = o,
    r.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TreeControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "tree-control",
            t.$schema = "https://isuda.baidu.com/schemas/TreeControlSchema.json",
            t.name = "树选择框",
            t.description = "树型结构来选择，可通过<code>options</code>来配置选项，也可通过<code>source</code>拉取选项",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/tree",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "tree",
                label: "树",
                name: "tree",
                options: [{
                    label: "选项A",
                    value: "A",
                    children: [{
                        label: "选项C",
                        value: "C"
                    }, {
                        label: "选项D",
                        value: "D"
                    }]
                }, {
                    label: "选项B",
                    value: "B"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: n.__assign({}, t.scaffold)
            },
            t.panelTitle = "树选择",
            t.panelDefinitions = {
                options: {
                    label: "选项 Options",
                    name: "options",
                    type: "combo",
                    multiple: !0,
                    multiLine: !0,
                    draggable: !0,
                    addButtonText: "新增选项",
                    scaffold: {
                        label: "",
                        value: ""
                    },
                    controls: [{
                        type: "group",
                        controls: [{
                            type: "text",
                            name: "label",
                            placeholder: "名称",
                            required: !0
                        }, {
                            type: "text",
                            name: "value",
                            placeholder: "值",
                            unique: !0
                        }]
                    }, {
                        $ref: "options",
                        label: "子选项",
                        name: "children",
                        addButtonText: "新增子选项"
                    }]
                }
            },
            t.panelControls = [l.getSchemaTpl("switchDefaultValue"), {
                type: "text",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"'
            }, l.getSchemaTpl("fieldSet", {
                title: "选项",
                controls: [{
                    $ref: "options",
                    name: "options"
                }, l.getSchemaTpl("source", {
                    sampleBuilder: function(e) {
                        return JSON.stringify({
                            status: 0,
                            msg: "",
                            data: {
                                options: [{
                                    label: "选项A",
                                    value: "a",
                                    children: [{
                                        label: "子选项",
                                        value: "c"
                                    }]
                                }, {
                                    label: "选项B",
                                    value: "b"
                                }]
                            }
                        }, null, 2)
                    }
                }), {
                    label: "隐藏顶级",
                    name: "hideRoot",
                    type: "switch",
                    mode: "inline",
                    className: "w-full"
                }, {
                    name: "showIcon",
                    label: "是否显示图标",
                    type: "switch",
                    mode: "inline",
                    className: "w-full",
                    pipeIn: l.defaultValue(!0)
                }, l.getSchemaTpl("multiple"), {
                    name: "cascade",
                    visibleOn: "data.multiple",
                    label: "不自动选中子节点？",
                    type: "switch",
                    description: "选中父级时，孩子节点是否自动选中",
                    mode: "inline",
                    className: "w-full"
                }, {
                    name: "withChildren",
                    visibleOn: "data.cascade !== true && data.multiple",
                    label: "数值是否携带子节点",
                    type: "switch",
                    disabledOn: "data.onlyChildren",
                    mode: "inline",
                    className: "w-full"
                }, {
                    name: "onlyChildren",
                    visibleOn: "data.cascade !== true && data.multiple",
                    label: "数值是否只包含子节点",
                    disabledOn: "data.withChildren",
                    type: "switch",
                    mode: "inline",
                    className: "w-full"
                }, l.getSchemaTpl("joinValues"), l.getSchemaTpl("delimiter"), l.getSchemaTpl("extractValue")]
            }), l.getSchemaTpl("fieldSet", {
                title: "外观",
                controls: [{
                    label: "顶级文字",
                    name: "rootLabel",
                    type: "text",
                    pipeIn: l.defaultValue("顶级"),
                    visibleOn: "data.hideRoot !== true"
                }, {
                    name: "showIcon",
                    label: "是否显示图标",
                    type: "switch",
                    mode: "inline",
                    className: "w-full",
                    pipeIn: l.defaultValue(!0)
                }, {
                    label: "是否显示单选按钮",
                    name: "showRadio",
                    type: "switch",
                    mode: "inline",
                    className: "w-full",
                    visibleOn: "!data.multiple"
                }]
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.TreeControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TreeSelectControlPlugin = void 0;
    var n = a(0)
      , l = a(3)
      , i = a(1)
      , r = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "tree-select-control",
            t.$schema = "https://isuda.baidu.com/schemas/TreeSelectControlSchema.json",
            t.name = "树下拉框",
            t.description = "点击输入框，弹出树型选择框进行选择",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/tree-select",
            t.tags = ["表单项"],
            t.scaffold = {
                type: "tree-select",
                label: "树选择框",
                name: "tree-select",
                options: [{
                    label: "选项A",
                    value: "A",
                    children: [{
                        label: "选项C",
                        value: "C"
                    }, {
                        label: "选项D",
                        value: "D"
                    }]
                }, {
                    label: "选项B",
                    value: "B"
                }]
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: n.__assign({}, t.scaffold)
            },
            t.panelTitle = "树下拉",
            t.panelDefinitions = {
                options: {
                    label: "选项 Options",
                    name: "options",
                    type: "combo",
                    multiple: !0,
                    multiLine: !0,
                    draggable: !0,
                    addButtonText: "新增选项",
                    scaffold: {
                        label: "",
                        value: ""
                    },
                    controls: [{
                        type: "group",
                        controls: [{
                            type: "text",
                            name: "label",
                            placeholder: "名称",
                            required: !0
                        }, {
                            type: "text",
                            name: "value",
                            placeholder: "值",
                            unique: !0
                        }]
                    }, {
                        $ref: "options",
                        label: "子选项",
                        name: "children",
                        addButtonText: "新增子选项"
                    }]
                }
            },
            t.panelControls = [l.getSchemaTpl("switchDefaultValue"), {
                type: "text",
                name: "value",
                label: "默认值",
                visibleOn: 'typeof this.value !== "undefined"'
            }, l.getSchemaTpl("clearable"), l.getSchemaTpl("fieldSet", {
                title: "选项",
                controls: [{
                    $ref: "options",
                    name: "options"
                }, l.getSchemaTpl("source", {
                    sampleBuilder: function(e) {
                        return JSON.stringify({
                            status: 0,
                            msg: "",
                            data: {
                                options: [{
                                    label: "选项A",
                                    value: "a",
                                    children: [{
                                        label: "子选项",
                                        value: "c"
                                    }]
                                }, {
                                    label: "选项B",
                                    value: "b"
                                }]
                            }
                        }, null, 2)
                    }
                }), l.getSchemaTpl("api", {
                    name: "autoComplete",
                    label: "自动完成接口",
                    description: "每次输入新内容后，将调用接口，根据接口返回更新选项。当前用户输入值在 `\\${term}` 中。<code>请不要与获取选项接口同时设置。</code>"
                }), {
                    name: "initiallyOpen",
                    label: "是否默认展开子选项",
                    type: "switch",
                    mode: "inline",
                    className: "w-full",
                    pipeIn: l.defaultValue(!0)
                }, {
                    type: "text",
                    name: "unfoldedLevel",
                    label: "选项默认展开级数",
                    visibleOn: 'typeof this.initiallyOpen !== "undefined" || !this.initiallyOpen'
                }, {
                    name: "showIcon",
                    label: "是否显示图标",
                    type: "switch",
                    mode: "inline",
                    className: "w-full",
                    pipeIn: l.defaultValue(!0)
                }, {
                    label: "可搜索？",
                    name: "searchable",
                    type: "switch",
                    mode: "inline",
                    className: "w-full"
                }, {
                    label: "是否显示单选按钮",
                    name: "showRadio",
                    type: "switch",
                    mode: "inline",
                    className: "w-full",
                    visibleOn: "!data.multiple"
                }, l.getSchemaTpl("multiple"), {
                    name: "cascade",
                    visibleOn: "data.multiple",
                    label: "不自动选中子节点？",
                    description: "选中父级时，孩子节点是否自动选中",
                    type: "switch",
                    mode: "inline",
                    className: "w-full"
                }, {
                    name: "withChildren",
                    visibleOn: "data.cascade !== true && data.multiple",
                    label: "数值是否携带子节点",
                    type: "switch",
                    mode: "inline",
                    className: "w-full"
                }, l.getSchemaTpl("joinValues"), l.getSchemaTpl("delimiter"), l.getSchemaTpl("extractValue")]
            })],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" === t.info.renderer.name || t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(a(2).BasePlugin);
    t.TreeSelectControlPlugin = r,
    i.registerEditorPlugin(r)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.UrlControlPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "url-control",
            t.$schema = "https://isuda.baidu.com/schemas/TextControlSchema.json",
            t.name = "Url输入框",
            t.description = "验证输入是否为合法的 URL",
            t.scaffold = {
                type: "url",
                label: "链接",
                name: "url"
            },
            t.previewSchema = {
                type: "form",
                className: "text-left",
                wrapWithPanel: !1,
                controls: n.__assign({}, t.scaffold)
            },
            t.panelTitle = "URL",
            t
        }
        return n.__extends(t, e),
        t
    }(a(20).TextControlPlugin);
    t.UrlControlPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ActionPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.panelTitle = "按钮",
            t.panelControlsCreator = function(e) {
                var a = /(?:\/|^)dialog\/.+$/.test(e.path);
                /(?:\/|^)dropdown-button\/.+$/.test(e.path);
                return [{
                    label: "按钮行为",
                    type: "select",
                    name: "actionType",
                    pipeIn: s.defaultValue(""),
                    options: [{
                        label: "默认",
                        value: ""
                    }, {
                        label: "弹框",
                        value: "dialog"
                    }, {
                        label: "抽出式弹框（Drawer）",
                        value: "drawer"
                    }, {
                        label: "发送请求",
                        value: "ajax"
                    }, {
                        label: "页面跳转(单页模式)",
                        value: "link"
                    }, {
                        label: "页面跳转",
                        value: "url"
                    }, {
                        label: "刷新目标",
                        value: "reload"
                    }, {
                        label: "复制内容",
                        value: "copy"
                    }, {
                        label: "提交",
                        value: "submit"
                    }, {
                        label: "重置",
                        value: "reset"
                    }, {
                        label: "确认",
                        value: "confirm"
                    }, {
                        label: "取消",
                        value: "cancel"
                    }, {
                        label: "跳转下一条",
                        value: "next"
                    }, {
                        label: "跳转上一条",
                        value: "prev"
                    }]
                }, {
                    type: "text",
                    name: "content",
                    visibleOn: 'data.actionType == "copy"',
                    label: "复制内容模板"
                }, {
                    type: "text",
                    name: "target",
                    visibleOn: 'data.actionType == "reload"',
                    label: "指定刷新目标",
                    required: !0
                }, {
                    name: "dialog",
                    pipeIn: s.defaultValue({
                        title: "弹框标题",
                        body: "<p>对，你刚刚点击了</p>"
                    }),
                    children: function(e) {
                        var a = e.value
                          , r = e.onChange;
                        return "dialog" === e.data.actionType ? i.default.createElement(l.Button, {
                            size: "sm",
                            level: "danger",
                            className: "m-b",
                            onClick: function() {
                                return t.manager.openSubEditor({
                                    title: "配置弹框内容",
                                    value: n.__assign({
                                        type: "dialog"
                                    }, a),
                                    onChange: function(e) {
                                        return r(e)
                                    }
                                })
                            },
                            block: !0
                        }, "配置弹框内容") : null
                    }
                }, {
                    visibleOn: 'data.actionType == "drawer"',
                    name: "drawer",
                    pipeIn: s.defaultValue({
                        title: "弹框标题",
                        body: "<p>对，你刚刚点击了</p>"
                    }),
                    children: function(e) {
                        var a = e.value
                          , r = e.onChange;
                        return "drawer" == e.data.actionType ? i.default.createElement(l.Button, {
                            size: "sm",
                            level: "danger",
                            className: "m-b",
                            onClick: function() {
                                return t.manager.openSubEditor({
                                    title: "配置抽出式弹框内容",
                                    value: n.__assign({
                                        type: "drawer"
                                    }, a),
                                    onChange: function(e) {
                                        return r(e)
                                    }
                                })
                            },
                            block: !0
                        }, "配置抽出式弹框内容") : null
                    }
                }, s.getSchemaTpl("api", {
                    label: "目标API",
                    visibleOn: 'data.actionType == "ajax"'
                }), {
                    name: "feedback",
                    pipeIn: s.defaultValue({
                        title: "弹框标题",
                        body: "<p>内容</p>"
                    }),
                    children: function(e) {
                        var a = e.onChange
                          , r = e.value;
                        return "ajax" == e.data.actionType ? i.default.createElement("div", {
                            className: "m-b"
                        }, i.default.createElement(l.Button, {
                            size: "sm",
                            level: r ? "danger" : "info",
                            onClick: function() {
                                return t.manager.openSubEditor({
                                    title: "配置反馈弹框详情",
                                    value: n.__assign({
                                        type: "dialog"
                                    }, r),
                                    onChange: function(e) {
                                        return a(e)
                                    }
                                })
                            }
                        }, "配置反馈弹框内容"), r ? i.default.createElement(l.Button, {
                            size: "sm",
                            level: "link",
                            className: "m-l",
                            onClick: function() {
                                return a("")
                            }
                        }, "清空设置") : null) : null
                    }
                }, {
                    name: "feedback.visibleOn",
                    label: "是否弹出表达式",
                    type: "text",
                    visibleOn: "this.feedback",
                    autoComplete: !1,
                    description: "请使用 JS 表达式如：`this.xxx == 1`"
                }, {
                    type: "text",
                    label: "目标地址",
                    name: "link",
                    visibleOn: 'data.actionType == "link"'
                }, {
                    type: "text",
                    label: "目标地址",
                    name: "url",
                    visibleOn: 'data.actionType == "url"',
                    placeholder: "http://"
                }, {
                    type: "switch",
                    name: "blank",
                    visibleOn: 'data.actionType == "url"',
                    mode: "inline",
                    className: "w-full",
                    label: "是否用新窗口打开",
                    pipeIn: s.defaultValue(!0)
                }, a ? {
                    visibleOn: 'data.actionType == "submit" || data.type == "submit"',
                    name: "close",
                    type: "switch",
                    mode: "inline",
                    className: "w-full",
                    pipeIn: s.defaultValue(!0),
                    label: "是否关闭当前弹框"
                } : null, {
                    name: "confirmText",
                    type: "textarea",
                    label: "确认文案",
                    description: "点击后会弹出此内容，等用户确认后才进行相应的操作。"
                }, {
                    type: "text",
                    name: "reload",
                    label: "刷新目标组件",
                    visibleOn: 'data.actionType != "link" && data.actionType != "url"',
                    description: "当前动作完成后，指定目标组件刷新。支持传递数据如：<code>xxx?a=\\${a}&b=\\${b}</code>，多个目标请用英文逗号隔开。"
                }, {
                    type: "text",
                    name: "target",
                    visibleOn: 'data.actionType != "reload"',
                    label: "指定响应组件",
                    description: "指定动作执行者，默认为当前组件所在的功能性性组件，如果指定则转交给目标组件来处理。"
                }]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.buildEditorPanel = function(t, a) {
            ~["action", "button", "submit", "reset", "button-control", "submit-control", "reset-control"].indexOf(t.info.renderer.name) ? a.push({
                key: "action",
                icon: "fa fa-gavel",
                title: "动作",
                render: this.manager.makeSchemaFormRender({
                    controls: this.panelControlsCreator(t)
                }),
                order: 100
            }) : e.prototype.buildEditorPanel.call(this, t, a)
        }
        ,
        t
    }(o.BasePlugin);
    t.ActionPlugin = d,
    r.registerEditorPlugin(d)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.PagePlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "alert",
            t.$schema = "https://isuda.baidu.com/schemas/AlertSchema.json",
            t.name = "提示",
            t.description = "用来做文字特殊提示，分为四类：提示类、成功类、警告类和危险类。可结合 <code>visibleOn</code> 用来做错误信息提示。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/alert",
            t.icon = "fa fa-exclamation-circle",
            t.scaffold = {
                type: "alert",
                body: {
                    type: "tpl",
                    tpl: "提示内容",
                    inline: !1
                },
                level: "info"
            },
            t.previewSchema = n.__assign(n.__assign({}, t.scaffold), {
                className: "text-left",
                showCloseButton: !0
            }),
            t.regions = [{
                key: "body",
                label: "内容区"
            }],
            t.panelTitle = "提示",
            t.panelControls = r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    type: "switch",
                    name: "showCloseButton",
                    mode: "inline",
                    className: "w-full",
                    label: "显示关闭按钮"
                }]
            }, {
                title: "外观",
                controls: [{
                    label: "样式",
                    name: "level",
                    type: "select",
                    options: [{
                        label: "提示",
                        value: "info"
                    }, {
                        label: "成功",
                        value: "success"
                    }, {
                        label: "警告",
                        value: "warning"
                    }, {
                        label: "严重",
                        value: "danger"
                    }]
                }, r.getSchemaTpl("className")]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
            }]),
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.PagePlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.AudioPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "audio",
            t.$schema = "https://isuda.baidu.com/schemas/AudioSchema.json",
            t.name = "音频",
            t.description = "音频控件，可以用来播放各种音频文件。",
            t.tags = [],
            t.icon = "fa fa-music",
            t.scaffold = {
                type: "audio",
                autoPlay: !1,
                src: ""
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "音频",
            t.panelControlsCreator = function(e) {
                var t = /\/field\/\w+$/.test(e.path);
                return [r.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [t ? {
                        type: "tpl",
                        inline: !1,
                        className: "text-info text-sm",
                        tpl: "<p>当前为字段内容节点配置，选择上层还有更多的配置。</p>"
                    } : null, {
                        name: "src",
                        type: "text",
                        label: "音频地址",
                        description: "支持获取变量如：<code>\\${audioSrc}</code>"
                    }, {
                        type: "select",
                        name: "rates",
                        label: "音频倍速",
                        description: "加速范围在0.1到16之间",
                        multiple: !0,
                        pipeIn: function(e) {
                            return Array.isArray(e) ? e.join(",") : []
                        },
                        pipeOut: function(e) {
                            if (e && e.length) {
                                var t = e.split(",");
                                return t = t.filter((function(e) {
                                    return Number(e) && Number(e) > 0 && Number(e) <= 16
                                }
                                )).map((function(e) {
                                    return Number(Number(e).toFixed(1))
                                }
                                )),
                                Array.from(new Set(t))
                            }
                            return []
                        },
                        options: ["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4"]
                    }, {
                        name: "controls",
                        type: "select",
                        label: "内部控件",
                        multiple: !0,
                        extractValue: !0,
                        joinValues: !1,
                        options: [{
                            label: "倍速",
                            value: "rates"
                        }, {
                            label: "播放",
                            value: "play"
                        }, {
                            label: "时间",
                            value: "time"
                        }, {
                            label: "进度",
                            value: "process"
                        }, {
                            label: "音量",
                            value: "volume"
                        }],
                        pipeIn: r.defaultValue(["rates", "play", "time", "process", "volume"]),
                        labelRemark: {
                            trigger: "click",
                            className: "m-l-xs",
                            rootClose: !0,
                            content: "选择倍速后，还需要在常规选择栏中配置倍速",
                            placement: "left"
                        }
                    }, {
                        name: "autoPlay",
                        type: "switch",
                        mode: "inline",
                        className: "w-full",
                        label: "自动播放"
                    }, {
                        name: "loop",
                        type: "switch",
                        mode: "inline",
                        className: "w-full",
                        label: "循环播放"
                    }]
                }, {
                    title: "外观",
                    controls: [r.getSchemaTpl("className"), {
                        name: "inline",
                        type: "switch",
                        mode: "inline",
                        className: "w-full",
                        label: "内联模式",
                        pipeIn: r.defaultValue(!0)
                    }]
                }, {
                    title: "其他",
                    controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.AudioPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ButtonGroupPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "button-group",
            t.$schema = "https://isuda.baidu.com/schemas/ButtonGroupSchema.json",
            t.name = "按钮组",
            t.description = "用来展示多个按钮，视觉上会作为一个整体呈现。",
            t.tags = ["按钮"],
            t.icon = "fa fa-stop-circle",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/button-group",
            t.scaffold = {
                type: "button-group",
                buttons: [{
                    type: "button",
                    label: "按钮1",
                    actionType: "dialog",
                    dialog: {
                        title: "系统提示",
                        body: "对你点击了"
                    }
                }, {
                    type: "button",
                    label: "按钮2",
                    actionType: "dialog",
                    dialog: {
                        title: "系统提示",
                        body: "对你点击了"
                    }
                }]
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "按钮组",
            t.panelControls = [{
                name: "buttons",
                type: "combo",
                label: "按钮管理",
                multiple: !0,
                addable: !0,
                minLength: 1,
                draggable: !0,
                draggableTip: "",
                editable: !1,
                visibleOn: "this.buttons && this.buttons.length",
                controls: [{
                    type: "tpl",
                    inline: !1,
                    className: "p-t-xs",
                    tpl: '<span class="label label-default"><% if (data.type === "button-group") { %> 按钮组 <% } else { %><%= data.label %><% if (data.icon) { %><i class="<%= data.icon %>"/><% }%><% } %></span>'
                }],
                addButtonText: "新增按钮",
                scaffold: {
                    type: "button",
                    label: "按钮"
                }
            }],
            t.regions = [{
                key: "buttons",
                label: "子按钮",
                renderMethod: "render",
                preferTag: "按钮",
                insertPosition: "inner"
            }],
            t
        }
        return n.__extends(t, e),
        t
    }(a(2).BasePlugin);
    t.ButtonGroupPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ButtonToolbarPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "button-toolbar",
            t.$schema = "https://isuda.baidu.com/schemas/ButtonToolbarSchema.json",
            t.name = "按钮工具栏",
            t.description = "可以用来放置多个按钮或者按钮组，按钮之间会存在一定的间隔",
            t.tags = [],
            t.icon = "fa fa-stop-circle",
            t.scaffold = {
                type: "button-toolbar",
                buttons: [{
                    type: "button",
                    label: "按钮1",
                    actionType: "dialog",
                    dialog: {
                        title: "系统提示",
                        body: "对你点击了"
                    }
                }, {
                    type: "button",
                    label: "按钮2",
                    actionType: "dialog",
                    dialog: {
                        title: "系统提示",
                        body: "对你点击了"
                    }
                }]
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "按钮工具栏",
            t.panelControls = [r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    name: "buttons",
                    type: "combo",
                    label: "按钮管理",
                    multiple: !0,
                    addable: !0,
                    draggable: !0,
                    draggableTip: "可排序、可移除、如要编辑请在预览区选中编辑",
                    editable: !1,
                    visibleOn: "this.buttons && this.buttons.length",
                    controls: [{
                        type: "tpl",
                        inline: !1,
                        className: "p-t-xs",
                        tpl: '<span class="label label-default"><% if (data.type === "button-group") { %> 按钮组 <% } else { %><%= data.label %><% if (data.icon) { %><i class="<%= data.icon %>"/><% }%><% } %></span>'
                    }],
                    addButtonText: "新增按钮",
                    scaffold: {
                        type: "button",
                        label: "按钮"
                    }
                }]
            }, {
                title: "外观",
                controls: [r.getSchemaTpl("className")]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
            }])],
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.ButtonToolbarPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.CardPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = n.__importDefault(a(18))
      , c = a(13)
      , u = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "card",
            t.$schema = "https://isuda.baidu.com/schemas/CardSchema.json",
            t.name = "卡片",
            t.description = "展示单个卡片。",
            t.tags = [],
            t.icon = "",
            t.scaffold = {
                type: "card",
                header: {
                    title: "标题",
                    subTitle: "副标题",
                    avatar: "https://fex.bdstatic.com/n/static/amis/renderers/crud/field/placeholder_cfad9b1.png"
                },
                body: "内容",
                actions: [{
                    type: "button",
                    label: "按钮",
                    actionType: "dialog",
                    dialog: {
                        title: "标题",
                        body: "内容"
                    }
                }]
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.regions = [{
                key: "body",
                label: "内容区",
                renderMethod: "renderBody",
                preferTag: "展示"
            }, {
                key: "actions",
                label: "按钮组",
                renderMethod: "renderActions",
                wrapperResolve: function(e) {
                    return e
                },
                preferTag: "按钮"
            }],
            t.panelTitle = "卡片",
            t.panelControlsCreator = function(e) {
                return [s.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: d.default([{
                        children: i.default.createElement(l.Button, {
                            size: "sm",
                            className: "m-b-sm",
                            level: "info",
                            block: !0,
                            onClick: function() {
                                return t.manager.showInsertPanel("actions", e.id)
                            }
                        }, "新增按钮")
                    }, {
                        children: i.default.createElement("div", null, i.default.createElement(l.Button, {
                            block: !0,
                            level: "primary",
                            size: "sm",
                            onClick: function() {
                                return t.manager.showInsertPanel("body", e.id)
                            }
                        }, "新增内容"))
                    }, {
                        type: "divider"
                    }, {
                        name: "header.title",
                        type: "text",
                        label: "标题",
                        description: "支持模板语法如： <code>\\${xxx}</code>"
                    }, {
                        name: "header.subTitle",
                        type: "text",
                        label: "副标题",
                        description: "支持模板语法如： <code>\\${xxx}</code>"
                    }, {
                        name: "header.avatar",
                        type: "text",
                        label: "图片地址",
                        description: "支持模板语法如： <code>\\${xxx}</code>"
                    }, {
                        name: "header.desc",
                        type: "textarea",
                        label: "描述",
                        description: "支持模板语法如： <code>\\${xxx}</code>"
                    }, {
                        name: "header.highlight",
                        type: "text",
                        label: "是否高亮表达式",
                        description: "如： <code>this.isOwner</code>"
                    }])
                }, {
                    title: "外观",
                    controls: [{
                        type: "range",
                        name: "actionsCount",
                        pipeIn: s.defaultValue(4),
                        min: 1,
                        max: 10,
                        step: 1,
                        label: "卡片一行最多能放按钮个数"
                    }, s.getSchemaTpl("className", {
                        name: "titleClassName",
                        label: "标题 CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "highlightClassName",
                        label: "高亮 CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "subTitleClassName",
                        label: "副标题 CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "descClassName",
                        label: "描述 CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "avatarClassName",
                        label: "图片外层 CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "imageClassName",
                        label: "图片 CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "bodyClassName",
                        label: "内容区 CSS 类名"
                    }), s.getSchemaTpl("className")]
                }, {
                    title: "其他",
                    controls: [s.getSchemaTpl("ref"), s.getSchemaTpl("visible")]
                }])]
            }
            ,
            t.fieldWrapperResolve = function(e) {
                return e
            }
            ,
            t.overrides = {
                renderFeild: function(e, t, a, n) {
                    var l = this.super(e, t, a, n)
                      , r = this.props.$$editor;
                    if (!r || !t.$$id)
                        return l;
                    var o = r.plugin
                      , s = t.$$id;
                    return i.default.createElement(c.VRenderer, {
                        plugin: r.plugin,
                        renderer: r.renderer,
                        multifactor: !0,
                        key: s,
                        $schema: "https://isuda.baidu.com/schemas/CardBodyField.json",
                        hostId: r.id,
                        memberIndex: a,
                        name: "字段" + (a + 1),
                        id: s,
                        draggable: !1,
                        wrapperResolve: o.fieldWrapperResolve,
                        schemaPath: r.schemaPath + "/body/" + a,
                        path: this.props.$path + "/" + a,
                        data: this.props.data
                    }, l)
                }
            },
            t.vRendererConfig = {
                panelTitle: "字段",
                panelControlsCreator: function(e) {
                    return [s.getSchemaTpl("label"), s.getSchemaTpl("className", {
                        name: "labelClassName",
                        label: "Label CSS 类名",
                        visibleOn: "this.label"
                    }), {
                        children: i.default.createElement(l.Button, {
                            size: "sm",
                            level: "info",
                            className: "m-b",
                            block: !0,
                            onClick: t.exchangeRenderer.bind(t, e.id)
                        }, "更改渲染器类型")
                    }]
                }
            },
            t
        }
        return n.__extends(t, e),
        t.prototype.exchangeRenderer = function(e) {
            this.manager.showReplacePanel(e, "展示")
        }
        ,
        t.prototype.beforeInsert = function(e) {
            var t, a, l, i, r = e.context;
            r.info.plugin !== this && (null === (t = r.node.sameIdChild) || void 0 === t ? void 0 : t.info.plugin) !== this || "body" !== r.region || (r.data = n.__assign(n.__assign({}, r.data), {
                label: null !== (i = null !== (a = r.data.label) && void 0 !== a ? a : null === (l = r.subRenderer) || void 0 === l ? void 0 : l.name) && void 0 !== i ? i : "列名称"
            }))
        }
        ,
        t
    }(o.BasePlugin);
    t.CardPlugin = u,
    r.registerEditorPlugin(u)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.CardsPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = a(6)
      , c = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "cards",
            t.$schema = "https://isuda.baidu.com/schemas/CardsSchema.json",
            t.name = "卡片列表",
            t.description = "功能类似于表格，但是用一个个小卡片来展示数据。当前组件需要配置数据源，不自带数据拉取，请优先使用 「CRUD」 组件。",
            t.tags = [],
            t.icon = "",
            t.scaffold = {
                type: "cards",
                data: {
                    items: [{
                        a: 1,
                        b: 2
                    }, {
                        a: 3,
                        b: 4
                    }]
                },
                columnsCount: 2,
                card: {
                    type: "card",
                    className: "m-b-none",
                    header: {
                        title: "标题",
                        subTitle: "副标题"
                    },
                    body: [{
                        name: "a",
                        label: "A"
                    }, {
                        name: "b",
                        label: "B"
                    }],
                    actions: [{
                        label: "详情",
                        type: "button"
                    }]
                }
            },
            t.previewSchema = n.__assign(n.__assign({}, t.scaffold), {
                className: "text-left "
            }),
            t.panelTitle = "卡片集",
            t.panelControlsCreator = function(e) {
                var a = "crud" === e.schema.type;
                return [s.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        children: i.default.createElement("div", {
                            className: "m-b"
                        }, i.default.createElement(l.Button, {
                            level: "success",
                            size: "sm",
                            block: !0,
                            onClick: t.editDetail.bind(t, e.id)
                        }, "配置单项信息"))
                    }, {
                        type: "divider"
                    }, {
                        name: "title",
                        type: "text",
                        label: "标题"
                    }, a ? null : {
                        name: "source",
                        type: "text",
                        label: "数据源",
                        pipeIn: s.defaultValue("${items}"),
                        description: "绑定当前环境变量",
                        test: !a
                    }, {
                        name: "placeholder",
                        value: "暂无数据",
                        type: "text",
                        label: "无数据提示"
                    }]
                }, {
                    title: "外观",
                    controls: [{
                        name: "showHeader",
                        type: "switch",
                        mode: "inline",
                        className: "block",
                        label: "是否显示头部",
                        pipeIn: s.defaultValue(!0)
                    }, {
                        name: "showFooter",
                        type: "switch",
                        mode: "inline",
                        className: "block",
                        label: "是否显示底部",
                        pipeIn: s.defaultValue(!0)
                    }, s.getSchemaTpl("className", {
                        label: "CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "headerClassName",
                        label: "头部 CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "footerClassName",
                        label: "底部 CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "itemsClassName",
                        label: "内容 CSS 类名"
                    }), s.getSchemaTpl("className", {
                        pipeIn: s.defaultValue("Grid-col--sm6 Grid-col--md4 Grid-col--lg3"),
                        name: "itemClassName",
                        label: "卡片 CSS 类名"
                    }), {
                        name: "columnsCount",
                        type: "range",
                        visibleOn: "!this.leftFixed",
                        min: 0,
                        max: 12,
                        step: 1,
                        label: "每行显示个数",
                        description: "不设置时，由卡片 CSS 类名决定"
                    }, {
                        name: "masonryLayout",
                        type: "switch",
                        mode: "inline",
                        label: "启用瀑布流"
                    }]
                }, {
                    title: "其他",
                    controls: [s.getSchemaTpl("ref"), s.getSchemaTpl("visible")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.editDetail = function(e) {
            var t = this.manager
              , a = t.store
              , l = a.getNodeById(e)
              , i = a.getValueOf(e);
            l && i && this.manager.openSubEditor({
                title: "配置成员渲染器",
                value: i.card,
                slot: {
                    type: "container",
                    body: "$$"
                },
                typeMutable: !1,
                onChange: function(e) {
                    e = n.__assign(n.__assign({}, i), {
                        card: e
                    }),
                    t.panelChangeValue(e, d.diff(i, e))
                },
                data: {
                    item: "mocked data",
                    index: 0
                }
            })
        }
        ,
        t.prototype.buildEditorToolbar = function(e, t) {
            var a = e.id
              , n = e.info
              , l = e.schema;
            ("cards" === n.renderer.name || "crud" === n.renderer.name && "cards" === l.mode) && t.push({
                icon: "fa fa-expand",
                order: 100,
                tooltip: "配置成员渲染器",
                onClick: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.buildEditorContextMenu = function(e, t) {
            var a = e.id
              , n = e.schema
              , l = (e.region,
            e.info);
            ("cards" === l.renderer.name || "crud" === l.renderer.name && "cards" === n.mode) && t.push("|", {
                label: "配置成员渲染器",
                onSelect: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.filterProps = function(e) {
            var t = n.__assign(n.__assign({}, e.defaultData), e.data)
              , a = Array.isArray(e.value) ? e.value : "string" == typeof e.source ? l.resolveVariable(e.source, t) : l.resolveVariable("${items}", t);
            if (!Array.isArray(a) || !a.length) {
                e.value = d.repeatArray({
                    id: 666,
                    title: "假数据",
                    description: "假数据",
                    a: "假数据",
                    b: "假数据"
                }, 10).map((function(e, t) {
                    return n.__assign(n.__assign({}, e), {
                        id: t + 1
                    })
                }
                ))
            }
            return d.JSONPipeOut(e)
        }
        ,
        t.prototype.getRendererInfo = function(t) {
            var a, l = t.renderer, i = t.schema;
            return i.$$id || "crud" !== (null === (a = i.$$editor) || void 0 === a ? void 0 : a.renderer.name) || "cards" !== l.name ? e.prototype.getRendererInfo.call(this, t) : n.__assign(n.__assign({}, i.$$editor), {
                name: this.name,
                regions: this.regions,
                patchContainers: this.patchContainers,
                vRendererConfig: this.vRendererConfig,
                wrapperProps: this.wrapperProps,
                wrapperResolve: this.wrapperResolve,
                filterProps: this.filterProps,
                $schema: this.$schema,
                renderRenderer: this.renderRenderer
            })
        }
        ,
        t
    }(o.BasePlugin);
    t.CardsPlugin = c,
    r.registerEditorPlugin(c)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.CarouselPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "carousel",
            t.$schema = "https://isuda.baidu.com/schemas/CarouselSchema.json",
            t.name = "轮播图",
            t.description = "用来渲染轮播图，可以配置每一页的内容（不只是图片），可以配置过渡动画。",
            t.tags = [],
            t.icon = "",
            t.scaffold = {
                type: "carousel",
                options: [{
                    image: "https://internal-amis-res.cdn.bcebos.com/images/2019-12/1577157239810/da6376bf988c.png"
                }, {
                    html: '<div style="width: 100%; height: 300px; background: #e3e3e3; text-align: center; line-height: 300px;">carousel data</div>'
                }, {
                    image: "https://internal-amis-res.cdn.bcebos.com/images/2019-12/1577157239810/da6376bf988c.png"
                }]
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "轮播图",
            t.panelControlsCreator = function(e) {
                var t = /\/field\/\w+$/.test(e.path);
                return [r.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [t ? {
                        type: "tpl",
                        inline: !1,
                        className: "text-info text-sm",
                        tpl: "<p>当前为字段内容节点配置，选择上层还有更多的配置。</p>"
                    } : null, {
                        type: "formula",
                        name: "__mode",
                        autoSet: !1,
                        formula: 'typeof this.name === "string" ? 1 : 2'
                    }, {
                        label: "数据源",
                        name: "__mode",
                        type: "button-group",
                        size: "xs",
                        mode: "inline",
                        className: "w-full",
                        options: [{
                            label: "关联字段",
                            value: 1
                        }, {
                            label: "静态设置",
                            value: 2
                        }]
                    }, {
                        label: "字段名",
                        name: "name",
                        type: "text",
                        description: "设置字段名，关联当前数据作用域中的数据。",
                        visibleOn: "this.__mode == 1"
                    }, {
                        type: "combo",
                        name: "options",
                        visibleOn: "this.__mode == 2",
                        label: "轮播选项内容",
                        multiple: !0,
                        multiLine: !0,
                        addable: !0,
                        removable: !0,
                        controls: [{
                            type: "group",
                            controls: [{
                                type: "text",
                                label: "内容",
                                name: "content",
                                size: "full"
                            }, {
                                type: "select",
                                label: "类型",
                                name: "type",
                                options: [{
                                    label: "html",
                                    value: "html"
                                }, {
                                    label: "image",
                                    value: "image"
                                }],
                                value: "image"
                            }]
                        }, {
                            type: "group",
                            controls: [{
                                type: "text",
                                label: "图片标题",
                                name: "title",
                                visibleOn: 'this.type == "image"'
                            }, {
                                type: "text",
                                label: "图片标题类名",
                                name: "titleClassName",
                                visibleOn: 'this.type == "image"'
                            }]
                        }, {
                            type: "group",
                            controls: [{
                                type: "text",
                                label: "图片描述",
                                name: "description",
                                visibleOn: 'this.type == "image"'
                            }, {
                                type: "text",
                                label: "图片描述类名",
                                name: "descriptionClassName",
                                visibleOn: 'this.type == "image"'
                            }]
                        }],
                        pipeIn: function(e) {
                            return Array.isArray(e) && e.length ? e.map((function(e) {
                                return e.html ? {
                                    type: "html",
                                    content: e.html
                                } : {
                                    type: "image",
                                    content: e.image,
                                    title: e.title,
                                    titleClassName: e.titleClassName,
                                    description: e.description,
                                    descriptionClassName: e.descriptionClassName
                                }
                            }
                            )) : []
                        },
                        pipeOut: function(e, t, a) {
                            return Array.isArray(e) && e.length ? e.map((function(e) {
                                return "html" === e.type ? {
                                    html: e.content
                                } : {
                                    image: e.content,
                                    title: e.title,
                                    titleClassName: e.titleClassName,
                                    description: e.description,
                                    descriptionClassName: e.descriptionClassName
                                }
                            }
                            )) : []
                        }
                    }]
                }, {
                    title: "外观",
                    controls: [{
                        name: "auto",
                        type: "switch",
                        mode: "inline",
                        className: "w-full",
                        label: "自动轮播"
                    }, {
                        name: "interval",
                        type: "range",
                        label: "动画间隔",
                        min: 1,
                        max: 10,
                        step: 1,
                        unit: "ms",
                        pipeIn: function(e) {
                            return (null != e ? e : 3e3) / 1e3
                        },
                        pipeOut: function(e, t, a) {
                            return 1e3 * e
                        }
                    }, {
                        name: "duration",
                        type: "range",
                        label: "动画时长",
                        min: 100,
                        max: 1e3,
                        step: 10,
                        pipeIn: r.defaultValue(500),
                        unit: "ms"
                    }, {
                        name: "animation",
                        label: "动画效果",
                        type: "button-group",
                        mode: "inline",
                        className: "w-full",
                        size: "sm",
                        pipeIn: r.defaultValue("fade"),
                        options: [{
                            label: "fade",
                            value: "fade"
                        }, {
                            label: "slide",
                            value: "slide"
                        }]
                    }, {
                        name: "controlsTheme",
                        label: "控制按钮主题",
                        type: "button-group",
                        size: "sm",
                        pipeIn: r.defaultValue("light"),
                        mode: "inline",
                        className: "w-full",
                        options: [{
                            label: "light",
                            value: "light"
                        }, {
                            label: "dark",
                            value: "dark"
                        }]
                    }, {
                        name: "controls",
                        label: "控制显示",
                        type: "button-group",
                        size: "sm",
                        mode: "inline",
                        className: "w-full",
                        pipeIn: r.defaultValue("dots,arrows"),
                        multiple: !0,
                        options: [{
                            label: "底部圆点",
                            value: "dots"
                        }, {
                            label: "左右箭头",
                            value: "arrows"
                        }]
                    }, {
                        name: "width",
                        type: "text",
                        label: "宽度",
                        validations: "isNumeric",
                        addOn: {
                            type: "button",
                            label: "px"
                        }
                    }, {
                        name: "height",
                        type: "text",
                        label: "高度",
                        validations: "isNumeric",
                        addOn: {
                            type: "button",
                            label: "px"
                        }
                    }, r.getSchemaTpl("className")]
                }, {
                    title: "其他",
                    controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.CarouselPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ChartPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = a(6)
      , c = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "chart",
            t.$schema = "https://isuda.baidu.com/schemas/ChartSchema.json",
            t.name = "图表",
            t.description = "用来渲染图表，基于 echarts 图表库，理论上 echarts 所有图表类型都支持。",
            t.tags = [],
            t.icon = "",
            t.scaffold = {
                type: "chart",
                config: {
                    xAxis: {
                        type: "category",
                        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                    },
                    yAxis: {
                        type: "value"
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: "line"
                    }]
                }
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "图表",
            t.panelControlsCreator = function(e) {
                return [s.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        type: "formula",
                        name: "_mode",
                        formula: 'typeof this.config === "undefined" ? "2" : "1"'
                    }, {
                        name: "_mode",
                        type: "button-group",
                        label: "数据设置方式",
                        size: "xs",
                        options: [{
                            label: "静态",
                            value: "1"
                        }, {
                            label: "接口获取",
                            value: "2"
                        }]
                    }, {
                        name: "config",
                        visibleOn: "this._mode != 2",
                        type: "json-editor",
                        label: "Echarts 静态配置",
                        size: "lg",
                        pipeIn: function(e) {
                            return e ? JSON.stringify(e, null, 2) : ""
                        },
                        pipeOut: function(e) {
                            try {
                                return e ? JSON.parse(e) : null
                            } catch (e) {}
                            return null
                        }
                    }, s.getSchemaTpl("api", {
                        visibleOn: "this._mode == 2",
                        label: "获取配置接口",
                        description: "通过此配置可以获取动态配置"
                    }), {
                        label: "初始是否拉取",
                        type: "switch",
                        name: "initFetch",
                        visibleOn: "data.api",
                        pipeIn: s.defaultValue(!0),
                        mode: "inline",
                        className: "block"
                    }, {
                        name: "interval",
                        label: "定时刷新间隔",
                        type: "number",
                        step: 500,
                        visibleOn: "this._mode == 2 && data.api",
                        description: "设置后将自动定时刷新，最小3000, 单位 ms"
                    }, {
                        name: "dataFilter",
                        type: "js-editor",
                        label: "数据加工",
                        size: "lg",
                        description: "\n              如果后端没有直接返回 Echart 配置，可以自己写一段函数来包装。\n              <p>签名：(config, echarts) => config</p>\n              <p>参数说明</p>\n              <ul>\n              <li><code>config</code> 原始数据</li>\n              <li><code>echarts</code> echarts 对象</li>\n              </ul>\n              <p>示例</p>\n              <pre>debugger; // 可以浏览器中断点调试\n\n// 查看原始数据\nconsole.log(config)\n\n// 返回新的结果 \nreturn {}</pre>\n              "
                    }, {
                        label: "Chart 配置完全替换？",
                        labelRemark: {
                            trigger: "click",
                            className: "m-l-xs",
                            rootClose: !0,
                            content: "默认为追加模式，新的配置会跟旧的配置合并，如果勾选将直接完全覆盖。",
                            placement: "left"
                        },
                        name: "replaceChartOption",
                        type: "switch",
                        mode: "inline",
                        className: "block"
                    }, {
                        name: "clickAction",
                        children: function(a) {
                            var n = a.onChange
                              , r = a.value;
                            return i.default.createElement("div", {
                                className: "m-b"
                            }, i.default.createElement(l.Button, {
                                size: "sm",
                                level: r ? "danger" : "info",
                                onClick: t.editDrillDown.bind(t, e.id)
                            }, "配置 DrillDown"), r ? i.default.createElement(l.Button, {
                                size: "sm",
                                level: "link",
                                className: "m-l",
                                onClick: function() {
                                    return n("")
                                }
                            }, "删除 DrillDown") : null)
                        }
                    }]
                }, {
                    title: "外观",
                    controls: [s.getSchemaTpl("className")]
                }, {
                    title: "其他",
                    controls: [s.getSchemaTpl("ref"), s.getSchemaTpl("name"), s.getSchemaTpl("visible")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.editDrillDown = function(e) {
            var t = this.manager
              , a = t.store
              , l = a.getNodeById(e)
              , i = a.getValueOf(e)
              , r = i.clickAction && i.clickAction.dialog || {
                title: "标题",
                body: ["<p>内容 <code>${value|json}</code></p>"]
            };
            l && i && this.manager.openSubEditor({
                title: "配置 DrillDown 详情",
                value: n.__assign({
                    type: "container"
                }, r),
                slot: {
                    type: "container",
                    body: "$$"
                },
                typeMutable: !1,
                onChange: function(e) {
                    e = n.__assign(n.__assign({}, i), {
                        clickAction: {
                            actionType: "dialog",
                            dialog: e
                        }
                    }),
                    t.panelChangeValue(e, d.diff(i, e))
                }
            })
        }
        ,
        t
    }(o.BasePlugin);
    t.ChartPlugin = c,
    r.registerEditorPlugin(c)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.CollapsePlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "collapse",
            t.$schema = "https://isuda.baidu.com/schemas/CollapseSchema.json",
            t.name = "折叠器",
            t.description = "折叠器，用户可以觉得是否将内容区展开或者收缩。",
            t.tags = [],
            t.icon = "",
            t.scaffold = {
                type: "collapse",
                body: "内容",
                title: "标题"
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "折叠器",
            t.panelControls = [r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    name: "title",
                    label: "标题",
                    type: "text",
                    required: !0
                }, {
                    name: "collapsable",
                    type: "switch",
                    mode: "inline",
                    className: "w-full",
                    label: "是否可折叠",
                    pipeIn: r.defaultValue(!0)
                }, {
                    name: "collapsed",
                    type: "switch",
                    mode: "inline",
                    className: "w-full",
                    label: "默认折叠？"
                }]
            }, {
                title: "外观",
                controls: [r.getSchemaTpl("className", {
                    pipeIn: r.defaultValue("bg-white wrapper")
                }), r.getSchemaTpl("className", {
                    name: "headingClassName",
                    label: "标题 CSS 类名",
                    pipeIn: r.defaultValue("font-thin b-b b-light text-lg p-b-xs")
                }), r.getSchemaTpl("className", {
                    name: "bodyClassName",
                    label: "内容 CSS 类名"
                })]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
            }])],
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.CollapsePlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ContainerPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "container",
            t.$schema = "https://isuda.baidu.com/schemas/ContainerSchema.json",
            t.name = "容器",
            t.description = "一个简单的容器，可以将多个渲染器放置在一起。",
            t.tags = [],
            t.icon = "",
            t.scaffold = {
                type: "container",
                body: "内容"
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.regions = [{
                key: "body",
                label: "内容区"
            }],
            t.panelTitle = "容器",
            t.panelControlsCreator = function(e) {
                return [r.getSchemaTpl("tabs", [{
                    title: "外观",
                    controls: [r.getSchemaTpl("className")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.ContainerPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.CRUDPlugin = void 0;
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = a(1)
      , r = a(2)
      , o = a(3)
      , s = a(6)
      , d = a(15)
      , c = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "crud",
            t.$schema = "https://isuda.baidu.com/schemas/CRUDSchema.json",
            t.order = -200,
            t.name = "增删改查",
            t.description = "用来实现对数据的增删改查，支持三种模式展示：table、cards和list. 负责数据的拉取，分页，单条操作，批量操作，排序，快速编辑等等功能。集成查询条件。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/crud",
            t.tags = ["功能", "容器"],
            t.icon = "fa fa-th",
            t.scaffold = {
                type: "crud",
                api: "",
                columns: [{
                    name: "id",
                    label: "ID",
                    type: "text"
                }, {
                    name: "engine",
                    label: "Rendering engine"
                }]
            },
            t.scaffoldForm = {
                title: "增删改查快速开始",
                controls: [{
                    name: "columns",
                    type: "combo",
                    multiple: !0,
                    label: !1,
                    addButtonText: "新增一列",
                    draggable: !0,
                    controls: [{
                        type: "text",
                        name: "label",
                        placeholder: "标题"
                    }, {
                        type: "text",
                        name: "name",
                        placeholder: "绑定字段名"
                    }, {
                        type: "select",
                        name: "type",
                        placeholder: "类型",
                        value: "text",
                        options: [{
                            value: "text",
                            label: "纯文本"
                        }, {
                            value: "tpl",
                            label: "模板"
                        }, {
                            value: "image",
                            label: "图片"
                        }, {
                            value: "date",
                            label: "日期"
                        }, {
                            value: "progress",
                            label: "进度"
                        }, {
                            value: "status",
                            label: "状态"
                        }, {
                            value: "mapping",
                            label: "映射"
                        }, {
                            value: "operation",
                            label: "操作栏"
                        }]
                    }]
                }],
                canRebuild: !0
            },
            t.multifactor = !0,
            t.previewSchema = {
                syncLocation: !1,
                type: "crud",
                className: "text-left",
                bodyClassName: "m-b-none",
                affixHeader: !1,
                data: {
                    items: [{
                        a: 1,
                        b: 2
                    }, {
                        a: 3,
                        b: 4
                    }, {
                        a: 5,
                        b: 6
                    }]
                },
                source: "${items}",
                columns: [{
                    label: "A",
                    name: "a"
                }, {
                    label: "B",
                    name: "b"
                }, {
                    type: "operation",
                    label: "操作",
                    buttons: [{
                        icon: "fa fa-eye",
                        type: "button"
                    }, {
                        icon: "fa fa-edit",
                        type: "button"
                    }]
                }]
            },
            t.panelTitle = "增删改查",
            t.panelControlsCreator = function(e) {
                t.manager.store;
                var a = e.id;
                return o.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        name: "filter",
                        type: "switch",
                        mode: "inline",
                        className: "block",
                        label: "启用查询条件",
                        pipeIn: function(e) {
                            return !!e
                        },
                        pipeOut: function(e, a) {
                            return e ? t.oldFilter || s.JSONPipeIn({
                                title: "查询条件",
                                controls: [{
                                    type: "text",
                                    name: "keywords",
                                    label: "关键字"
                                }]
                            }) : (t.oldFilter = a,
                            null)
                        }
                    }, {
                        type: "divider"
                    }, {
                        label: "批量操作",
                        name: "bulkActions",
                        type: "combo",
                        hiddenOn: "data.pickerMode && data.multiple",
                        inputClassName: "ae-BulkActions-control",
                        multiple: !0,
                        draggable: !0,
                        draggableTip: "",
                        scaffold: {
                            label: "按钮",
                            type: "button"
                        },
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "通过此可以管理批量操作按钮，只有设置了批量操作按钮才会出现选择框，可在外观中配置批量操作按钮位置。",
                            placement: "left"
                        },
                        controls: [{
                            type: "tpl",
                            tpl: '<span class="label label-success">${label}</span>',
                            columnClassName: "p-t-xs"
                        }, {
                            columnClassName: "p-t-xs col-edit",
                            children: function(e) {
                                var n = e.index;
                                return l.default.createElement("button", {
                                    onClick: t.handleBulkActionEdit.bind(t, a, n),
                                    "data-tooltip": "修改",
                                    "data-position": "bottom",
                                    className: "text-muted"
                                }, l.default.createElement("i", {
                                    className: "fa fa-pencil"
                                }))
                            }
                        }]
                    }, {
                        type: "divider"
                    }, {
                        label: "单条操作",
                        name: "itemActions",
                        type: "combo",
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "设置后，当鼠标悬停行数据上，会出现该操作按钮，同时顶部操作栏也会显示该按钮，勾选成员时与批量按钮智能切换。",
                            placement: "left"
                        },
                        hiddenOn: 'this.mode && this.mode !== "table" || this.pickerMode',
                        inputClassName: "ae-BulkActions-control",
                        multiple: !0,
                        draggable: !0,
                        scaffold: {
                            label: "按钮",
                            type: "button"
                        },
                        controls: [{
                            type: "tpl",
                            tpl: '<span class="label label-success">${label}</span>',
                            columnClassName: "p-t-xs"
                        }, {
                            type: "checkbox",
                            className: "text-xs",
                            option: "悬停隐藏",
                            name: "hiddenOnHover"
                        }, {
                            columnClassName: "p-t-xs col-edit",
                            children: function(e) {
                                var n = e.index;
                                return l.default.createElement("button", {
                                    onClick: t.handleItemActionEdit.bind(t, a, n),
                                    "data-tooltip": "修改",
                                    "data-position": "bottom",
                                    className: "text-muted"
                                }, l.default.createElement("i", {
                                    className: "fa fa-pencil"
                                }))
                            }
                        }]
                    }, {
                        type: "divider",
                        hiddenOn: 'this.mode && this.mode !== "table" || this.pickerMode'
                    }, {
                        name: "syncLocation",
                        label: "同步地址栏",
                        type: "switch",
                        mode: "inline",
                        className: "block",
                        pipeIn: o.defaultValue(!0),
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "开启后会把查询条件数据和分页信息同步到地址栏中，页面中出现多个时，建议只保留一个同步地址栏，否则会相互影响。",
                            placement: "left"
                        }
                    }, {
                        label: "默认参数",
                        type: "combo",
                        name: "defaultParams",
                        multiple: !0,
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "可以用来设置默认参数，比如 <code>perPage:20</code>",
                            placement: "left"
                        },
                        pipeIn: function(e) {
                            if (!s.isObject(e))
                                return e;
                            var t = [];
                            return Object.keys(e).forEach((function(a) {
                                "$$id" != a && t.push({
                                    key: a || "",
                                    value: "string" == typeof e[a] ? e[a] : JSON.stringify(e[a])
                                })
                            }
                            )),
                            t
                        },
                        pipeOut: function(e) {
                            if (!Array.isArray(e))
                                return e;
                            var t = {};
                            return e.forEach((function(e) {
                                var a = e.key || ""
                                  , n = e.value;
                                try {
                                    n = JSON.parse(n)
                                } catch (e) {}
                                t[a] = n
                            }
                            )),
                            t
                        },
                        controls: [{
                            placeholder: "Key",
                            type: "text",
                            unique: !0,
                            name: "key",
                            required: !0
                        }, {
                            placeholder: "Value",
                            type: "text",
                            name: "value"
                        }]
                    }, {
                        type: "divider"
                    }, {
                        name: "keepItemSelectionOnPageChange",
                        label: "保留条目选择",
                        type: "switch",
                        mode: "inline",
                        className: "block",
                        visbileOn: "this.bulkActions && this.bulkActions.length || this.itemActions && this.itemActions.length",
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "默认分页、搜索后，用户选择条目会被清空，开启此选项后会保留用户选择，可以实现跨页面批量操作。",
                            placement: "left"
                        }
                    }, {
                        name: "labelTpl",
                        type: "text",
                        label: "单条描述模板",
                        visibleOn: "this.keepItemSelectionOnPageChange",
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "开启【保留条目选择】后会把所有已选择条目列出来，此选项可以用来定制条目展示文案。",
                            placement: "left"
                        }
                    }, {
                        name: "primaryField",
                        label: "指定主键",
                        type: "text",
                        pipeIn: o.defaultValue("id"),
                        description: "默认<code>id</code>，用于批量操作获取行级数据"
                    }]
                }, {
                    title: "接口",
                    controls: [o.getSchemaTpl("api", {
                        label: "数据拉取接口",
                        sampleBuilder: function(e) {
                            var t = {
                                items: [],
                                total: 0
                            };
                            if (Array.isArray(e.columns)) {
                                var a = {};
                                e.columns.forEach((function(e) {
                                    e.name && d.setVariable(a, e.name, "sample")
                                }
                                )),
                                t.items.push(a)
                            }
                            return JSON.stringify({
                                status: 0,
                                msg: "",
                                data: t
                            }, null, 2)
                        }
                    }), {
                        name: "initFetch",
                        type: "radios",
                        label: "是否初始拉取",
                        pipeIn: function(e) {
                            return "boolean" == typeof e && e || "boolean" != typeof e && ""
                        },
                        inline: !0,
                        options: [{
                            label: "是",
                            value: !0
                        }, {
                            label: "否",
                            value: !1
                        }, {
                            label: "表达式",
                            value: ""
                        }]
                    }, {
                        name: "initFetch",
                        autoComplete: !1,
                        visibleOn: 'typeof this.initFetch !== "boolean"',
                        type: "text",
                        placeholder: "用 JS 表达式来决定",
                        className: "m-t-n-sm"
                    }, {
                        name: "loadDataOnce",
                        label: "一次性拉取",
                        type: "switch",
                        mode: "inline",
                        className: "block",
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "开启后，数据只会在初始的时候拉取，后续分页、排序不再请求接口，都由前端直接完成。",
                            placement: "left"
                        }
                    }, {
                        label: "开启定时刷新",
                        type: "switch",
                        name: "interval",
                        visibleOn: "data.api",
                        pipeIn: function(e) {
                            return !!e
                        },
                        pipeOut: function(e) {
                            return e ? 3e3 : void 0
                        },
                        mode: "inline",
                        className: "block"
                    }, {
                        name: "interval",
                        type: "number",
                        visibleOn: 'typeof data.interval === "number"',
                        step: 500,
                        className: "m-t-n-sm",
                        description: "设置后将自动定时刷新，单位 ms"
                    }, {
                        name: "silentPolling",
                        label: "静默刷新",
                        type: "switch",
                        mode: "inline",
                        visibleOn: "!!data.interval",
                        description: "设置自动定时刷新时是否显示loading"
                    }, {
                        name: "stopAutoRefreshWhen",
                        label: "停止定时刷新检测表达式",
                        type: "text",
                        visibleOn: "!!data.interval",
                        description: "定时刷新一旦设置会一直刷新，除非给出表达式，条件满足后则不刷新了。"
                    }, {
                        name: "stopAutoRefreshWhenModalIsOpen",
                        label: "当有弹框时关闭自动刷新",
                        type: "switch",
                        visibleOn: "!!data.interval",
                        mode: "inline",
                        className: "block",
                        description: "弹框打开关闭自动刷新，关闭弹框又恢复！"
                    }, {
                        type: "divider"
                    }, {
                        name: "draggable",
                        label: "是否可拖拽排序",
                        type: "switch",
                        mode: "inline",
                        className: "block"
                    }, o.getSchemaTpl("api", {
                        label: "顺序保存接口",
                        name: "saveOrderApi",
                        visibleOn: "data.draggable"
                    }), {
                        type: "divider"
                    }, o.getSchemaTpl("api", {
                        label: "快速保存接口",
                        name: "quickSaveApi",
                        description: "当 column 中设置了快速编辑后将使用此接口批量保存数据。"
                    }), {
                        type: "divider"
                    }, o.getSchemaTpl("api", {
                        label: "快速保存单条接口",
                        name: "quickSaveItemApi",
                        description: "当 column 中设置了快速编辑且设置了立即保存，将使用此接口保存数据。"
                    }), {
                        type: "divider"
                    }, {
                        label: "默认消息提示",
                        type: "combo",
                        name: "messages",
                        multiLine: !0,
                        description: "覆盖消息提示，如果不指定，将采用 api 返回的 message",
                        controls: [{
                            label: "获取成功提示",
                            type: "text",
                            name: "fetchSuccess"
                        }, {
                            label: "获取失败提示",
                            type: "text",
                            name: "fetchFailed"
                        }, {
                            label: "保存顺序成功提示",
                            type: "text",
                            name: "saveOrderSuccess"
                        }, {
                            label: "保存顺序失败提示",
                            type: "text",
                            name: "saveOrderFailed"
                        }, {
                            label: "快速保存成功提示",
                            type: "text",
                            name: "quickSaveSuccess"
                        }, {
                            label: "快速保存失败提示",
                            type: "text",
                            name: "quickSaveFailed"
                        }]
                    }]
                }, {
                    title: "外观",
                    controls: [{
                        label: "内容展示模式",
                        name: "mode",
                        type: "button-group",
                        size: "xs",
                        pipeIn: function(e, t) {
                            var a;
                            return null !== (a = "grid" === e ? "cards" : e) && void 0 !== a ? a : "table"
                        },
                        onChange: function(e, t, a, n) {
                            "table" === e ? (n.setValues({
                                columns: n.data.__columns || [{
                                    label: "ID",
                                    name: "id"
                                }, {
                                    label: "列信息",
                                    name: "name"
                                }],
                                __card: n.data.__card || n.data.card,
                                __listItem: n.data.__listItem || n.data.listItem
                            }),
                            n.deleteValueByName("card"),
                            n.deleteValueByName("listItem")) : "cards" === e ? (n.setValues({
                                card: n.data.__card || {
                                    type: "card",
                                    header: {
                                        title: "标题",
                                        subTitle: "副标题"
                                    },
                                    body: [{
                                        name: "a",
                                        label: "A"
                                    }, {
                                        name: "b",
                                        label: "B"
                                    }],
                                    actions: [{
                                        label: "详情",
                                        type: "button"
                                    }]
                                },
                                __columns: n.data.__columns || n.data.columns,
                                __listItem: n.data.__listItem || n.data.listItem
                            }),
                            n.deleteValueByName("columns"),
                            n.deleteValueByName("listItem")) : (n.setValues({
                                listItem: n.data.__listItem || {
                                    body: [{
                                        type: "tpl",
                                        tpl: "简单的展示数据：$a $b"
                                    }],
                                    actions: [{
                                        icon: "fa fa-eye",
                                        type: "button"
                                    }]
                                },
                                __columns: n.data.__columns || n.data.columns,
                                __card: n.data.__card || n.data.card
                            }),
                            n.deleteValueByName("columns"),
                            n.deleteValueByName("card"))
                        },
                        options: [{
                            value: "table",
                            label: "表格"
                        }, {
                            value: "cards",
                            label: "卡片"
                        }, {
                            value: "list",
                            label: "列表"
                        }]
                    }, {
                        name: "headerToolbar",
                        type: "combo",
                        draggable: !0,
                        draggableTip: "",
                        descrition: "非内建内容请在预览区选中后编辑",
                        label: "顶部工具栏配置",
                        pipeIn: function(e) {
                            return Array.isArray(e) || (e = e ? [e] : ["bulkActions", "pagination"]),
                            e.map((function(e) {
                                var t = e.type;
                                return "string" == typeof e && ~["bulkActions", "bulk-actions", "pagination", "statistics", "switch-per-page", "filter-toggler"].indexOf(e) ? e = {
                                    type: t = "bulkActions" === e ? "bulk-actions" : e
                                } : "string" == typeof e && (t = "tpl",
                                e = "string" == typeof e ? {
                                    type: "tpl",
                                    tpl: e
                                } : e),
                                n.__assign({
                                    type: t
                                }, e)
                            }
                            ))
                        },
                        pipeOut: function(e) {
                            return Array.isArray(e) ? e.map((function(e) {
                                return "button" === e.type ? s.JSONPipeIn(n.__assign({
                                    label: "按钮",
                                    type: "button"
                                }, e)) : "tpl" === e.type ? s.JSONPipeIn(n.__assign({
                                    type: "tpl",
                                    tpl: "内容"
                                }, e)) : e
                            }
                            )) : []
                        },
                        scaffold: {
                            type: "tpl",
                            tpl: "内容"
                        },
                        multiple: !0,
                        controls: [{
                            type: "select",
                            name: "type",
                            columnClassName: "w-ssm",
                            options: [{
                                value: "bulk-actions",
                                label: "操作栏"
                            }, {
                                value: "pagination",
                                label: "分页"
                            }, {
                                value: "statistics",
                                label: "统计数据"
                            }, {
                                value: "switch-per-page",
                                label: "切换页码"
                            }, {
                                value: "columns-toggler",
                                label: "列选择器",
                                visibleOn: '!this.mode || this.mode === "table"'
                            }, {
                                value: "filter-toggler",
                                label: "查询条件切换"
                            }, {
                                value: "drag-toggler",
                                label: "拖拽切换"
                            }, {
                                value: "check-all",
                                label: "全选",
                                hiddenOn: '!this.mode || this.mode === "table"'
                            }, {
                                value: "tpl",
                                label: "文本"
                            }, {
                                value: "button",
                                label: "按钮"
                            }]
                        }, {
                            name: "align",
                            placeholder: "对齐方式",
                            type: "select",
                            size: "xs",
                            options: [{
                                label: "左对齐",
                                value: "left"
                            }, {
                                label: "右对齐",
                                value: "right"
                            }]
                        }]
                    }, {
                        name: "footerToolbar",
                        type: "combo",
                        draggable: !0,
                        draggableTip: "",
                        descrition: "非内建内容请在预览区选中后编辑",
                        label: "底部工具栏配置",
                        pipeIn: function(e) {
                            return Array.isArray(e) || (e = e ? [e] : ["bulkActions", "pagination"]),
                            e.map((function(e) {
                                var t = e.type;
                                return "string" == typeof e && ~["bulkActions", "bulk-actions", "pagination", "statistics", "switch-per-page", "filter-toggler"].indexOf(e) ? e = {
                                    type: t = "bulkActions" === e ? "bulk-actions" : e
                                } : "string" == typeof e && (t = "tpl",
                                e = "string" == typeof e ? {
                                    type: "tpl",
                                    tpl: e
                                } : e),
                                n.__assign({
                                    type: t
                                }, e)
                            }
                            ))
                        },
                        pipeOut: function(e) {
                            return Array.isArray(e) ? e.map((function(e) {
                                return "button" === e.type ? s.JSONPipeIn(n.__assign({
                                    label: "按钮",
                                    type: "button"
                                }, e)) : "tpl" === e.type ? s.JSONPipeIn(n.__assign({
                                    type: "tpl",
                                    tpl: "内容"
                                }, e)) : e
                            }
                            )) : []
                        },
                        scaffold: {
                            type: "tpl",
                            tpl: "内容"
                        },
                        multiple: !0,
                        controls: [{
                            type: "select",
                            name: "type",
                            columnClassName: "w-ssm",
                            options: [{
                                value: "bulk-actions",
                                label: "操作栏"
                            }, {
                                value: "pagination",
                                label: "分页"
                            }, {
                                value: "statistics",
                                label: "统计数据"
                            }, {
                                value: "switch-per-page",
                                label: "切换页码"
                            }, {
                                value: "columns-toggler",
                                label: "列选择器",
                                hiddenOn: '["grid", "cards", "list"].indexOf(this.mode)'
                            }, {
                                value: "filter-toggler",
                                label: "查询条件切换"
                            }, {
                                value: "drag-toggler",
                                label: "拖拽切换"
                            }, {
                                value: "check-all",
                                label: "全选",
                                hiddenOn: '!this.mode || this.mode === "table"'
                            }, {
                                value: "tpl",
                                label: "文本"
                            }, {
                                value: "button",
                                label: "按钮"
                            }]
                        }, {
                            name: "align",
                            placeholder: "对齐方式",
                            size: "xs",
                            type: "select",
                            options: [{
                                label: "左对齐",
                                value: "left"
                            }, {
                                label: "右对齐",
                                value: "right"
                            }]
                        }, {
                            type: "remark",
                            content: "详情请在预览区域选中后进行编辑。",
                            trigger: ["click"],
                            rootClose: !0,
                            placement: "left",
                            visibleOn: '!~["bulkActions", "drag-toggler", "check-all", "bulk-actions", "pagination", "statistics", "switch-per-page", "filter-toggler", "load-more"].indexOf(this.type)',
                            columnClassName: "no-grow w-3x p-t-xs",
                            className: "m-l-none"
                        }]
                    }, {
                        name: "filterTogglable",
                        type: "switch",
                        label: "是否可显隐查询条件",
                        mode: "inline",
                        className: "block",
                        visibleOn: "data.filter"
                    }, {
                        name: "filterDefaultVisible",
                        type: "switch",
                        label: "查询条件默认是否可见",
                        pipeIn: o.defaultValue(!0),
                        mode: "inline",
                        className: "block",
                        visibleOn: "data.filter && data.filterTogglable"
                    }, {
                        name: "hideQuickSaveBtn",
                        label: "隐藏顶部快速保存提示",
                        type: "switch",
                        mode: "inline",
                        className: "block"
                    }, {
                        name: "hideCheckToggler",
                        type: "switch",
                        label: "隐藏选择按钮",
                        mode: "inline",
                        className: "block",
                        visibleOn: "data.checkOnItemClick"
                    }, o.getSchemaTpl("className"), o.getSchemaTpl("className", {
                        name: "bodyClassName",
                        label: "内容 CSS 类名"
                    })]
                }, {
                    title: "其他",
                    controls: [o.getSchemaTpl("ref"), {
                        name: "source",
                        label: "数据源",
                        type: "text",
                        description: "不填写，默认读取接口返回的 items 或者 rows 属性，如果是别的，请在此设置，如： <code>\\${xxxx}</code>"
                    }, {
                        name: "pageField",
                        label: "页码字段名",
                        type: "text",
                        pipeIn: o.defaultValue("page")
                    }, {
                        name: "perPageField",
                        label: "分页步长字段名",
                        type: "text",
                        pipeIn: o.defaultValue("perPage")
                    }, {
                        name: "orderField",
                        label: "排序权重字段",
                        type: "text",
                        labelRemark: {
                            className: "m-l-xs",
                            trigger: "click",
                            rootClose: !0,
                            content: "设置用来确定位置的字段名，设置后新的顺序将被赋值到该字段中。",
                            placement: "left"
                        }
                    }, {
                        name: "perPageAvailable",
                        label: "切换每页数",
                        type: "text",
                        multiple: !0,
                        hiddenOn: "data.loadDataOnce",
                        pipeIn: function(e) {
                            return Array.isArray(e) ? e : e ? e.split(",") : ""
                        },
                        pipeOut: function(e) {
                            return Array.isArray(e) ? e : e ? e.split(",") : ""
                        },
                        options: ["5", "10", "20", "50", "100"]
                    }, o.getSchemaTpl("name"), {
                        name: "itemCheckableOn",
                        type: "text",
                        label: "配置单条可选中的表达式",
                        description: "请使用 js 表达式，不设置的话每条都可选中。",
                        visibleOn: "data.bulkActions && data.bulkActions.length || data.pickerMode"
                    }, {
                        name: "checkOnItemClick",
                        type: "switch",
                        label: "开启单条点击整个区域选中",
                        mode: "inline",
                        className: "block",
                        visibleOn: "data.bulkActions && data.bulkActions.length || data.pickerMode"
                    }, {
                        name: "autoJumpToTopOnPagerChange",
                        type: "switch",
                        label: "自动跳顶部",
                        mode: "inline",
                        className: "block",
                        description: "当切分页的时候，是否自动跳顶部。"
                    }, {
                        name: "syncResponse2Query",
                        type: "switch",
                        label: "同步查询条件",
                        mode: "inline",
                        className: "block",
                        description: "每次查询后，将返回的数据同步到查询条件上。"
                    }]
                }])
            }
            ,
            t.wrapperProps = {
                affixHeader: !1
            },
            t
        }
        return n.__extends(t, e),
        t.prototype.handleBulkActionEdit = function(e, t) {
            var a = this.manager.store
              , n = a.getSchema(e)
              , l = null == n ? void 0 : n.bulkActions[t];
            l && l.$$id && a.setActiveId(l.$$id)
        }
        ,
        t.prototype.handleItemActionEdit = function(e, t) {
            var a = this.manager.store
              , n = a.getSchema(e)
              , l = null == n ? void 0 : n.itemActions[t];
            l && l.$$id && a.setActiveId(l.$$id)
        }
        ,
        t.prototype.renderEditableComponents = function(e) {
            var t = e.render
              , a = e.bulkActions
              , i = e.itemActions
              , r = [];
            return Array.isArray(a) && a.length && r.push(l.default.createElement("div", {
                key: "bulkActions",
                className: "ae-EditableRender"
            }, l.default.createElement("div", {
                className: "ae-EditableRender-title"
            }, "批量操作"), l.default.createElement("div", {
                className: "ae-EditableRender-body"
            }, a.map((function(e) {
                return t("bulk-action", n.__assign({
                    type: "button",
                    size: "sm"
                }, e), {
                    key: e.$$id
                })
            }
            ))))),
            Array.isArray(i) && i.length && r.push(l.default.createElement("div", {
                key: "itemActions",
                className: "ae-EditableRender"
            }, l.default.createElement("div", {
                className: "ae-EditableRender-title"
            }, "单条操作"), l.default.createElement("div", {
                className: "ae-EditableRender-body"
            }, i.map((function(e) {
                return t("bulk-action", n.__assign({
                    type: "button",
                    size: "sm"
                }, e), {
                    key: e.$$id
                })
            }
            ))))),
            r.length ? l.default.createElement("div", {
                className: "ae-EditableRenderers"
            }, l.default.createElement("div", {
                className: "ae-EditableRenderers-tip"
            }, "「增删改查」编辑辅助区"), r) : null
        }
        ,
        t.prototype.renderRenderer = function(e) {
            var t = e.$$editor.renderer;
            return l.default.createElement("div", {
                className: "ae-CRUDEditor"
            }, this.renderEditableComponents(e), l.default.createElement(t.component, n.__assign({}, e)))
        }
        ,
        t.prototype.filterProps = function(e) {
            return e.pickerMode && (e.options = e.data.options),
            e
        }
        ,
        t.prototype.afterUpdate = function(e) {
            var t, a = this, n = e.context;
            n.info.plugin === this && (null === (t = n.diff) || void 0 === t ? void 0 : t.some((function(e) {
                var t;
                return "mode" === (null === (t = e.path) || void 0 === t ? void 0 : t.join("."))
            }
            ))) && setTimeout((function() {
                a.manager.buildPanels(),
                a.manager.buildToolbars()
            }
            ), 20)
        }
        ,
        t
    }(r.BasePlugin);
    t.CRUDPlugin = c,
    i.registerEditorPlugin(c)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DatetimePlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "datetime-field",
            t.name = "日期时间展示",
            t
        }
        return n.__extends(t, e),
        t
    }(a(26).DatePlugin);
    t.DatetimePlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DiffEditorPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = a(25)
      , s = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "diff-editor",
            t.$schema = "https://isuda.baidu.com/schemas/DiffEditorControlSchema.json",
            t.name = "Diff查看器",
            t.description = "可以用来展示配置或者代码的 Diff 结果。",
            t.tags = [],
            t.icon = "",
            t.scaffold = {
                type: "diff-editor",
                label: "diff编辑器"
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "Diff框",
            t.panelControls = [r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    type: "textarea",
                    name: "diffValue",
                    label: "左侧默认值",
                    pipeOut: r.valuePipeOut,
                    description: "支持使用 <code>\\${xxx}</code> 来获取变量"
                }, {
                    type: "textarea",
                    name: "value",
                    label: "右侧默认值",
                    pipeOut: r.valuePipeOut
                }, {
                    label: "语言",
                    name: "language",
                    type: "select",
                    value: "javascript",
                    searchable: !0,
                    options: o.availableLanguages.concat()
                }]
            }, {
                title: "外观",
                controls: [{
                    name: "size",
                    type: "button-group",
                    size: "xs",
                    pipeIn: r.defaultValue(""),
                    options: [{
                        label: "默认",
                        value: ""
                    }, {
                        label: "中",
                        value: "md"
                    }, {
                        label: "大",
                        value: "lg"
                    }, {
                        label: "加大",
                        value: "xl"
                    }, {
                        label: "加加大",
                        value: "xxl"
                    }]
                }, r.getSchemaTpl("className")]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
            }])],
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.DiffEditorPlugin = s,
    l.registerEditorPlugin(s)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DividerPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "divider",
            t.$schema = "https://isuda.baidu.com/schemas/DividerSchema.json",
            t.name = "分隔线",
            t.description = "用来展示一个分割线，可用来做视觉上的隔离。",
            t.scaffold = {
                type: "divider"
            },
            t.previewSchema = {
                type: "divider",
                className: "m-t-none m-b-none"
            },
            t.panelTitle = "分隔线",
            t.panelControls = r.getSchemaTpl("tabs", [{
                title: "外观",
                controls: [r.getSchemaTpl("className")]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
            }]),
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.DividerPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DrawerPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = a(6)
      , s = a(37)
      , d = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "drawer",
            t.$schema = "https://isuda.baidu.com/schemas/DrawerSchema.json",
            t.name = "抽出式弹框",
            t.wrapperProps = {
                wrapperComponent: s.InlineModal,
                onClose: o.noop,
                resizable: !1
            },
            t.regions = [{
                key: "body",
                label: "内容区",
                renderMethod: "renderBody",
                renderMethodOverride: function(e, t) {
                    return function() {
                        for (var a = [], n = 0; n < arguments.length; n++)
                            a[n] = arguments[n];
                        var l = this.props.$$editor
                          , i = this.super.apply(this, a);
                        return l && "body" === a[1] ? t(this, i, e, l, l.plugin.manager) : i
                    }
                }
            }, {
                key: "footer",
                label: "底部",
                renderMethod: "renderFooter",
                wrapperResolve: function(e) {
                    return e
                }
            }],
            t.panelTitle = "弹框",
            t.panelControls = [r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    label: "标题",
                    type: "text",
                    name: "title"
                }, {
                    type: "divider"
                }, {
                    label: "位置",
                    type: "button-group",
                    name: "position",
                    value: "right",
                    size: "sm",
                    mode: "inline",
                    className: "block",
                    options: [{
                        label: "左",
                        value: "left"
                    }, {
                        label: "上",
                        value: "top"
                    }, {
                        label: "右",
                        value: "right"
                    }, {
                        label: "下",
                        value: "bottom"
                    }],
                    description: "定义弹框从什么位置呼出"
                }, {
                    type: "switch",
                    label: "数据映射",
                    name: "data",
                    mode: "inline",
                    className: "w-full m-b-xs",
                    pipeIn: function(e) {
                        return !!e
                    },
                    pipeOut: function(e) {
                        return e ? {
                            "&": "$$"
                        } : null
                    }
                }, {
                    type: "tpl",
                    visibleOn: "!this.data",
                    tpl: '<p class="text-sm text-muted">当没开启数据映射时，弹框中默认会拥有触发打开弹框按钮所在环境的所有数据。</p>'
                }, {
                    type: "combo",
                    syncDefaultValue: !1,
                    name: "data",
                    visibleOn: "this.data",
                    descriptionClassName: "help-block text-xs m-b-none",
                    description: '<p>当开启数据映射时，弹框中的数据只会包含设置的部分，请绑定数据。如：<code>{"a": "\\${a}", "b": 2}</code></p><p>如果希望在默认的基础上定制，请先添加一个 Key 为 `&` Value 为 `\\$$` 作为第一行。</p><div>当值为 <code>__undefined</code>时，表示删除对应的字段，可以结合<code>{"&": "\\$$"}</code>来达到黑名单效果。</div>',
                    multiple: !0,
                    pipeIn: function(e) {
                        if (!o.isObject(e))
                            return e;
                        var t = [];
                        return Object.keys(e).forEach((function(a) {
                            t.push({
                                key: a || "",
                                value: "string" == typeof e[a] ? e[a] : JSON.stringify(e[a])
                            })
                        }
                        )),
                        t
                    },
                    pipeOut: function(e) {
                        if (!Array.isArray(e))
                            return e;
                        var t = {};
                        return e.forEach((function(e) {
                            var a = e.key || ""
                              , n = e.value;
                            try {
                                n = JSON.parse(n)
                            } catch (e) {}
                            t[a] = n
                        }
                        )),
                        t
                    },
                    controls: [{
                        placeholder: "Key",
                        type: "text",
                        unique: !0,
                        name: "key"
                    }, {
                        placeholder: "Value",
                        type: "text",
                        name: "value"
                    }]
                }, {
                    type: "switch",
                    name: "closeOnOutside",
                    label: "点击外部关闭弹框",
                    mode: "inline",
                    className: "block"
                }, {
                    label: "按 Esc 可关闭？",
                    type: "switch",
                    name: "closeOnEsc",
                    mode: "inline",
                    className: "block"
                }]
            }, {
                title: "外观",
                controls: [{
                    label: "尺寸",
                    type: "button-group",
                    name: "size",
                    size: "sm",
                    mode: "inline",
                    className: "block",
                    options: [{
                        label: "超小",
                        value: "xs"
                    }, {
                        label: "小",
                        value: "sm"
                    }, {
                        label: "中",
                        value: "md"
                    }, {
                        label: "大",
                        value: "lg"
                    }, {
                        label: "超大",
                        value: "xl"
                    }]
                }, {
                    type: "switch",
                    name: "overlay",
                    label: "是否显示蒙层",
                    mode: "inline",
                    className: "block",
                    pipeIn: r.defaultValue(!0)
                }, {
                    type: "switch",
                    name: "resizable",
                    label: "可拉拽",
                    mode: "inline",
                    className: "block",
                    pipeIn: r.defaultValue(!1),
                    description: "定义弹框是否可拉拽调整大小"
                }, r.getSchemaTpl("className"), r.getSchemaTpl("className", {
                    label: "bodyClassName 类名",
                    name: "bodyClassName"
                })]
            }])],
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function() {}
        ,
        t
    }(i.BasePlugin);
    t.DrawerPlugin = d,
    l.registerEditorPlugin(d)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.DropDownButtonPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = a(6)
      , c = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "dropdown-button",
            t.$schema = "https://isuda.baidu.com/schemas/DropdownButtonSchema.json",
            t.name = "下拉按钮",
            t.description = "下拉按钮，更多的按钮通过点击后展示开来。",
            t.tags = ["按钮"],
            t.icon = "",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/dropdown-button",
            t.scaffold = {
                type: "dropdown-button",
                label: "下拉按钮",
                buttons: [{
                    type: "button",
                    label: "按钮1",
                    actionType: "dialog",
                    dialog: {
                        title: "系统提示",
                        body: "对你点击了"
                    }
                }, {
                    type: "button",
                    label: "按钮2",
                    actionType: "dialog",
                    dialog: {
                        title: "系统提示",
                        body: "对你点击了"
                    }
                }]
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "下拉按钮",
            t.panelControlsCreator = function(e) {
                return s.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        children: i.default.createElement(l.Button, {
                            level: "info",
                            size: "sm",
                            className: "m-b-sm",
                            block: !0,
                            onClick: t.editDetail.bind(t, e.id)
                        }, "配置下拉按钮集合")
                    }, {
                        label: "名称",
                        type: "text",
                        name: "label"
                    }, {
                        name: "closeOnOutside",
                        label: "点击外部关闭",
                        type: "switch",
                        mode: "inline",
                        className: "block",
                        pipeIn: s.defaultValue(!0)
                    }, {
                        name: "closeOnClick",
                        label: "点击内容关闭",
                        type: "switch",
                        mode: "inline",
                        className: "block"
                    }]
                }, {
                    title: "外观",
                    controls: [s.getSchemaTpl("size"), {
                        label: "展示样式",
                        type: "button-group",
                        size: "xs",
                        name: "level",
                        btnActiveClassName: "active",
                        clearable: !1,
                        options: [{
                            label: "默认",
                            value: "default",
                            level: "default"
                        }, {
                            label: "无",
                            value: "link",
                            level: "link"
                        }, {
                            label: "主色",
                            value: "primary",
                            level: "primary"
                        }, {
                            label: "提示",
                            value: "info",
                            level: "info"
                        }, {
                            label: "成功",
                            value: "success",
                            level: "success"
                        }, {
                            label: "警告",
                            value: "warning",
                            level: "warning"
                        }, {
                            label: "严重",
                            value: "danger",
                            level: "danger"
                        }]
                    }, s.getSchemaTpl("className")]
                }, {
                    title: "其他",
                    controls: [s.getSchemaTpl("ref"), s.getSchemaTpl("disabled"), s.getSchemaTpl("visible")]
                }])
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.buildEditorToolbar = function(e, t) {
            var a = e.id;
            "dropdown-button" === e.info.renderer.name && t.push({
                icon: "fa fa-expand",
                order: 100,
                tooltip: "配置下拉按钮集合",
                onClick: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.editDetail = function(e) {
            var t = this.manager
              , a = t.store
              , l = a.getNodeById(e)
              , i = a.getValueOf(e);
            l && i && this.manager.openSubEditor({
                title: "配置下拉按钮集合",
                value: i.buttons,
                slot: {
                    type: "button-group",
                    buttons: "$$",
                    block: !0
                },
                onChange: function(e) {
                    e = n.__assign(n.__assign({}, i), {
                        buttons: e
                    }),
                    t.panelChangeValue(e, d.diff(i, e))
                }
            })
        }
        ,
        t.prototype.buildEditorContextMenu = function(e, t) {
            var a = e.id;
            e.schema,
            e.region;
            "dropdown-button" === e.info.renderer.name && t.push("|", {
                label: "配置下拉按钮集合",
                onSelect: this.editDetail.bind(this, a)
            })
        }
        ,
        t
    }(o.BasePlugin);
    t.DropDownButtonPlugin = c,
    r.registerEditorPlugin(c)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.EachPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = a(6)
      , c = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "each",
            t.$schema = "https://isuda.baidu.com/schemas/EachSchema.json",
            t.name = "循环 Each",
            t.description = "功能渲染器，可以基于现有变量循环输出渲染器。",
            t.tags = ["功能"],
            t.icon = "",
            t.scaffold = {
                type: "each",
                name: "arr",
                items: {
                    type: "tpl",
                    tpl: "<%= data.index + 1 %>. 内容：<%= data.item %>",
                    inline: !1
                }
            },
            t.previewSchema = n.__assign(n.__assign({}, t.scaffold), {
                value: ["a", "b", "c"]
            }),
            t.panelTitle = "循环",
            t.panelControlsCreator = function(e) {
                return [{
                    type: "text",
                    name: "name",
                    label: "关联字段",
                    placeholder: "varname",
                    description: "如果所在容器有下发 value 则不需要配置，如果没有请配置变量名，支持多层级如：a.b，表示关联a对象下的b属性。目标变量可以是数组，也可以是对象。"
                }, {
                    children: i.default.createElement(l.Button, {
                        size: "sm",
                        level: "danger",
                        className: "m-b",
                        block: !0,
                        onClick: t.editDetail.bind(t, e.id)
                    }, "配置成员渲染器")
                }, {
                    name: "placeholder",
                    type: "text",
                    label: "占位符",
                    pipeIn: s.defaultValue("暂无内容"),
                    description: "当没有关联变量，或者目标变量不是数组或者对象时显示此占位信息"
                }, s.getSchemaTpl("className")]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.filterProps = function(e) {
            return (e = d.JSONPipeOut(e, !0)).value || (e.value = [{
                item: "mocked data"
            }]),
            e
        }
        ,
        t.prototype.buildEditorToolbar = function(e, t) {
            var a = e.id;
            "each" === e.info.renderer.name && t.push({
                icon: "fa fa-expand",
                order: 100,
                tooltip: "配置成员渲染器",
                onClick: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.buildEditorContextMenu = function(e, t) {
            var a = e.id;
            e.schema,
            e.region;
            "each" === e.info.renderer.name && t.push("|", {
                label: "配置成员渲染器",
                onSelect: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.editDetail = function(e) {
            var t = this.manager
              , a = t.store
              , l = a.getNodeById(e)
              , i = a.getValueOf(e);
            l && i && this.manager.openSubEditor({
                title: "配置成员渲染器",
                value: i.items,
                slot: {
                    type: "container",
                    body: "$$"
                },
                typeMutable: !0,
                onChange: function(e) {
                    e = n.__assign(n.__assign({}, i), {
                        items: e
                    }),
                    t.panelChangeValue(e, d.diff(i, e))
                },
                data: {
                    item: "mocked data",
                    index: 0
                }
            })
        }
        ,
        t.prototype.buildSubRenderers = function(t, a) {
            if ("form" !== t.info.renderer.name && !t.node.childRegions.some((function(e) {
                return "controls" === e.region
            }
            )))
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(o.BasePlugin);
    t.EachPlugin = c,
    r.registerEditorPlugin(c)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.GridPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "grid",
            t.$schema = "https://isuda.baidu.com/schemas/GridSchema.json",
            t.regions = [{
                key: "columns",
                label: "列集合",
                renderMethod: "renderColumns"
            }],
            t.name = "Grid",
            t.description = "用来做格子布局的，将一行分成12等份，可以给每一列设置占比。",
            t.tags = ["容器"],
            t.icon = "fa fa-columns",
            t.scaffold = {
                type: "grid",
                columns: [{
                    type: "tpl",
                    tpl: "第一列",
                    inline: !1
                }, {
                    type: "tpl",
                    tpl: "第二列",
                    inline: !1
                }]
            },
            t.previewSchema = {
                type: "grid",
                columns: [{
                    type: "tpl",
                    tpl: "占比 4/12",
                    inline: !1,
                    sm: 4,
                    md: 4,
                    className: "bg-primary"
                }, {
                    type: "tpl",
                    tpl: "占比 8/12",
                    className: "bg-info",
                    inline: !1,
                    sm: 8,
                    md: 8
                }]
            },
            t.panelTitle = "格子布局",
            t.panelControls = [{
                children: i.default.createElement(l.Button, {
                    level: "info",
                    size: "sm",
                    className: "m-t-sm m-b-sm",
                    onClick: function() {
                        return t.manager.showInsertPanel("columns")
                    },
                    block: !0
                }, "新增一列")
            }, s.getSchemaTpl("className"), {
                type: "alert",
                body: "「格子详情」请点选成员节点，然后选择格子面板进行设置。"
            }],
            t.vRendererConfig = {
                panelTitle: "格子",
                panelControlsCreator: function(e) {
                    return [s.getSchemaTpl("className", {
                        label: "格子 CSS 类名",
                        name: "columnClassName"
                    }), {
                        type: "switch",
                        name: "__mode",
                        label: "宽度自动分配",
                        mode: "inline",
                        className: "block",
                        pipeIn: function(e, t) {
                            return !(t.xs || t.sm || t.md || t.lg)
                        },
                        columnClassName: "w-xs v-middle",
                        onChange: function(e, t, a, n) {
                            e ? (n.deleteValueByName("xsHidden"),
                            n.deleteValueByName("xs"),
                            n.deleteValueByName("smHidden"),
                            n.deleteValueByName("sm"),
                            n.deleteValueByName("mdHidden"),
                            n.deleteValueByName("md"),
                            n.deleteValueByName("lgHidden"),
                            n.deleteValueByName("lg")) : n.setValues({
                                xs: 6
                            })
                        }
                    }, {
                        type: "tabs",
                        visibleOn: "this.xs || this.sm || this.md || this.lg",
                        tabs: [{
                            title: "xs",
                            controls: [{
                                type: "switch",
                                name: "xsHidden",
                                label: "是否隐藏",
                                mode: "inline",
                                className: "block",
                                pipeIn: s.defaultValue("false")
                            }, {
                                label: "宽度占比",
                                type: "range",
                                name: "xs",
                                min: 1,
                                max: 12,
                                step: 1,
                                pipeIn: s.defaultValue(6)
                            }]
                        }, {
                            title: "sm",
                            controls: [{
                                type: "switch",
                                name: "xsHidden",
                                label: "是否隐藏",
                                mode: "inline",
                                className: "block",
                                pipeIn: s.defaultValue("false")
                            }, {
                                label: "宽度占比",
                                type: "range",
                                name: "sm",
                                min: 1,
                                max: 12,
                                step: 1,
                                pipeIn: s.defaultValue(6)
                            }]
                        }, {
                            title: "md",
                            controls: [{
                                type: "switch",
                                name: "mdHidden",
                                label: "是否隐藏",
                                mode: "inline",
                                className: "block",
                                pipeIn: s.defaultValue("false")
                            }, {
                                label: "宽度占比",
                                type: "range",
                                name: "md",
                                min: 1,
                                max: 12,
                                step: 1,
                                pipeIn: s.defaultValue(6)
                            }]
                        }, {
                            title: "lg",
                            controls: [{
                                type: "switch",
                                name: "lgHidden",
                                label: "是否隐藏",
                                mode: "inline",
                                className: "block",
                                pipeIn: s.defaultValue("false")
                            }, {
                                label: "宽度占比",
                                type: "range",
                                name: "lg",
                                min: 1,
                                max: 12,
                                step: 1,
                                pipeIn: s.defaultValue(6)
                            }]
                        }]
                    }, {
                        children: i.default.createElement(l.Button, {
                            size: "sm",
                            level: "info",
                            className: "m-b",
                            block: !0,
                            onClick: t.exchangeRenderer.bind(t, e.id)
                        }, "更改渲染器类型")
                    }]
                }
            },
            t
        }
        return n.__extends(t, e),
        t.prototype.exchangeRenderer = function(e) {
            this.manager.showReplacePanel(e)
        }
        ,
        t.prototype.buildEditorPanel = function(t, a) {
            var n, l;
            e.prototype.buildEditorPanel.call(this, t, a);
            var i = null === (n = t.node.parent) || void 0 === n ? void 0 : n.host;
            (null === (l = null == i ? void 0 : i.info) || void 0 === l ? void 0 : l.plugin) === this && (this.vRendererConfig.panelControls || this.vRendererConfig.panelControlsCreator) && a.push({
                key: "grid",
                icon: this.vRendererConfig.panelIcon || "fa fa-tablet",
                title: this.vRendererConfig.panelTitle || "格子",
                order: 100,
                render: this.manager.makeSchemaFormRender({
                    controls: this.vRendererConfig.panelControlsCreator ? this.vRendererConfig.panelControlsCreator(t) : this.vRendererConfig.panelControls
                })
            })
        }
        ,
        t.prototype.afterResolveJsonSchema = function(e) {
            var t, a, n = null === (t = e.context.node.parent) || void 0 === t ? void 0 : t.host;
            (null === (a = null == n ? void 0 : n.info) || void 0 === a ? void 0 : a.plugin) === this && e.setData("https://isuda.baidu.com/schemas/GridColumn.json")
        }
        ,
        t.prototype.renderRenderer = function(e) {
            var t = e.$$editor.renderer;
            return Array.isArray(e.columns) && e.columns.length ? i.default.createElement(t.component, n.__assign({}, e)) : this.renderPlaceholder("内容为空", e.key)
        }
        ,
        t
    }(o.BasePlugin);
    t.GridPlugin = d,
    r.registerEditorPlugin(d)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.HBoxPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "hbox",
            t.$schema = "https://isuda.baidu.com/schemas/HBoxSchema.json",
            t.name = "HBox",
            t.description = "用来实现左右排版布局，默认平均分配，可以通过 columnClassName 配置某列的宽度。",
            t.tags = ["容器"],
            t.icon = "",
            t.scaffold = {
                type: "hbox",
                columns: [{
                    type: "tpl",
                    tpl: "第一列",
                    inline: !1
                }, {
                    type: "tpl",
                    tpl: "第二列",
                    inline: !1
                }]
            },
            t.previewSchema = {
                type: "hbox",
                columns: [{
                    type: "tpl",
                    tpl: "固定宽度<br />w-xs",
                    columnClassName: "bg-primary w-xs"
                }, {
                    type: "tpl",
                    tpl: "自动填满",
                    columnClassName: "bg-info"
                }]
            },
            t.panelTitle = "HBox",
            t.panelControls = [{
                name: "columns",
                label: "列集合",
                type: "combo",
                scaffold: {
                    type: "tpl",
                    tpl: "列内容",
                    inline: !1
                },
                minLength: 2,
                multiple: !0,
                draggableTip: "",
                controls: [{
                    type: "tpl",
                    tpl: '<span class="label label-default">列${index | plus}</span>',
                    columnClassName: "no-grow v-middle"
                }, s.getSchemaTpl("className", {
                    name: "columnClassName",
                    labelRemark: "",
                    label: ""
                })]
            }, s.getSchemaTpl("className"), s.getSchemaTpl("visible")],
            t.regions = [{
                key: "columns",
                label: "列集合",
                renderMethod: "renderColumns",
                dndMode: "position-h"
            }],
            t.vRendererConfig = {
                panelTitle: "列",
                panelControlsCreator: function(e) {
                    return [s.getSchemaTpl("className", {
                        name: "columnClassName",
                        label: "列 CSS 类名",
                        description: "可以添加宽度类样式调整宽度，默认宽度为平均分配。"
                    }), {
                        children: i.default.createElement(l.Button, {
                            size: "sm",
                            level: "info",
                            className: "m-b",
                            block: !0,
                            onClick: t.exchangeRenderer.bind(t, e.id)
                        }, "更改渲染器类型")
                    }]
                }
            },
            t
        }
        return n.__extends(t, e),
        t.prototype.exchangeRenderer = function(e) {
            this.manager.showReplacePanel(e)
        }
        ,
        t.prototype.buildEditorPanel = function(t, a) {
            var n, l;
            e.prototype.buildEditorPanel.call(this, t, a);
            var i = null === (n = t.node.parent) || void 0 === n ? void 0 : n.host;
            (null === (l = null == i ? void 0 : i.info) || void 0 === l ? void 0 : l.plugin) === this && (this.vRendererConfig.panelControls || this.vRendererConfig.panelControlsCreator) && a.push({
                key: "grid",
                order: 100,
                icon: this.vRendererConfig.panelIcon || "fa fa-tablet",
                title: this.vRendererConfig.panelTitle || "格子",
                render: this.manager.makeSchemaFormRender({
                    controls: this.vRendererConfig.panelControlsCreator ? this.vRendererConfig.panelControlsCreator(t) : this.vRendererConfig.panelControls
                })
            })
        }
        ,
        t.prototype.afterResolveJsonSchema = function(e) {
            var t, a, n = null === (t = e.context.node.parent) || void 0 === t ? void 0 : t.host;
            (null === (a = null == n ? void 0 : n.info) || void 0 === a ? void 0 : a.plugin) === this && e.setData("https://isuda.baidu.com/schemas/HBoxColumn.json")
        }
        ,
        t
    }(o.BasePlugin);
    t.HBoxPlugin = d,
    r.registerEditorPlugin(d)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.IFramePlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "iframe",
            t.$schema = "https://isuda.baidu.com/schemas/IFrameSchema.json",
            t.name = "iFrame",
            t.description = "可以用来嵌入现有页面。",
            t.tags = ["容器"],
            t.icon = "",
            t.scaffold = {
                type: "iframe",
                src: "//www.baidu.com"
            },
            t.previewSchema = {
                type: "tpl",
                tpl: "iFrame"
            },
            t.panelTitle = "iFrame",
            t.panelControls = [r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    name: "src",
                    label: "页面地址",
                    type: "text",
                    description: ""
                }]
            }, {
                title: "外观",
                controls: [{
                    name: "width",
                    label: "iFrame 宽度",
                    type: "text",
                    pipeIn: r.defaultValue("100%"),
                    pipeOut: r.valuePipeOut
                }, {
                    name: "height",
                    label: "iFrame 高度",
                    type: "text",
                    pipeOut: r.valuePipeOut
                }, r.getSchemaTpl("className")]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
            }])],
            t
        }
        return n.__extends(t, e),
        t.prototype.renderRenderer = function(e) {
            return this.renderPlaceholder("IFrame 页面（" + e.src + "）")
        }
        ,
        t
    }(i.BasePlugin);
    t.IFramePlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ImagePlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "image",
            t.$schema = "https://isuda.baidu.com/schemas/ImageSchema.json",
            t.name = "图片展示",
            t.description = "可以用来展示一张图片，支持静态设置图片地址，也可以配置 <code>name</code> 与变量关联。",
            t.tags = ["展示"],
            t.icon = "",
            t.scaffold = {
                type: "image"
            },
            t.previewSchema = n.__assign(n.__assign({}, t.scaffold), {
                thumbMode: "cover",
                value: "https://internal-amis-res.cdn.bcebos.com/images/2020-1/1578395692722/4f3cb4202335.jpeg@s_0,w_216,l_1,f_jpg,q_80"
            }),
            t.panelTitle = "图片",
            t.panelControlsCreator = function(e) {
                var t = /\/field\/\w+$/.test(e.path);
                return [r.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        name: "title",
                        type: "text",
                        label: "图片标题"
                    }, {
                        name: "imageCaption",
                        type: "text",
                        label: "图片描述"
                    }, {
                        name: "defaultImage",
                        label: "默认图片地址",
                        type: "text"
                    }, t ? null : {
                        name: "src",
                        type: "text",
                        label: "缩略图地址",
                        description: "如果已绑定字段名，可以不用设置，支持用变量。"
                    }]
                }, {
                    title: "外观",
                    controls: [{
                        type: "switch",
                        name: "enlargeAble",
                        label: "开启图片放大功能",
                        mode: "inline",
                        className: "w-full"
                    }, {
                        name: "originalSrc",
                        visibleOn: "this.enlargeAble",
                        type: "text",
                        label: "原图地址",
                        description: "如果不配置将默认使用缩略图地址。"
                    }, {
                        type: "switch",
                        name: "showDimensions",
                        label: "是否显示图片尺寸",
                        mode: "inline",
                        className: "w-full"
                    }, {
                        name: "thumbMode",
                        type: "button-group",
                        label: "缩略图展示模式",
                        size: "sm",
                        pipeIn: r.defaultValue("contain"),
                        options: [{
                            label: "宽度占满",
                            value: "w-full"
                        }, {
                            label: "高度占满",
                            value: "h-full"
                        }, {
                            label: "包含",
                            value: "contain"
                        }, {
                            label: "铺满",
                            value: "cover"
                        }]
                    }, {
                        name: "thumbRatio",
                        type: "button-group",
                        label: "缩略图比率",
                        size: "sm",
                        pipeIn: r.defaultValue("1:1"),
                        options: [{
                            label: "1:1",
                            value: "1:1"
                        }, {
                            label: "4:3",
                            value: "4:3"
                        }, {
                            label: "16:9",
                            value: "16:9"
                        }]
                    }, r.getSchemaTpl("className", {
                        autoComplete: !1
                    }), r.getSchemaTpl("className", {
                        name: "imageClassName",
                        label: "图片 CSS 类名"
                    })]
                }, {
                    title: "其他",
                    controls: [r.getSchemaTpl("visible")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.ImagePlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ImagesPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "images",
            t.$schema = "https://isuda.baidu.com/schemas/ImagesSchema.json",
            t.name = "图片集",
            t.description = "展示多张图片",
            t.tags = ["展示"],
            t.icon = "",
            t.scaffold = {
                type: "images"
            },
            t.previewSchema = n.__assign(n.__assign({}, t.scaffold), {
                listClassName: "nowrap",
                thumbMode: "cover",
                value: [{
                    title: "图片1",
                    image: "https://internal-amis-res.cdn.bcebos.com/images/2020-1/1578395692722/4f3cb4202335.jpeg@s_0,w_216,l_1,f_jpg,q_80",
                    src: "https://internal-amis-res.cdn.bcebos.com/images/2020-1/1578395692722/4f3cb4202335.jpeg"
                }, {
                    title: "图片2",
                    image: "https://internal-amis-res.cdn.bcebos.com/images/2020-1/1578395692942/d8e4992057f9.jpeg@s_0,w_216,l_1,f_jpg,q_80",
                    src: "https://internal-amis-res.cdn.bcebos.com/images/2020-1/1578395692942/d8e4992057f9.jpeg"
                }]
            }),
            t.panelTitle = "图片集",
            t.panelControlsCreator = function(e) {
                var t = /\/field\/\w+$/.test(e.path);
                return [r.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        name: "defaultImage",
                        label: "默认图片地址",
                        type: "text"
                    }, t ? null : {
                        name: "source",
                        type: "text",
                        label: "关联数据",
                        description: "比如：\\${listVar}，用来关联作用域中的已有数据。"
                    }]
                }, {
                    title: "外观",
                    controls: [{
                        type: "switch",
                        name: "enlargeAble",
                        label: "开启图片放大功能",
                        mode: "inline",
                        className: "w-full"
                    }, {
                        name: "originalSrc",
                        visibleOn: "this.enlargeAble",
                        type: "text",
                        label: "原图地址",
                        description: "如果不配置将默认使用缩略图地址。"
                    }, {
                        type: "switch",
                        name: "showDimensions",
                        label: "是否显示图片尺寸",
                        mode: "inline",
                        className: "w-full"
                    }, {
                        name: "thumbMode",
                        type: "button-group",
                        label: "缩略图展示模式",
                        size: "sm",
                        pipeIn: r.defaultValue("contain"),
                        options: [{
                            label: "宽度占满",
                            value: "w-full"
                        }, {
                            label: "高度占满",
                            value: "h-full"
                        }, {
                            label: "包含",
                            value: "contain"
                        }, {
                            label: "铺满",
                            value: "cover"
                        }]
                    }, {
                        name: "thumbRatio",
                        type: "button-group",
                        label: "缩略图比率",
                        size: "sm",
                        pipeIn: r.defaultValue("1:1"),
                        options: [{
                            label: "1:1",
                            value: "1:1"
                        }, {
                            label: "4:3",
                            value: "4:3"
                        }, {
                            label: "16:9",
                            value: "16:9"
                        }]
                    }, r.getSchemaTpl("className", {
                        autoComplete: !1
                    }), r.getSchemaTpl("className", {
                        name: "listClassName",
                        label: "图片列表 CSS 类名"
                    })]
                }, {
                    title: "其他",
                    controls: [r.getSchemaTpl("visible")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.ImagesPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.JsonPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = a(18)
      , s = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "json",
            t.$schema = "https://isuda.baidu.com/schemas/JsonSchema.json",
            t.name = "JSON展示",
            t.description = "用来展示 JSON 数据。",
            t.tags = ["展示"],
            t.icon = "",
            t.scaffold = {
                type: "json"
            },
            t.previewSchema = n.__assign(n.__assign({}, t.scaffold), {
                name: "json",
                value: {
                    a: 1,
                    b: {
                        c: 2
                    }
                }
            }),
            t.panelTitle = "JSON",
            t.panelControlsCreator = function(e) {
                var t = /\/field\/\w+$/.test(e.path);
                return [r.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: o([t ? {
                        type: "tpl",
                        inline: !1,
                        className: "text-info text-sm",
                        tpl: "<p>当前为字段内容节点配置，选择上层还有更多的配置。</p>"
                    } : null, {
                        name: "levelExpand",
                        type: "number",
                        label: "默认展开级别",
                        pipeIn: r.defaultValue(1)
                    }])
                }, {
                    title: "外观",
                    controls: o([r.getSchemaTpl("className")])
                }, {
                    title: "其他",
                    controls: o([r.getSchemaTpl("ref"), r.getSchemaTpl("visible")])
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.JsonPlugin = s,
    l.registerEditorPlugin(s)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.LinkPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "link",
            t.$schema = "https://isuda.baidu.com/schemas/LinkSchema.json",
            t.name = "链接",
            t.description = "用来展示文字链接",
            t.tags = ["展示"],
            t.icon = "",
            t.scaffold = {
                type: "link",
                value: "http://www.baidu.com/"
            },
            t.previewSchema = n.__assign(n.__assign({}, t.scaffold), {
                label: t.name
            }),
            t.panelTitle = "链接",
            t.panelControls = [r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    name: "href",
                    type: "text",
                    label: "目标地址, 支持取变量。",
                    description: "如果已绑定字段名，可以不用设置"
                }, {
                    name: "body",
                    type: "text",
                    label: "内容",
                    description: "不填写时，自动使用目标地址值"
                }, {
                    name: "blank",
                    type: "switch",
                    label: "是否新窗口打开",
                    mode: "inline",
                    className: "w-full"
                }]
            }, {
                title: "外观",
                controls: [r.getSchemaTpl("className", {
                    autoComplete: !1
                })]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
            }])],
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.LinkPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ListPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = a(6)
      , c = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "list",
            t.$schema = "https://isuda.baidu.com/schemas/ListSchema.json",
            t.name = "列表",
            t.description = "展示一个列表，可以自定标题、副标题，内容及按钮组部分。当前组件需要配置数据源，不自带数据拉取，请优先使用 「CRUD」 组件。",
            t.tags = [],
            t.icon = "",
            t.scaffold = {
                type: "list",
                listItem: {
                    body: [{
                        type: "tpl",
                        tpl: "简单的展示数据：$a $b"
                    }],
                    actions: [{
                        icon: "fa fa-eye",
                        type: "button"
                    }]
                }
            },
            t.previewSchema = n.__assign(n.__assign({}, t.scaffold), {
                items: [{
                    a: 1,
                    b: 2
                }, {
                    a: 3,
                    b: 4
                }, {
                    a: 5,
                    b: 6
                }]
            }),
            t.panelTitle = "列表",
            t.panelControlsCreator = function(e) {
                var a = "crud" === e.schema.type;
                return s.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        children: i.default.createElement(l.Button, {
                            level: "danger",
                            size: "sm",
                            block: !0,
                            onClick: t.editDetail.bind(t, e.id)
                        }, "配置成员详情")
                    }, {
                        type: "divider"
                    }, {
                        name: "title",
                        type: "text",
                        label: "标题"
                    }, a ? null : {
                        name: "source",
                        type: "text",
                        label: "数据源",
                        pipeIn: s.defaultValue("${items}"),
                        description: "绑定当前环境变量"
                    }, {
                        name: "placeholder",
                        pipeIn: s.defaultValue("没有数据"),
                        type: "text",
                        label: "无数据提示"
                    }]
                }, {
                    title: "外观",
                    controls: [{
                        name: "showHeader",
                        type: "switch",
                        mode: "inline",
                        className: "block",
                        label: "是否显示头部",
                        pipeIn: s.defaultValue(!0)
                    }, {
                        name: "showFooter",
                        type: "switch",
                        mode: "inline",
                        className: "block",
                        label: "是否显示底部",
                        pipeIn: s.defaultValue(!0)
                    }, s.getSchemaTpl("className", {
                        label: "CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "headerClassName",
                        label: "头部 CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "footerClassName",
                        label: "底部 CSS 类名"
                    })]
                }, {
                    title: "其他",
                    controls: [s.getSchemaTpl("ref"), s.getSchemaTpl("visible")]
                }])
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.filterProps = function(e) {
            if (e.isSlot)
                return e.value = [e.data],
                e;
            var t = n.__assign(n.__assign({}, e.defaultData), e.data)
              , a = Array.isArray(e.value) ? e.value : "string" == typeof e.source ? l.resolveVariable(e.source, t) : l.resolveVariable("${items}", t);
            if (!Array.isArray(a) || !a.length) {
                var i = this.buildMockData();
                e.value = d.repeatArray(i, 10).map((function(e, t) {
                    return n.__assign(n.__assign({}, e), {
                        id: t + 1
                    })
                }
                ))
            }
            return d.JSONPipeOut(e)
        }
        ,
        t.prototype.buildMockData = function() {
            return {
                id: 666,
                title: "假数据",
                description: "假数据",
                a: "假数据",
                b: "假数据"
            }
        }
        ,
        t.prototype.editDetail = function(e) {
            var t = this.manager
              , a = t.store
              , l = a.getNodeById(e)
              , i = a.getValueOf(e);
            l && i && this.manager.openSubEditor({
                title: "配置成员详情",
                value: n.__assign({}, i.listItem),
                slot: {
                    type: "list",
                    listItem: "$$"
                },
                onChange: function(e) {
                    e = n.__assign(n.__assign({}, i), {
                        listItem: e
                    }),
                    t.panelChangeValue(e, d.diff(i, e))
                },
                data: {
                    items: [this.buildMockData()]
                }
            })
        }
        ,
        t.prototype.buildEditorToolbar = function(e, t) {
            var a = e.id
              , n = e.info
              , l = e.schema;
            ("list" === n.renderer.name || "crud" === n.renderer.name && "list" === l.mode) && t.push({
                icon: "fa fa-expand",
                order: 100,
                tooltip: "配置成员渲染器",
                onClick: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.buildEditorContextMenu = function(e, t) {
            var a = e.id
              , n = e.schema
              , l = (e.region,
            e.info);
            ("list" === l.renderer.name || "crud" === l.renderer.name && "list" === n.mode) && t.push("|", {
                label: "配置成员详情",
                onSelect: this.editDetail.bind(this, a)
            })
        }
        ,
        t.prototype.getRendererInfo = function(t) {
            var a, l = t.renderer, i = t.schema;
            return i.$$id || "crud" !== (null === (a = i.$$editor) || void 0 === a ? void 0 : a.renderer.name) || "list" !== l.name ? e.prototype.getRendererInfo.call(this, t) : n.__assign(n.__assign({}, i.$$editor), {
                name: this.name,
                regions: this.regions,
                patchContainers: this.patchContainers,
                vRendererConfig: this.vRendererConfig,
                wrapperProps: this.wrapperProps,
                wrapperResolve: this.wrapperResolve,
                filterProps: this.filterProps,
                $schema: this.$schema,
                renderRenderer: this.renderRenderer
            })
        }
        ,
        t
    }(o.BasePlugin);
    t.ListPlugin = c,
    r.registerEditorPlugin(c)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ListItemPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = a(13)
      , c = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "list-item",
            t.$schema = "https://isuda.baidu.com/schemas/ListItemSchema.json",
            t.regions = [{
                key: "body",
                label: "内容区",
                renderMethod: "renderBody",
                preferTag: "展示"
            }, {
                key: "actions",
                label: "按钮集合",
                preferTag: "按钮",
                renderMethod: "renderRight",
                insertPosition: "inner"
            }],
            t.panelTitle = "列表项",
            t.panelControls = s.getSchemaTpl("tabs", [{
                title: "基本",
                controls: [{
                    name: "title",
                    type: "text",
                    label: "标题",
                    descrition: "支持模板语法如： ${xxx}"
                }, {
                    name: "subTitle",
                    type: "text",
                    label: "副标题",
                    descrition: "支持模板语法如： ${xxx}"
                }, {
                    name: "avatar",
                    type: "text",
                    label: "图片地址",
                    descrition: "支持模板语法如： ${xxx}"
                }, {
                    name: "desc",
                    type: "textarea",
                    label: "描述",
                    descrition: "支持模板语法如： ${xxx}"
                }]
            }, {
                title: "外观",
                controls: [s.getSchemaTpl("className", {
                    name: "avatarClassName",
                    label: "图片 CSS 类名",
                    pipeIn: s.defaultValue("thumb-sm avatar m-r")
                }), s.getSchemaTpl("className", {
                    name: "titleClassName",
                    label: "标题 CSS 类名"
                })]
            }]),
            t.fieldWrapperResolve = function(e) {
                return e
            }
            ,
            t.overrides = {
                renderFeild: function(e, t, a, n) {
                    var l = this.super(e, t, a, n)
                      , r = this.props.$$editor;
                    if (!r || !t.$$id)
                        return l;
                    var o = r.plugin
                      , s = t.$$id;
                    return i.default.createElement(d.VRenderer, {
                        plugin: r.plugin,
                        renderer: r.renderer,
                        multifactor: !0,
                        key: s,
                        $schema: "https://isuda.baidu.com/schemas/ListBodyField.json",
                        hostId: r.id,
                        memberIndex: a,
                        name: "字段" + (a + 1),
                        id: s,
                        draggable: !1,
                        wrapperResolve: o.fieldWrapperResolve,
                        schemaPath: r.schemaPath + "/body/" + a,
                        path: this.props.$path + "/" + a,
                        data: this.props.data
                    }, l)
                }
            },
            t.vRendererConfig = {
                panelTitle: "字段",
                panelControlsCreator: function(e) {
                    return [s.getSchemaTpl("label"), s.getSchemaTpl("className", {
                        name: "labelClassName",
                        label: "Label CSS 类名",
                        visibleOn: "this.label"
                    }), {
                        children: i.default.createElement(l.Button, {
                            size: "sm",
                            level: "info",
                            className: "m-b",
                            block: !0,
                            onClick: t.exchangeRenderer.bind(t, e.id)
                        }, "更改渲染器类型")
                    }]
                }
            },
            t
        }
        return n.__extends(t, e),
        t.prototype.getRendererInfo = function(e) {
            var t = e.renderer;
            if (e.schema.$$id && this.rendererName === t.name)
                return {
                    name: this.panelTitle,
                    regions: this.regions,
                    $schema: this.$schema
                }
        }
        ,
        t.prototype.exchangeRenderer = function(e) {
            this.manager.showReplacePanel(e, "展示")
        }
        ,
        t.prototype.beforeInsert = function(e) {
            var t, a, l, i, r = e.context;
            r.info.plugin !== this && (null === (t = r.node.sameIdChild) || void 0 === t ? void 0 : t.info.plugin) !== this || "body" !== r.region || (r.data = n.__assign(n.__assign({}, r.data), {
                label: null !== (i = null !== (a = r.data.label) && void 0 !== a ? a : null === (l = r.subRenderer) || void 0 === l ? void 0 : l.name) && void 0 !== i ? i : "列名称"
            }))
        }
        ,
        t
    }(o.BasePlugin);
    t.ListItemPlugin = c,
    r.registerEditorPlugin(c)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.MappingPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = a(6)
      , s = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "mapping",
            t.$schema = "https://isuda.baidu.com/schemas/MappingSchema.json",
            t.name = "映射",
            t.description = "对现有值做映射展示，比如原始值是：1、2、3...，需要展示成：下线、上线、过期等等。",
            t.tags = ["展示"],
            t.icon = "",
            t.scaffold = {
                type: "mapping",
                value: 2,
                map: {
                    0: '<span class="label label-info">一</span>',
                    1: '<span class="label label-success">二</span>',
                    2: '<span class="label label-danger">三</span>',
                    3: '<span class="label label-warning">四</span>',
                    4: '<span class="label label-primary">五</span>',
                    "*": '<span class="label label-default">-</span>'
                }
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "映射",
            t.panelControlsCreator = function(e) {
                var t = /\/field\/\w+$/.test(e.path);
                return [r.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [t ? {
                        type: "tpl",
                        inline: !1,
                        className: "text-info text-sm",
                        tpl: "<p>当前为字段内容节点配置，选择上层还有更多的配置。</p>"
                    } : null, {
                        label: "映射表",
                        type: "combo",
                        required: !0,
                        name: "map",
                        descriptionClassName: "help-block text-xs m-b-none",
                        description: "<p>当值命中左侧 Key 时，展示右侧内容，当没有命中时，默认实现 Key 为 <code>*</code>的内容</div>",
                        multiple: !0,
                        pipeIn: function(e) {
                            if (!o.isObject(e))
                                return [{
                                    key: "*",
                                    value: "通配值"
                                }];
                            var t = [];
                            return Object.keys(e).forEach((function(a) {
                                t.push({
                                    key: a || "",
                                    value: "string" == typeof e[a] ? e[a] : JSON.stringify(e[a])
                                })
                            }
                            )),
                            t
                        },
                        pipeOut: function(e) {
                            if (!Array.isArray(e))
                                return e;
                            var t = {};
                            return e.forEach((function(e) {
                                var a = e.key || ""
                                  , n = e.value;
                                try {
                                    n = JSON.parse(n)
                                } catch (e) {}
                                t[a] = n
                            }
                            )),
                            t
                        },
                        controls: [{
                            placeholder: "Key",
                            type: "text",
                            unique: !0,
                            name: "key",
                            required: !0,
                            columnClassName: "w-xs"
                        }, {
                            placeholder: "内容",
                            type: "text",
                            name: "value"
                        }]
                    }, {
                        name: "placeholder",
                        type: "text",
                        pipeIn: r.defaultValue("-"),
                        label: "占位符"
                    }]
                }, {
                    title: "外观",
                    controls: [r.getSchemaTpl("className")]
                }, {
                    title: "其他",
                    controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.MappingPlugin = s,
    l.registerEditorPlugin(s)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.NavPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "nav",
            t.$schema = "https://isuda.baidu.com/schemas/NavSchema.json",
            t.name = "导航",
            t.description = "用来渲染导航菜单，支持横排和竖排。",
            t.tags = [],
            t.icon = "",
            t.scaffold = {
                type: "nav",
                stacked: !0,
                links: [{
                    label: "页面1",
                    to: "?id=1"
                }, {
                    label: "页面2",
                    to: "?id=2"
                }]
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "导航",
            t.panelDefinitions = {
                links: {
                    label: "菜单管理",
                    name: "links",
                    type: "combo",
                    multiple: !0,
                    draggable: !0,
                    addButtonText: "新增菜单",
                    multiLine: !0,
                    messages: {
                        validateFailed: "菜单中存在配置错误，请仔细检查"
                    },
                    scaffold: {
                        label: "",
                        to: ""
                    },
                    controls: [{
                        type: "text",
                        name: "label",
                        label: "名称",
                        required: !0
                    }, {
                        type: "text",
                        name: "to",
                        label: "跳转地址",
                        required: !0
                    }, {
                        type: "icon-picker",
                        name: "icon",
                        label: "图标"
                    }, {
                        type: "group",
                        label: "是否高亮",
                        direction: "vertical",
                        className: "m-b-none",
                        labelRemark: {
                            trigger: "click",
                            rootClose: !0,
                            className: "m-l-xs",
                            content: "可以配置该菜单是否要高亮",
                            placement: "left"
                        },
                        controls: [{
                            name: "active",
                            type: "radios",
                            inline: !0,
                            options: [{
                                label: "是",
                                value: !0
                            }, {
                                label: "否",
                                value: !1
                            }, {
                                label: "表达式",
                                value: ""
                            }]
                        }, {
                            name: "activeOn",
                            autoComplete: !1,
                            visibleOn: 'typeof this.active !== "boolean"',
                            type: "text",
                            placeholder: "留空将自动分析菜单地址",
                            className: "m-t-n-sm"
                        }]
                    }, {
                        type: "switch",
                        label: "包含子菜单",
                        name: "children",
                        mode: "inline",
                        className: "block",
                        pipeIn: function(e) {
                            return !!e
                        },
                        pipeOut: function(e) {
                            return e ? [{
                                label: "",
                                to: ""
                            }] : void 0
                        },
                        messages: {
                            validateFailed: "子菜单中存在配置错误，请仔细检查"
                        }
                    }, {
                        name: "children",
                        $ref: "links",
                        visibleOn: 'this.hasOwnProperty("children") && this.children',
                        label: "子菜单管理",
                        addButtonText: "新增子菜单"
                    }]
                }
            },
            t.panelControls = [r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    $ref: "links",
                    name: "links"
                }, {
                    type: "divider"
                }, r.getSchemaTpl("api", {
                    name: "source",
                    label: "获取菜单接口",
                    description: "如果菜单地址希望可以动态设置，请在此填入接口地址"
                })]
            }, {
                title: "外观",
                controls: [{
                    name: "stacked",
                    type: "switch",
                    mode: "inline",
                    className: "block",
                    label: "是否竖着摆放"
                }, r.getSchemaTpl("className")]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
            }])],
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.NavPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.OperationPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "operation",
            t.$schema = "https://isuda.baidu.com/schemas/OperationSchema.json",
            t.name = "操作栏",
            t.description = "操作栏，用于表格。",
            t.tags = ["展示"],
            t.icon = "",
            t.scaffold = {
                type: "operation",
                label: "操作",
                buttons: [{
                    label: "按钮",
                    type: "button"
                }]
            },
            t.previewSchema = {
                type: "tpl",
                tpl: "操作栏"
            },
            t.regions = [{
                key: "buttons",
                label: "按钮集",
                renderMethod: "render",
                insertPosition: "inner",
                preferTag: "按钮"
            }],
            t.panelTitle = "操作栏",
            t.panelControlsCreator = function(e) {
                return [s.getSchemaTpl("className", {
                    name: "innerClassName"
                }), {
                    children: i.default.createElement(l.Button, {
                        level: "info",
                        size: "sm",
                        className: "m-b-sm",
                        block: !0,
                        onClick: function() {
                            t.manager.showInsertPanel("buttons", e.id, "按钮")
                        }
                    }, "添加按钮")
                }]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.buildSubRenderers = function(t, a) {
            if ("table" === t.info.renderer.name || "crud" === t.info.renderer.name)
                return e.prototype.buildSubRenderers.call(this, t, a)
        }
        ,
        t
    }(o.BasePlugin);
    t.OperationPlugin = d,
    r.registerEditorPlugin(d)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.PagePlugin = void 0;
    var n = a(0)
      , l = a(30)
      , i = a(1)
      , r = a(2)
      , o = a(3)
      , s = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "page",
            t.$schema = "https://isuda.baidu.com/schemas/PageSchema.json",
            t.name = "页面",
            t.description = "页面渲染器，页面的顶级入口。包含多个区域，您可以选择在不同的区域里面放置不同的渲染器。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/page",
            t.tags = "容器",
            t.icon = "fa fa-desktop",
            t.scaffold = {
                type: "page",
                body: [{
                    type: "tpl",
                    tpl: "内容"
                }]
            },
            t.previewSchema = {
                type: "page",
                className: "text-left b-a",
                asideClassName: "w-xs",
                title: "标题",
                subTitle: "副标题",
                aside: "边栏",
                body: "内容"
            },
            t.regions = [{
                key: "toolbar",
                label: "工具栏",
                preferTag: "按钮"
            }, {
                key: "aside",
                label: "边栏"
            }, {
                key: "body",
                label: "内容区"
            }],
            t.wrapper = l.ContainerWrapper,
            t.panelTitle = "页面",
            t.panelControls = [o.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    label: "标题",
                    name: "title",
                    type: "text"
                }, {
                    label: "副标题",
                    name: "subTitle",
                    type: "text"
                }, {
                    label: "提示",
                    name: "remark",
                    type: "textarea",
                    visibleOn: "data.title",
                    description: "标题附近会出现一个提示图标，鼠标放上去会提示该内容。"
                }]
            }, {
                title: "接口",
                controls: [o.getSchemaTpl("api", {
                    label: "数据初始化接口",
                    name: "initApi",
                    sampleBuilder: function(e) {
                        return '{\n  "status": 0,\n  "msg": "",\n\n  data: {\n    // 示例数据\n    "id": 1,\n    "a": "sample"\n  } \n}'
                    }
                }), o.getSchemaTpl("initFetch"), {
                    label: "开启定时刷新",
                    type: "switch",
                    name: "interval",
                    visibleOn: "data.initApi",
                    pipeIn: function(e) {
                        return !!e
                    },
                    pipeOut: function(e) {
                        return e ? 3e3 : void 0
                    },
                    mode: "inline"
                }, {
                    name: "interval",
                    type: "number",
                    visibleOn: 'typeof this.interval === "number"',
                    step: 500
                }, {
                    name: "silentPolling",
                    label: "静默刷新",
                    type: "switch",
                    mode: "inline",
                    visibleOn: "!!data.interval",
                    description: "设置自动定时刷新时是否显示loading"
                }, {
                    name: "stopAutoRefreshWhen",
                    label: "停止定时刷新检测表达式",
                    type: "text",
                    visibleOn: "!!data.interval",
                    description: "定时刷新一旦设置会一直刷新，除非给出表达式，条件满足后则不刷新了。"
                }, {
                    label: "默认消息提示",
                    type: "combo",
                    name: "messages",
                    multiLine: !0,
                    description: "设置 ajax 默认提示信息，当 ajax 没有返回 msg 信息时有用，如果 ajax 返回携带了 msg 值，则还是以 ajax 返回为主",
                    controls: [{
                        label: "获取成功提示",
                        type: "text",
                        name: "fetchSuccess"
                    }, {
                        label: "获取失败提示",
                        type: "text",
                        name: "fetchFailed"
                    }, {
                        label: "保存成功提示",
                        type: "text",
                        name: "saveSuccess"
                    }, {
                        label: "保存失败提示",
                        type: "text",
                        name: "saveFailed"
                    }]
                }]
            }, {
                title: "外观",
                controls: [o.getSchemaTpl("className"), o.getSchemaTpl("className", {
                    name: "headerClassName",
                    label: "头部CSS类名"
                }), o.getSchemaTpl("className", {
                    name: "bodyClassName",
                    label: "内容CSS类名"
                }), o.getSchemaTpl("className", {
                    name: "asideClassName",
                    label: "边栏CSS类名"
                }), o.getSchemaTpl("className", {
                    name: "toolbarClassName",
                    label: "工具栏CSS类名"
                })]
            }, {
                title: "其他",
                controls: [o.getSchemaTpl("name")]
            }])],
            t
        }
        return n.__extends(t, e),
        t
    }(r.BasePlugin);
    t.PagePlugin = s,
    i.registerEditorPlugin(s)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.PanelPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "panel",
            t.$schema = "https://isuda.baidu.com/schemas/PanelSchema.json",
            t.name = "面板",
            t.description = "展示一个面板，可以配置标题，内容区。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/panel",
            t.tags = "容器",
            t.scaffold = {
                type: "panel",
                title: "标题",
                body: "内容"
            },
            t.previewSchema = {
                type: "panel",
                title: "这是一个面板",
                body: "这是内容区",
                className: "Panel--default text-left m-b-none",
                actions: [{
                    label: "按钮1",
                    type: "button"
                }, {
                    label: "按钮2",
                    type: "button"
                }]
            },
            t.regions = [{
                key: "body",
                label: "内容区",
                renderMethod: "renderBody",
                renderMethodOverride: function(e, t) {
                    return function() {
                        for (var a = [], n = 0; n < arguments.length; n++)
                            a[n] = arguments[n];
                        var l = this.props.$$editor
                          , i = this.super.apply(this, a);
                        return l && !this.props.children ? t(this, i, e, l, l.plugin.manager) : i
                    }
                }
            }, {
                key: "actions",
                label: "按钮组",
                renderMethod: "renderActions",
                preferTag: "按钮"
            }],
            t.panelTitle = "面板",
            t.panelControlsCreator = function(e) {
                var a = /(?:^|\/)form$/.test(e.path);
                return [s.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        label: "标题",
                        name: "title",
                        type: "text"
                    }, a ? null : {
                        children: i.default.createElement(l.Button, {
                            size: "sm",
                            level: "info",
                            className: "m-b",
                            onClick: function() {
                                return t.manager.showInsertPanel("body")
                            },
                            block: !0
                        }, "内容区新增内容")
                    }]
                }, {
                    title: "外观",
                    controls: [{
                        name: "affixFooter",
                        label: "固定底部",
                        type: "switch",
                        value: !1,
                        mode: "inline",
                        className: "block"
                    }, s.getSchemaTpl("horizontal", {
                        visibleOn: '(data.mode || data.$$formMode) == "horizontal" && data.$$mode == "form"'
                    }), {
                        name: a ? "panelClassName" : "className",
                        label: "样式",
                        type: "button-group",
                        size: "sm",
                        pipeIn: function(e) {
                            return "string" == typeof e && /(?:^|\s)(Panel\-\-(\w+))(?:$|\s)/.test(e) ? RegExp.$1 : ""
                        },
                        pipeOut: function(e, t) {
                            return t ? (t.replace(/(?:^|\s)(Panel\-\-(\w+))(?=($|\s))/g, "") + " " + e).replace(/\s+/g, " ").trim() : e
                        },
                        options: [{
                            label: "默认",
                            value: "Panel--default"
                        }, {
                            label: "主色",
                            value: "Panel--primary"
                        }, {
                            label: "提示",
                            value: "Panel--info"
                        }, {
                            label: "成功",
                            value: "Panel--success"
                        }, {
                            label: "警告",
                            value: "Panel--warning"
                        }, {
                            label: "危险",
                            value: "Panel--danger"
                        }]
                    }, s.getSchemaTpl("className", {
                        name: a ? "panelClassName" : "className",
                        pipeIn: s.defaultValue("Panel--default")
                    }), s.getSchemaTpl("className", {
                        name: "headerClassName",
                        label: "头部区域 CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "bodyClassName",
                        label: "内容区域 CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "footerClassName",
                        label: "底部区域 CSS 类名"
                    }), s.getSchemaTpl("className", {
                        name: "actionsClassName",
                        label: "按钮外层 CSS 类名"
                    })]
                }, {
                    title: "其他",
                    controls: [s.getSchemaTpl("ref"), s.getSchemaTpl("visible")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.buildEditorPanel = function(t, a) {
            t.path;
            var n = t.schema;
            "form" === t.info.renderer.name && !1 !== n.wrapWithPanel ? a.push({
                key: "panel",
                icon: "fa fa-list-alt",
                title: this.panelTitle,
                render: this.manager.makeSchemaFormRender({
                    controls: this.panelControlsCreator(t)
                })
            }) : e.prototype.buildEditorPanel.call(this, t, a)
        }
        ,
        t
    }(o.BasePlugin);
    t.PanelPlugin = d,
    r.registerEditorPlugin(d)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.PlainPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "plain",
            t.$schema = "https://isuda.baidu.com/schemas/PlainSchema.json",
            t.name = "纯文本",
            t.description = "用来展示纯文字，html 标签会被转义。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/plain",
            t.tags = ["展示"],
            t.previewSchema = {
                type: "plain",
                text: "这是纯文本",
                className: "text-center",
                inline: !1
            },
            t.scaffold = {
                type: "plain",
                tpl: "内容",
                inline: !1
            },
            t.panelTitle = "纯文本",
            t.panelControlsCreator = function(e) {
                var t = "table-cell" === e.info.renderer.name;
                return r.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        label: "内容",
                        type: "textarea",
                        pipeIn: function(e, t) {
                            return e || t && t.text
                        },
                        name: "tpl",
                        description: '如果当前字段有值，请不要设置，否则覆盖。支持使用 <code>\\${xxx}</code> 来获取变量，或者用 lodash.template 语法来写模板逻辑。<a target="_blank" href="/docs/renderers/Tpl">详情</a>'
                    }, {
                        name: "placeholder",
                        label: "占位符",
                        type: "text",
                        pipeIn: r.defaultValue("-")
                    }]
                }, t ? null : {
                    title: "外观",
                    controls: [{
                        label: "内联模式",
                        type: "switch",
                        name: "inline",
                        mode: "inline",
                        className: "w-full",
                        value: !0
                    }, r.getSchemaTpl("className")]
                }, t ? null : {
                    title: "其他",
                    controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
                }])
            }
            ,
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.PlainPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ProgressPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "progress",
            t.$schema = "https://isuda.baidu.com/schemas/ProgressSchema.json",
            t.name = "进度展示",
            t.description = "用来展示进度。可配置各个进度段用不同的颜色展示。",
            t.tags = ["展示"],
            t.icon = "",
            t.scaffold = {
                type: "progress",
                value: 66.66
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "进度",
            t.panelControlsCreator = function(e) {
                var t = /\/field\/\w+$/.test(e.path);
                return [r.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [t ? {
                        type: "tpl",
                        inline: !1,
                        className: "text-info text-sm",
                        tpl: "<p>当前为字段内容节点配置，选择上层还有更多的配置。</p>"
                    } : null, {
                        name: "showLabel",
                        type: "switch",
                        mode: "inline",
                        pipeIn: r.defaultValue(!0),
                        label: "是否显示文字"
                    }, {
                        name: "map",
                        label: "等级配置",
                        type: "array",
                        items: {
                            type: "text"
                        },
                        descrition: "配置不通的值段，用不通的样式提示用户",
                        pipeIn: r.defaultValue(["bg-danger", "bg-warning", "bg-info", "bg-success", "bg-success"])
                    }, r.getSchemaTpl("switchDefaultValue"), {
                        type: "text",
                        name: "value",
                        label: "默认值",
                        validations: "isNumeric",
                        visibleOn: 'typeof this.value !== "undefined"'
                    }, {
                        name: "placeholder",
                        type: "text",
                        pipeIn: r.defaultValue("-"),
                        label: "占位符"
                    }]
                }, {
                    title: "外观",
                    controls: [r.getSchemaTpl("className"), r.getSchemaTpl("className", {
                        name: "progressClassName",
                        label: "进度外层 CSS 类名",
                        pipeIn: r.defaultValue("progress-xs progress-striped active m-t-xs m-b-none")
                    }), r.getSchemaTpl("className", {
                        name: "progressBarClassName",
                        label: "进度条 CSS 类名"
                    })]
                }, {
                    title: "其他",
                    controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.ProgressPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.QRCodePlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "qrcode",
            t.$schema = "https://isuda.baidu.com/schemas/QRCodeSchema.json",
            t.name = "二维码",
            t.description = "可以用来生成二维码",
            t.tags = [],
            t.icon = "",
            t.scaffold = {
                type: "qrcode",
                value: "https://amis.baidu.com"
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "二维码",
            t.panelControls = [r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    name: "value",
                    type: "text",
                    label: "二维码值",
                    pipeIn: r.defaultValue("https://www.baidu.com"),
                    description: "支持使用 <code>\\${xxx}</code> 来获取变量"
                }, {
                    name: "level",
                    type: "select",
                    label: "复杂度",
                    pipeIn: r.defaultValue("L"),
                    options: [{
                        label: "L",
                        value: "L"
                    }, {
                        label: "M",
                        value: "M"
                    }, {
                        label: "Q",
                        value: "Q"
                    }, {
                        label: "H",
                        value: "H"
                    }]
                }]
            }, {
                title: "外观",
                controls: [{
                    name: "codeSize",
                    type: "number",
                    label: "宽高值",
                    pipeIn: r.defaultValue(128)
                }, {
                    name: "backgroundColor",
                    type: "color",
                    label: "背景色",
                    pipeIn: r.defaultValue("#fff")
                }, {
                    name: "foregroundColor",
                    type: "color",
                    label: "前景色",
                    pipeIn: r.defaultValue("#000")
                }, r.getSchemaTpl("className")]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
            }])],
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.QRCodePlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ResetPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "reset",
            t.name = "重置",
            t.description = "一般用来重置表单数据到初始值。",
            t.docLink = "",
            t.panelTitle = "按钮",
            t.scaffold = {
                type: "reset",
                label: "重置"
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t
        }
        return n.__extends(t, e),
        t
    }(a(19).ButtonPlugin);
    t.ResetPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ServicePlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "service",
            t.$schema = "https://isuda.baidu.com/schemas/ServiceSchema.json",
            t.name = "服务(Service)",
            t.description = "功能性容器，可以用来加载数据或者加载渲染器配置。加载到的数据在容器可以使用。",
            t.tags = ["功能"],
            t.icon = "",
            t.scaffold = {
                type: "service",
                body: [{
                    type: "tpl",
                    tpl: "内容",
                    inline: !1
                }]
            },
            t.previewSchema = {
                type: "tpl",
                tpl: "功能性组件，用于数据拉取。"
            },
            t.regions = [{
                key: "body",
                label: "内容区"
            }],
            t.panelTitle = "服务",
            t.panelControlsCreator = function(e) {
                return s.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        children: i.default.createElement(l.Button, {
                            level: "info",
                            size: "sm",
                            className: "m-b-sm",
                            block: !0,
                            onClick: function() {
                                t.manager.showInsertPanel("body", e.id)
                            }
                        }, "添加内容")
                    }, {
                        type: "divider"
                    }, s.getSchemaTpl("api", {
                        label: "数据接口"
                    }), s.getSchemaTpl("initFetch"), {
                        name: "interval",
                        label: "定时刷新间隔",
                        visibleOn: "this.api",
                        type: "number",
                        step: 500,
                        description: "设置后将自动定时刷新，单位 ms"
                    }, {
                        name: "silentPolling",
                        label: "静默加载",
                        mode: "inline",
                        className: "block",
                        type: "switch",
                        visibleOn: "!!data.interval",
                        description: "设置自动定时刷新是否显示加载动画"
                    }, {
                        name: "stopAutoRefreshWhen",
                        label: "停止定时刷新检测",
                        type: "text",
                        visibleOn: "!!data.interval",
                        description: "定时刷新一旦设置会一直刷新，除非给出表达式，条件满足后则不刷新了。"
                    }, {
                        type: "divider"
                    }, s.getSchemaTpl("api", {
                        name: "schemaApi",
                        label: "内容 Schema 接口"
                    }), {
                        type: "divider"
                    }, s.getSchemaTpl("initFetch", {
                        name: "initFetchSchema",
                        visibleOn: "data.schemaApi",
                        label: "初始是否拉取内容 Schema 接口"
                    }), {
                        label: "默认消息信息",
                        type: "combo",
                        name: "messages",
                        multiLine: !0,
                        description: "设置 service 默认提示信息，当 service 没有返回 msg 信息时有用，如果 service 返回携带了 msg 值，则还是以 service 返回为主",
                        controls: [{
                            label: "获取成功",
                            type: "text",
                            name: "fetchSuccess"
                        }, {
                            label: "获取失败",
                            type: "text",
                            name: "fetchFailed"
                        }]
                    }]
                }, {
                    title: "外观",
                    controls: [s.getSchemaTpl("className")]
                }, {
                    title: "其他",
                    controls: [s.getSchemaTpl("ref"), s.getSchemaTpl("name"), s.getSchemaTpl("visible")]
                }])
            }
            ,
            t
        }
        return n.__extends(t, e),
        t
    }(o.BasePlugin);
    t.ServicePlugin = d,
    r.registerEditorPlugin(d)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.StatusPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "status",
            t.$schema = "https://isuda.baidu.com/schemas/StatusSchema.json",
            t.name = "状态显示",
            t.description = "用图标更具关联字段来展示状态，比如 1 展示 √、0 展示 x。这块可以自定义配置",
            t.tags = ["展示"],
            t.icon = "fa fa-check-square-o",
            t.scaffold = {
                type: "status",
                value: 1
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "状态",
            t.panelControlsCreator = function(e) {
                return [/\/field\/\w+$/.test(e.path) ? {
                    type: "tpl",
                    inline: !1,
                    className: "text-info text-sm",
                    tpl: "<p>当前为字段内容节点配置，选择上层还有更多的配置。</p>"
                } : null, {
                    name: "map",
                    label: "图标配置",
                    type: "array",
                    items: {
                        type: "text"
                    },
                    descrition: "配置不通的值段，用不通的样式提示用户",
                    pipeIn: r.defaultValue(["fa fa-times text-danger", "fa fa-check text-success"])
                }, {
                    name: "placeholder",
                    type: "text",
                    pipeIn: r.defaultValue("-"),
                    label: "占位符"
                }, r.getSchemaTpl("className"), r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.StatusPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.SubmitPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "submit",
            t.name = "提交",
            t.description = "用来提交表单，要求表单验证，如果在弹窗中会自动关闭弹窗。",
            t.docLink = "",
            t.panelTitle = "按钮",
            t.scaffold = {
                type: "submit",
                label: "提交",
                level: "primary"
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t
        }
        return n.__extends(t, e),
        t
    }(a(19).ButtonPlugin);
    t.SubmitPlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.SwitchPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "switch",
            t.$schema = "https://isuda.baidu.com/schemas/SwitchSchema.json",
            t.name = "开关展示",
            t.description = "用开关的样式来展示数据。",
            t.tags = ["展示"],
            t.icon = "fa fa-toggle-on",
            t.scaffold = {
                type: "switch",
                name: "var1"
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "开关展示",
            t.panelControlsCreator = function(e) {
                return [/\/field\/\w+$/.test(e.path) ? {
                    type: "tpl",
                    inline: !1,
                    className: "text-info text-sm",
                    tpl: "<p>当前为字段内容节点配置，选择上层还有更多的配置。</p>"
                } : {
                    name: "name",
                    type: "text",
                    label: "字段名"
                }, {
                    name: "option",
                    type: "text",
                    label: "选项说明"
                }, {
                    type: "text",
                    label: "勾选后的值",
                    name: "trueValue",
                    value: !0,
                    pipeOut: r.valuePipeOut
                }, {
                    type: "text",
                    label: "未勾选的值",
                    name: "falseValue",
                    value: !1,
                    pipeOut: r.valuePipeOut
                }, {
                    name: "placeholder",
                    type: "text",
                    pipeIn: r.defaultValue("-"),
                    label: "占位符"
                }, r.getSchemaTpl("className"), r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.SwitchPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TablePlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = a(1)
      , r = a(2)
      , o = a(3)
      , s = a(6)
      , d = a(15)
      , c = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "table",
            t.$schema = "https://isuda.baidu.com/schemas/TableSchema.json",
            t.name = "表格",
            t.description = "用来展示表格数据，可以配置列信息，然后关联数据便能完成展示。支持嵌套、超级表头、列固定、表头固顶、合并单元格等等。当前组件需要配置数据源，不自带数据拉取，请优先使用 「CRUD」 组件。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/table",
            t.icon = "fa fa-table",
            t.scaffold = {
                type: "table",
                columns: [{
                    label: "列信息",
                    name: "a"
                }]
            },
            t.regions = [{
                key: "columns",
                label: "列集合",
                renderMethod: "renderTableContent",
                preferTag: "展示",
                dndMode: "position-h"
            }],
            t.previewSchema = {
                type: "table",
                className: "text-left m-b-none",
                affixHeader: !1,
                items: [{
                    a: 1,
                    b: 2
                }, {
                    a: 3,
                    b: 4
                }, {
                    a: 5,
                    b: 6
                }],
                columns: [{
                    label: "A",
                    name: "a"
                }, {
                    label: "B",
                    name: "b"
                }]
            },
            t.panelTitle = "表格",
            t.panelControlsCreator = function(e) {
                var t = "crud" === e.schema.type;
                return o.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        name: "title",
                        type: "text",
                        label: "标题"
                    }, t ? null : {
                        name: "source",
                        type: "text",
                        label: "数据源",
                        pipeIn: o.defaultValue("${items}"),
                        description: "绑定当前环境变量"
                    }, {
                        name: "combineNum",
                        label: "自动合并单元格",
                        type: "number",
                        placeholder: "设置列数",
                        description: "设置从左到右多少列内启用自动合并单元格，根据字段值是否相同来决定是否合并。"
                    }]
                }, {
                    title: "外观",
                    controls: [{
                        name: "columnsTogglable",
                        label: "展示列显示开关",
                        type: "button-group",
                        pipeIn: o.defaultValue("auto"),
                        mode: "inline",
                        className: "w-full",
                        size: "xs",
                        options: [{
                            label: "自动",
                            value: "auto"
                        }, {
                            label: "开启",
                            value: !0
                        }, {
                            label: "关闭",
                            value: !1
                        }],
                        description: "自动即列数量大于5个时自动开启"
                    }, {
                        name: "affixHeader",
                        type: "switch",
                        label: "是否固顶表头",
                        mode: "inline",
                        className: "w-full",
                        pipeIn: o.defaultValue(!0)
                    }, {
                        name: "showHeader",
                        type: "switch",
                        mode: "inline",
                        className: "w-full",
                        label: "是否显示头部",
                        pipeIn: o.defaultValue(!0)
                    }, {
                        name: "showFooter",
                        type: "switch",
                        mode: "inline",
                        className: "w-full",
                        label: "是否显示底部",
                        pipeIn: o.defaultValue(!0)
                    }, {
                        name: "footable",
                        type: "switch",
                        mode: "inline",
                        className: "w-full",
                        label: "是否开启单条底部展示",
                        description: "如果列太多显示会很臃肿，可以考虑把部分列放在当前行的底部展示",
                        pipeIn: function(e) {
                            return !!e
                        }
                    }, {
                        name: "footable.expand",
                        type: "button-group",
                        size: "xs",
                        visibleOn: "data.footable",
                        label: "底部默认展开",
                        pipeIn: o.defaultValue("none"),
                        mode: "inline",
                        className: "w-full",
                        options: [{
                            label: "第一条",
                            value: "first"
                        }, {
                            label: "所有",
                            value: "all"
                        }, {
                            label: "不展开",
                            value: "none"
                        }]
                    }, {
                        name: "placeholder",
                        pipeIn: o.defaultValue("暂无数据"),
                        type: "text",
                        label: "无数据提示"
                    }, o.getSchemaTpl("className", {
                        label: "外层 CSS 类名"
                    }), o.getSchemaTpl("className", {
                        name: "tableClassName",
                        label: "表格 CSS 类名"
                    }), o.getSchemaTpl("className", {
                        name: "headerClassName",
                        label: "顶部外层 CSS 类名"
                    }), o.getSchemaTpl("className", {
                        name: "footerClassName",
                        label: "底部外层 CSS 类名"
                    }), o.getSchemaTpl("className", {
                        name: "toolbarClassName",
                        label: "工具栏 CSS 类名"
                    })]
                }, {
                    title: "其他",
                    controls: [o.getSchemaTpl("ref"), o.getSchemaTpl("visible")]
                }])
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.filterProps = function(e) {
            var t = Array.isArray(e.value) ? e.value : "string" == typeof e.source ? l.resolveVariable(e.source, e.data) : l.resolveVariable("${items}", e.data);
            if (!Array.isArray(t) || !t.length) {
                var a = {};
                Array.isArray(e.columns) && e.columns.forEach((function(e) {
                    e.name && d.setVariable(a, e.name, "假数据")
                }
                )),
                e.value = s.repeatArray(a, 10).map((function(e, t) {
                    return n.__assign(n.__assign({}, e), {
                        id: t + 1
                    })
                }
                ))
            }
            return e
        }
        ,
        t.prototype.getRendererInfo = function(t) {
            var a, l = t.schema, i = t.renderer;
            return l.$$id || "crud" !== (null === (a = l.$$editor) || void 0 === a ? void 0 : a.renderer.name) || "table" !== i.name ? e.prototype.getRendererInfo.call(this, t) : n.__assign(n.__assign({}, l.$$editor), {
                name: this.name,
                regions: this.regions,
                patchContainers: this.patchContainers,
                vRendererConfig: this.vRendererConfig,
                wrapperProps: this.wrapperProps,
                wrapperResolve: this.wrapperResolve,
                filterProps: this.filterProps,
                $schema: this.$schema,
                renderRenderer: this.renderRenderer
            })
        }
        ,
        t.prototype.beforeInsert = function(e) {
            var t, a, l, i, r = e.context;
            r.info.plugin !== this && (null === (t = r.node.sameIdChild) || void 0 === t ? void 0 : t.info.plugin) !== this || "columns" !== r.region || (r.data = n.__assign(n.__assign({}, r.data), {
                label: null !== (i = null !== (a = r.data.label) && void 0 !== a ? a : null === (l = r.subRenderer) || void 0 === l ? void 0 : l.name) && void 0 !== i ? i : "列名称"
            }))
        }
        ,
        t
    }(r.BasePlugin);
    t.TablePlugin = c,
    i.registerEditorPlugin(c)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TableCellPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.panelTitle = "列配置",
            t.panelControlsCreator = function(e) {
                return [s.getSchemaTpl("tabs", [{
                    title: "常规",
                    controls: [{
                        children: i.default.createElement(l.Button, {
                            size: "sm",
                            level: "info",
                            className: "m-b",
                            block: !0,
                            onClick: t.exchangeRenderer.bind(t, e.id)
                        }, "更改渲染器类型")
                    }, {
                        name: "label",
                        label: "列名称",
                        type: "text"
                    }, {
                        name: "name",
                        type: "text",
                        label: "绑定字段名"
                    }, {
                        name: "remark",
                        label: "提示",
                        type: "text",
                        description: "显示一个提示图标，鼠标放上去会提示该内容。"
                    }, {
                        name: "placeholder",
                        type: "text",
                        label: "占位符",
                        value: "-",
                        description: "当没有值时用这个来替代展示"
                    }, {
                        name: "sortable",
                        type: "switch",
                        label: "是否可排序",
                        mode: "inline",
                        className: "w-full",
                        description: "开启后可以根据当前列排序(后端排序)。"
                    }]
                }, {
                    title: "高级",
                    controls: [{
                        name: "groupName",
                        label: "列分组名称",
                        type: "text",
                        description: '当多列的分组名称设置一致时，表格会在显示表头的上层显示超级表头，<a href="https://baidu.github.io/amis/crud/header-group" target="_blank">示例</a>'
                    }, {
                        name: "quickEdit",
                        label: "启用快速编辑",
                        type: "switch",
                        pipeIn: function(e) {
                            return !!e
                        },
                        mode: "inline",
                        className: "w-full"
                    }, {
                        visibleOn: "data.quickEdit",
                        name: "quickEdit.mode",
                        type: "button-group",
                        value: "popOver",
                        label: "快速编辑模式",
                        size: "xs",
                        mode: "inline",
                        className: "w-full",
                        options: [{
                            label: "下拉",
                            value: "popOver"
                        }, {
                            label: "内嵌",
                            value: "inline"
                        }]
                    }, {
                        visibleOn: "data.quickEdit",
                        name: "quickEdit.saveImmediately",
                        label: "是否立即保存",
                        type: "switch",
                        mode: "inline",
                        className: "w-full",
                        description: "开启后修改即提交，而不是标记修改批量提交。",
                        descriptionClassName: "help-block m-b-none",
                        pipeIn: function(e) {
                            return !!e
                        }
                    }, s.getSchemaTpl("api", {
                        label: "立即保存接口",
                        description: "是否单独给立即保存配置接口，如果不配置，则默认使用quickSaveItemApi。",
                        name: "quickEdit.saveImmediately.api",
                        visibleOn: "this.quickEdit && this.quickEdit.saveImmediately"
                    }), {
                        visibleOn: "data.quickEdit",
                        name: "quickEdit",
                        children: function(e) {
                            var a = e.value
                              , r = e.onChange
                              , o = e.data;
                            !0 === a && (a = {});
                            var s = a.mode;
                            return delete (a = n.__assign({
                                type: "text",
                                name: o.name
                            }, a)).mode,
                            i.default.createElement(l.Button, {
                                level: "info",
                                className: "m-b",
                                size: "sm",
                                block: !0,
                                onClick: function() {
                                    t.manager.openSubEditor({
                                        title: "配置快速编辑类型",
                                        value: a,
                                        slot: {
                                            type: "form",
                                            mode: "normal",
                                            controls: ["$$"],
                                            wrapWithPanel: !1
                                        },
                                        onChange: function(e) {
                                            return r(n.__assign(n.__assign({}, e), {
                                                mode: s
                                            }))
                                        }
                                    })
                                }
                            }, "配置快速编辑")
                        }
                    }, {
                        name: "popOver",
                        label: "启用查看更多展示",
                        type: "switch",
                        pipeIn: function(e) {
                            return !!e
                        },
                        mode: "inline",
                        className: "w-full"
                    }, {
                        name: "popOver.mode",
                        label: "查看更多弹出模式",
                        type: "select",
                        visibleOn: "data.popOver",
                        pipeIn: s.defaultValue("popOver"),
                        options: [{
                            label: "默认",
                            value: "popOver"
                        }, {
                            label: "弹框",
                            value: "dialog"
                        }, {
                            label: "抽出式弹框",
                            value: "drawer"
                        }]
                    }, {
                        name: "popOver.position",
                        label: "查看更多弹出模式",
                        type: "select",
                        visibleOn: 'data.popOver && data.popOver.mode === "popOver"',
                        pipeIn: s.defaultValue("center"),
                        options: [{
                            label: "目标中部",
                            value: "center"
                        }, {
                            label: "目标左上角",
                            value: "left-top"
                        }, {
                            label: "目标右上角",
                            value: "right-top"
                        }, {
                            label: "目标左下角",
                            value: "left-bottom"
                        }, {
                            label: "目标右下角",
                            value: "right-bottom"
                        }, {
                            label: "页面左上角",
                            value: "fixed-left-top"
                        }, {
                            label: "页面右上角",
                            value: "fixed-right-top"
                        }, {
                            label: "页面左下角",
                            value: "fixed-left-bottom"
                        }, {
                            label: "页面右下角",
                            value: "fixed-right-bottom"
                        }]
                    }, {
                        visibleOn: "data.popOver",
                        name: "popOver",
                        children: function(e) {
                            var a = e.value
                              , r = e.onChange;
                            return a = n.__assign({
                                type: "panel",
                                title: "查看详情",
                                body: "内容详情"
                            }, a),
                            i.default.createElement(l.Button, {
                                level: "info",
                                className: "m-b",
                                size: "sm",
                                block: !0,
                                onClick: function() {
                                    t.manager.openSubEditor({
                                        title: "配置查看更多展示内容",
                                        value: a,
                                        onChange: r
                                    })
                                }
                            }, "查看更多内容配置")
                        }
                    }, {
                        name: "copyable",
                        label: "启用内容复制功能",
                        type: "switch",
                        pipeIn: function(e) {
                            return !!e
                        },
                        mode: "inline",
                        className: "w-full"
                    }, {
                        visibleOn: "data.copyable",
                        name: "copyable.content",
                        type: "textarea",
                        label: "复制内容模板",
                        description: "默认为当前字段值，可定制。"
                    }]
                }, {
                    title: "外观",
                    controls: [{
                        name: "fixed",
                        type: "button-group",
                        label: "固定位置",
                        pipeIn: s.defaultValue(""),
                        size: "xs",
                        mode: "inline",
                        className: "w-full",
                        options: [{
                            value: "",
                            label: "不固定"
                        }, {
                            value: "left",
                            label: "左侧"
                        }, {
                            value: "right",
                            label: "右侧"
                        }]
                    }, {
                        name: "toggled",
                        type: "switch",
                        label: "默认展示",
                        mode: "inline",
                        className: "w-full",
                        pipeIn: s.defaultValue(!0)
                    }, {
                        name: "breakpoint",
                        type: "button-group",
                        label: "触发底部显示条件",
                        visibleOn: "data.tableFootableEnabled",
                        size: "xs",
                        multiple: !0,
                        options: [{
                            label: "总是",
                            value: "*"
                        }, {
                            label: "手机端",
                            value: "xs"
                        }, {
                            label: "平板",
                            value: "sm"
                        }, {
                            label: "PC小屏",
                            value: "md"
                        }, {
                            label: "PC大屏",
                            value: "lg"
                        }],
                        pipeIn: function(e) {
                            return e ? "string" == typeof e ? e : "*" : ""
                        },
                        pipeOut: function(e) {
                            return "string" == typeof e && ~e.indexOf("*") && /xs|sm|md|lg/.test(e) ? e.replace(/\*\s*,\s*|\s*,\s*\*/g, "") : e
                        }
                    }, {
                        type: "switch",
                        name: "className",
                        label: "内容强制换行",
                        mode: "inline",
                        className: "w-full",
                        pipeIn: function(e) {
                            return "string" == typeof e && /\word\-break\b/.test(e)
                        },
                        pipeOut: function(e, t) {
                            return (e ? "word-break " : "") + (t || "").replace(/\bword\-break\b/g, "").trim()
                        }
                    }, s.getSchemaTpl("className"), s.getSchemaTpl("className", {
                        name: "innerClassName",
                        label: "内部 CSS 类名"
                    }), {
                        name: "width",
                        type: "number",
                        label: "列宽",
                        description: "固定列的宽度，不推荐设置。"
                    }]
                }])]
            }
            ,
            t
        }
        return n.__extends(t, e),
        t.prototype.getRendererInfo = function(e) {
            var t = e.renderer
              , a = e.schema;
            if ("table-cell" === t.name)
                return {
                    name: a.label ? "<" + a.label + ">列" : "匿名列",
                    $schema: "https://isuda.baidu.com/schemas/TableColumn.json",
                    multifactor: !0,
                    wrapperResolve: function(e) {
                        var t = e.cellIndex + 1
                          , n = e.closest("table");
                        return [].slice.call(n.querySelectorAll("th:nth-child(" + t + '):not([data-editor-id="' + a.id + '"]),\n              td:nth-child(' + t + '):not([data-editor-id="' + a.id + '"])'))
                    }
                }
        }
        ,
        t.prototype.exchangeRenderer = function(e) {
            this.manager.showReplacePanel(e, "展示")
        }
        ,
        t.prototype.beforeReplace = function(e) {
            var t = e.context;
            t.info.plugin === this && t.data && (t.data.label = t.data.label || t.schema.label)
        }
        ,
        t
    }(o.BasePlugin);
    t.TableCellPlugin = d,
    r.registerEditorPlugin(d)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TasksPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "tasks",
            t.$schema = "https://isuda.baidu.com/schemas/TasksSchema.json",
            t.name = "异步任务",
            t.description = "用来做异步任务呈现或者操作。",
            t.tags = [],
            t.icon = "",
            t.scaffold = {
                type: "tasks",
                name: "tasks",
                items: [{
                    label: "hive 任务",
                    key: "hive",
                    status: 4,
                    remark: '查看详情<a target="_blank" href="http://www.baidu.com">日志</a>。'
                }, {
                    label: "小流量",
                    key: "partial",
                    status: 4
                }, {
                    label: "全量",
                    key: "full",
                    status: 4
                }]
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "异步任务",
            t.panelControls = [r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    name: "items",
                    label: "初始任务信息",
                    type: "combo",
                    multiple: !0,
                    multiLine: !0,
                    controls: [{
                        name: "label",
                        type: "text",
                        label: "任务名称"
                    }, {
                        name: "key",
                        type: "text",
                        label: "任务ID"
                    }, {
                        name: "status",
                        type: "number",
                        label: "任务状态"
                    }, {
                        name: "remark",
                        type: "textarea",
                        label: "任务说明"
                    }],
                    addButtonText: "新增任务信息",
                    scaffold: {
                        label: "名称",
                        key: "key",
                        status: 0,
                        remark: "说明"
                    },
                    description: "可以不设置，如果检测接口返回这些信息的话。"
                }, r.getSchemaTpl("api", {
                    name: "checkApi",
                    label: "状态检测接口"
                }), {
                    name: "interval",
                    type: "number",
                    min: 3e3,
                    step: 500,
                    visibleOn: "data.checkApi",
                    pipeIn: r.defaultValue(3e3),
                    label: "定时检测间隔"
                }, r.getSchemaTpl("api", {
                    name: "submitApi",
                    label: "提交接口"
                }), r.getSchemaTpl("api", {
                    name: "reSubmitApi",
                    label: "重试接口"
                }), {
                    name: "taskNameLabel",
                    type: "text",
                    pipeIn: r.defaultValue("任务名称"),
                    label: "任务名称栏标题"
                }, {
                    name: "operationLabel",
                    type: "text",
                    pipeIn: r.defaultValue("操作"),
                    label: "操作栏标题"
                }, {
                    name: "statusLabel",
                    type: "text",
                    pipeIn: r.defaultValue("状态"),
                    label: "状态栏标题"
                }, {
                    name: "remarkLabel",
                    type: "text",
                    pipeIn: r.defaultValue("备注说明"),
                    label: "备注栏标题"
                }, {
                    name: "btnText",
                    label: "按钮名称",
                    type: "text",
                    pipeIn: r.defaultValue("上线")
                }, {
                    name: "retryBtnText",
                    label: "重试按钮名称",
                    type: "text",
                    pipeIn: r.defaultValue("重试")
                }, {
                    name: "statusTextMap",
                    pipeIn: r.defaultValue(["未开始", "就绪", "进行中", "出错", "已完成", "出错"]),
                    type: "array",
                    label: "状态标签文字配置",
                    multiple: !0,
                    addable: !1,
                    removable: !1,
                    items: {
                        type: "text",
                        placeholder: "名称"
                    }
                }, {
                    name: "initialStatusCode",
                    label: "初始状态码",
                    pipeIn: r.defaultValue(0),
                    type: "number"
                }, {
                    name: "readyStatusCode",
                    label: "就绪状态码",
                    pipeIn: r.defaultValue(1),
                    type: "number"
                }, {
                    name: "loadingStatusCode",
                    label: "进行中状态码",
                    pipeIn: r.defaultValue(2),
                    type: "number"
                }, {
                    name: "errorStatusCode",
                    label: "错误状态码",
                    pipeIn: r.defaultValue(3),
                    type: "number"
                }, {
                    name: "finishStatusCode",
                    label: "完成状态码",
                    pipeIn: r.defaultValue(4),
                    type: "number"
                }, {
                    name: "canRetryStatusCode",
                    label: "出错但可重试状态码",
                    pipeIn: r.defaultValue(5),
                    type: "number"
                }]
            }, {
                title: "外观",
                controls: [r.getSchemaTpl("className", {
                    pipeIn: r.defaultValue("b-a bg-white table-responsive")
                }), r.getSchemaTpl("className", {
                    name: "tableClassName",
                    label: "表格 CSS 类名",
                    pipeIn: r.defaultValue("table table-striped m-b-none")
                }), r.getSchemaTpl("className", {
                    name: "btnClassName",
                    label: "按钮 CSS 类名",
                    pipeIn: r.defaultValue("btn-sm btn-default")
                }), r.getSchemaTpl("className", {
                    name: "retryBtnClassName",
                    label: "重试按钮 CSS 类名",
                    pipeIn: r.defaultValue("btn-sm btn-danger")
                }), {
                    name: "statusLabelMap",
                    pipeIn: r.defaultValue(["label-warning", "label-info", "label-info", "label-danger", "label-success", "label-danger"]),
                    type: "array",
                    label: "状态标签 CSS 类名配置",
                    multiple: !0,
                    addable: !1,
                    removable: !1,
                    items: {
                        type: "text",
                        placeholder: "CSS 类名"
                    }
                }]
            }, {
                title: "显隐",
                controls: [r.getSchemaTpl("visible")]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref")]
            }])],
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.TasksPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TimePlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "time-field",
            t.name = "时间展示",
            t
        }
        return n.__extends(t, e),
        t
    }(a(26).DatePlugin);
    t.TimePlugin = i,
    l.registerEditorPlugin(i)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TplPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "tpl",
            t.$schema = "https://isuda.baidu.com/schemas/TplSchema.json",
            t.name = "模板",
            t.description = "模板类型渲染器，可以基于数据直接渲染出 html，目前有两种语法，不要交叉使用。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/tpl",
            t.tags = ["展示"],
            t.previewSchema = {
                type: "tpl",
                tpl: "这是模板内容当前时间<%= new Date() %>"
            },
            t.scaffold = {
                type: "tpl",
                tpl: "请编辑内容",
                inline: !1
            },
            t.panelTitle = "模板",
            t.panelControls = [r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    type: "button-group",
                    name: "__mode",
                    label: "编辑模式",
                    pipeIn: r.defaultValue("source"),
                    size: "sm",
                    options: [{
                        label: "源码",
                        value: "source"
                    }, {
                        label: "富文本",
                        value: "rich-text"
                    }]
                }, {
                    label: "内容",
                    type: "rich-text",
                    visibleOn: 'data.__mode =="rich-text"',
                    required: !0,
                    buttons: ["paragraphFormat", "quote", "color", "|", "bold", "italic", "underline", "strikeThrough", "|", "formatOL", "formatUL", "align", "|", "insertLink", "insertImage", "insertTable", "|", "undo", "redo", "fullscreen"],
                    pipeIn: function(e, t) {
                        return e || t && t.html
                    },
                    name: "tpl",
                    description: '支持使用 <code>\\${xxx}</code> 来获取变量，或者用 lodash.template 语法来写模板逻辑。<a target="_blank" href="/docs/renderers/Tpl">详情</a>',
                    size: "lg"
                }, {
                    label: "内容",
                    type: "textarea",
                    required: !0,
                    minRows: 5,
                    language: "html",
                    visibleOn: 'data.__mode !="rich-text"',
                    pipeIn: function(e, t) {
                        return e || t && t.html
                    },
                    name: "tpl",
                    description: '支持使用 <code>\\${xxx}</code> 来获取变量，或者用 lodash.template 语法来写模板逻辑。<a target="_blank" href="/docs/renderers/Tpl">详情</a>'
                }]
            }, {
                title: "外观",
                controls: [{
                    label: "内联模式",
                    type: "switch",
                    name: "inline",
                    mode: "inline",
                    className: "w-full",
                    pipeIn: r.defaultValue(!0),
                    labelRemark: {
                        trigger: "click",
                        className: "m-l-xs",
                        rootClose: !0,
                        content: "内联模式采用 <code>span</code> 标签、非内联将采用 <code>div</code> 标签作为容器。",
                        placement: "left"
                    }
                }, r.getSchemaTpl("className")]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("visible")]
            }])],
            t
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.TplPlugin = o,
    l.registerEditorPlugin(o)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.VideoPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = a(6)
      , s = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "video",
            t.$schema = "https://isuda.baidu.com/schemas/VideoSchema.json",
            t.name = "视频",
            t.description = "视频控件，可以用来播放各种视频文件，包括 flv 和 hls 格式。",
            t.tags = [],
            t.icon = "",
            t.scaffold = {
                type: "video",
                autoPlay: !1,
                src: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
                poster: "https://video-react.js.org/assets/poster.png"
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.panelTitle = "视频",
            t.panelControls = [r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    name: "src",
                    type: "text",
                    label: "视频地址",
                    description: "可以写静态值，也可以用变量取比如：<code>\\${videoSrc}</code>"
                }, {
                    name: "poster",
                    type: "text",
                    label: "视频封面图片地址",
                    description: "可以写静态值，也可以用变量取比如：<code>\\${videoPoster}</code>"
                }, {
                    name: "autoPlay",
                    type: "switch",
                    mode: "inline",
                    className: "block",
                    label: "自动播放"
                }, {
                    name: "muted",
                    type: "switch",
                    mode: "inline",
                    className: "block",
                    label: "静音"
                }, {
                    name: "isLive",
                    type: "switch",
                    mode: "inline",
                    className: "block",
                    label: "直播流",
                    description: "如果是直播流，请勾选，否则有可能不能正常播放。"
                }]
            }, {
                title: "外观",
                controls: [{
                    name: "aspectRatio",
                    label: "视频比例",
                    type: "button-group",
                    size: "sm",
                    mode: "inline",
                    className: "block",
                    value: "auto",
                    options: [{
                        label: "自动",
                        value: "auto"
                    }, {
                        label: "4:3",
                        value: "4:3"
                    }, {
                        label: "16:9",
                        value: "16:9"
                    }]
                }, {
                    name: "splitPoster",
                    type: "switch",
                    mode: "inline",
                    className: "block",
                    label: "分开显示封面"
                }, r.getSchemaTpl("className")]
            }, {
                title: "显隐",
                controls: [r.getSchemaTpl("visible")]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref"), {
                    type: "text",
                    name: "rates",
                    label: "视频速率",
                    multiple: !0,
                    joinValues: !1,
                    extractValue: !0,
                    options: [.5, 1, 1.25, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((function(e) {
                        return {
                            label: e,
                            value: e
                        }
                    }
                    ))
                }, {
                    name: "frames",
                    type: "text",
                    label: "视频帧信息",
                    description: "比如填写：<code>\\${videoFrames}</code>会在当前作用域中查找 videoFrames 变量，如果是对象，将生成视频截图列表，点击后可跳转到对应的帧。"
                }]
            }])],
            t
        }
        return n.__extends(t, e),
        t.prototype.filterProps = function(e) {
            return e.frames = o.JSONPipeOut(e.frames),
            e
        }
        ,
        t
    }(i.BasePlugin);
    t.VideoPlugin = s,
    l.registerEditorPlugin(s)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.WizardPlugin = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2)
      , r = a(3)
      , o = n.__importDefault(a(4))
      , s = a(13)
      , d = a(16)
      , c = a(12)
      , u = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "wizard",
            t.name = "向导",
            t.description = "表单向导，可以将复杂的多个表单项拆分成多个步骤，一步一步指引用户完成填写。",
            t.docLink = "https://baidu.gitee.io/amis/docs/components/form/wizard",
            t.tags = ["功能"],
            t.icon = "fa fa-list-ol",
            t.scaffold = {
                type: "wizard",
                steps: [{
                    title: "第一步",
                    controls: [{
                        type: "text",
                        label: "文本",
                        name: "var1"
                    }]
                }, {
                    title: "第二步",
                    controls: [{
                        type: "text",
                        label: "文本2",
                        name: "var2"
                    }]
                }]
            },
            t.previewSchema = {
                type: "wizard",
                className: "text-left m-b-none",
                steps: [{
                    title: "第一步",
                    controls: [{
                        type: "text",
                        label: "文本",
                        name: "var1"
                    }]
                }, {
                    title: "第二步",
                    controls: []
                }]
            },
            t.panelTitle = "向导",
            t.panelControls = [r.getSchemaTpl("tabs", [{
                title: "常规",
                controls: [{
                    name: "steps",
                    label: "步骤设置",
                    type: "combo",
                    multiple: !0,
                    multiLine: !0,
                    addButtonText: "新增一步",
                    scaffold: {
                        title: "标题",
                        controls: [{
                            type: "text",
                            name: "var1",
                            label: "文本"
                        }]
                    },
                    controls: [{
                        name: "title",
                        type: "text",
                        label: "标题",
                        pipeIn: function(e, t) {
                            return e || t.label
                        }
                    }, {
                        type: "fieldSet",
                        title: "其他设置",
                        collapsed: !0,
                        collapsable: !0,
                        className: "fieldset m-b-none",
                        controls: [{
                            name: "mode",
                            label: "展示模式",
                            type: "button-group",
                            size: "xs",
                            mode: "inline",
                            className: "w-full",
                            value: "normal",
                            options: [{
                                label: "默认",
                                value: "normal"
                            }, {
                                label: "左右摆放",
                                value: "horizontal"
                            }, {
                                label: "内联",
                                value: "inline"
                            }]
                        }, r.getSchemaTpl("horizontal", {
                            visibleOn: 'data.mode == "horizontal"'
                        }), r.getSchemaTpl("api", {
                            label: "保存接口",
                            description: "如果接口返回了 <code>step</code> 变量，且数值是数字类型，比如 <code>3</code>，提交完后回跳到第 3 步"
                        }), {
                            label: "采用异步方式?",
                            remark: {
                                trigger: "click",
                                rootClose: !0,
                                title: "什么是异步方式？",
                                content: "异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。",
                                placement: "left"
                            },
                            type: "switch",
                            name: "asyncApi",
                            visibleOn: "data.api",
                            pipeIn: function(e) {
                                return null != e
                            },
                            pipeOut: function(e) {
                                return e ? "" : void 0
                            },
                            mode: "inline",
                            className: "block"
                        }, r.getSchemaTpl("api", {
                            name: "asyncApi",
                            label: "异步检测接口",
                            visibleOn: "data.asyncApi != null",
                            description: "设置此属性后，表单提交发送保存接口后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束"
                        }), {
                            type: "divider"
                        }, r.getSchemaTpl("api", {
                            name: "initApi",
                            label: "初始化接口",
                            description: "用来初始化表单数据"
                        }), {
                            label: "采用异步方式？",
                            remark: {
                                trigger: "click",
                                rootClose: !0,
                                title: "什么是异步方式？",
                                content: "异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。",
                                placement: "left"
                            },
                            type: "switch",
                            name: "initAsyncApi",
                            visibleOn: "data.initApi",
                            pipeIn: function(e) {
                                return null != e
                            },
                            pipeOut: function(e) {
                                return e ? "" : void 0
                            },
                            mode: "inline",
                            className: "block"
                        }, r.getSchemaTpl("api", {
                            name: "initAsyncApi",
                            label: "异步检测接口",
                            visibleOn: "data.initAsyncApi != null",
                            description: "设置此属性后，表单请求 initApi 后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束"
                        }), r.getSchemaTpl("initFetch"), {
                            label: "是否可被点开",
                            type: "text",
                            name: "jumpableOn",
                            description: "用表达式来决定，当前步骤是否可被点开。额外可用变量：currentStep 表示当前步骤。"
                        }]
                    }]
                }]
            }, {
                title: "接口",
                controls: [r.getSchemaTpl("api", {
                    name: "initApi",
                    label: "初始化接口",
                    description: "用来初始化向导数据，当接口中返回 <code>step</code> 字段时，可以控制默认跳转到第几步，注意数值一定得是数字类型。当返回 <code>submiting</code> 并且当前步骤中存在异步保存接口时，可以让 wizard 初始进入异步提交状态。"
                }), {
                    label: "采用异步方式？",
                    remark: {
                        trigger: "click",
                        rootClose: !0,
                        title: "什么是异步方式？",
                        content: "异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。",
                        placement: "left"
                    },
                    type: "switch",
                    name: "initAsyncApi",
                    visibleOn: "data.initApi",
                    pipeIn: function(e) {
                        return null != e
                    },
                    pipeOut: function(e) {
                        return e ? "" : void 0
                    },
                    mode: "inline"
                }, r.getSchemaTpl("api", {
                    name: "initAsyncApi",
                    label: "异步检测接口",
                    visibleOn: "data.initAsyncApi != null",
                    description: "设置此属性后，表单请求 initApi 后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束"
                }), {
                    name: "initFetch",
                    type: "radios",
                    label: "是否初始拉取",
                    inline: !0,
                    options: [{
                        label: "是",
                        value: !0
                    }, {
                        label: "否",
                        value: !1
                    }, {
                        label: "表达式",
                        value: ""
                    }]
                }, {
                    name: "initFetch",
                    autoComplete: !1,
                    visibleOn: 'typeof this.initFetch !== "boolean"',
                    type: "text",
                    placeholder: "",
                    className: "m-t-n-sm"
                }, {
                    type: "divider"
                }, r.getSchemaTpl("api", {
                    label: "保存接口",
                    description: "用来保存表单数据, 最后一步点击完成触发，<code>如果最后一步中已经设置保存接口，则此处设置无效。</code>"
                }), {
                    label: "采用异步方式?",
                    remark: {
                        trigger: "click",
                        rootClose: !0,
                        title: "什么是异步方式？",
                        content: "异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。",
                        placement: "left"
                    },
                    type: "switch",
                    name: "asyncApi",
                    visibleOn: "data.api",
                    pipeIn: function(e) {
                        return null != e
                    },
                    pipeOut: function(e) {
                        return e ? "" : void 0
                    },
                    mode: "inline"
                }, r.getSchemaTpl("api", {
                    name: "asyncApi",
                    label: "异步检测接口",
                    visibleOn: "data.asyncApi != null",
                    description: "设置此属性后，表单提交发送保存接口后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束"
                })]
            }, {
                title: "外观",
                controls: [{
                    name: "mode",
                    label: "展示模式",
                    type: "button-group",
                    size: "sm",
                    mode: "inline",
                    className: "w-full",
                    value: "horizontal",
                    options: [{
                        label: "水平",
                        value: "horizontal"
                    }, {
                        label: "垂直",
                        value: "vertical"
                    }]
                }, {
                    name: "actionPrevLabel",
                    label: "上一步按钮名称",
                    type: "text",
                    pipeIn: r.defaultValue("上一步")
                }, {
                    name: "actionNextLabel",
                    label: "下一步按钮名称",
                    type: "text",
                    pipeIn: r.defaultValue("下一步")
                }, {
                    name: "actionNextSaveLabel",
                    label: "保存并下一步按钮名称",
                    type: "text",
                    pipeIn: r.defaultValue("保存并下一步")
                }, {
                    name: "actionFinishLabel",
                    label: "完成按钮名称",
                    type: "text",
                    pipeIn: r.defaultValue("完成")
                }, r.getSchemaTpl("className"), r.getSchemaTpl("className", {
                    name: "actionClassName",
                    label: "按钮 CSS 类名"
                })]
            }, {
                title: "其他",
                controls: [r.getSchemaTpl("ref"), r.getSchemaTpl("name"), r.getSchemaTpl("reload"), {
                    label: "跳转",
                    name: "redirect",
                    type: "text",
                    description: "当设置此值后，表单提交完后跳转到目标地址。"
                }, r.getSchemaTpl("visible")]
            }])],
            t.patchContainers = ["steps.controls"],
            t.vRendererConfig = {
                regions: {
                    controls: {
                        key: "controls",
                        label: "表单集合",
                        wrapperResolve: function(e) {
                            return e
                        }
                    },
                    actions: {
                        label: "按钮组",
                        key: "actions",
                        preferTag: "按钮",
                        wrapperResolve: function(e) {
                            return e
                        }
                    }
                },
                panelTitle: "步骤",
                panelControlsCreator: function(e) {
                    return r.getSchemaTpl("tabs", [{
                        title: "常规",
                        controls: [{
                            name: "title",
                            type: "text",
                            label: "标题",
                            pipeIn: function(e, t) {
                                return e || t.label
                            }
                        }, r.getSchemaTpl("api", {
                            label: "保存接口",
                            description: "如果接口返回了 <code>step</code> 变量，且数值是数字类型，比如 <code>3</code>，提交完后回跳到第 3 步"
                        }), {
                            label: "采用异步方式?",
                            remark: {
                                trigger: "click",
                                rootClose: !0,
                                title: "什么是异步方式？",
                                content: "异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。",
                                placement: "left"
                            },
                            type: "switch",
                            name: "asyncApi",
                            visibleOn: "data.api",
                            pipeIn: function(e) {
                                return null != e
                            },
                            pipeOut: function(e) {
                                return e ? "" : void 0
                            },
                            mode: "inline",
                            className: "block"
                        }, r.getSchemaTpl("api", {
                            name: "asyncApi",
                            label: "异步检测接口",
                            visibleOn: "data.asyncApi != null",
                            description: "设置此属性后，表单提交发送保存接口后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束"
                        }), {
                            type: "divider"
                        }, r.getSchemaTpl("api", {
                            name: "initApi",
                            label: "初始化接口",
                            description: "用来初始化表单数据"
                        }), {
                            label: "采用异步方式？",
                            remark: {
                                trigger: "click",
                                rootClose: !0,
                                title: "什么是异步方式？",
                                content: "异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。",
                                placement: "left"
                            },
                            type: "switch",
                            name: "initAsyncApi",
                            visibleOn: "data.initApi",
                            pipeIn: function(e) {
                                return null != e
                            },
                            pipeOut: function(e) {
                                return e ? "" : void 0
                            },
                            mode: "inline",
                            className: "block"
                        }, r.getSchemaTpl("api", {
                            name: "initAsyncApi",
                            label: "异步检测接口",
                            visibleOn: "data.initAsyncApi != null",
                            description: "设置此属性后，表单请求 initApi 后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束"
                        }), r.getSchemaTpl("initFetch")]
                    }, {
                        title: "外观",
                        controls: [{
                            name: "mode",
                            label: "展示模式",
                            type: "button-group",
                            size: "xs",
                            mode: "inline",
                            className: "w-full",
                            value: "normal",
                            options: [{
                                label: "默认",
                                value: "normal"
                            }, {
                                label: "左右摆放",
                                value: "horizontal"
                            }, {
                                label: "内联",
                                value: "inline"
                            }]
                        }, r.getSchemaTpl("horizontal", {
                            visibleOn: 'data.mode == "horizontal"'
                        })]
                    }, {
                        title: "其他",
                        controls: [{
                            label: "是否可被点开",
                            type: "text",
                            name: "jumpableOn",
                            description: "用表达式来决定，当前步骤是否可被点开。额外可用变量：currentStep 表示当前步骤。"
                        }]
                    }])
                }
            },
            t.wizardWrapperResolve = function(e) {
                return [].slice.call(e.querySelectorAll('[role="wizard-body"],[role="wizard-footer"]'))
            }
            ,
            t.overrides = {
                renderWizard: function() {
                    var e = this
                      , t = this.props.$$editor
                      , a = this.props.steps
                      , l = this.state.currentStep
                      , i = this.super();
                    if (!t || !(null == a ? void 0 : a[l - 1]))
                        return i;
                    var r = l - 1
                      , u = a[r]
                      , p = u.$$id
                      , m = t.plugin;
                    return d.mapReactElement(i, (function(a) {
                        return /Wizard-step\b/.test(a.props.className) ? o.default.createElement(s.VRenderer, {
                            key: p,
                            plugin: t.plugin,
                            renderer: t.renderer,
                            $schema: "https://isuda.baidu.com/schemas/WizardStepSchema.json",
                            hostId: t.id,
                            memberIndex: r,
                            name: u.title || "步骤" + (r + 1),
                            id: p,
                            draggable: !1,
                            wrapperResolve: m.wizardWrapperResolve,
                            schemaPath: t.schemaPath + "/steps/" + r,
                            path: e.props.$path + "/" + r,
                            data: e.props.data
                        }, d.mapReactElement(a, (function(e, a) {
                            var l;
                            if ((null === (l = e.props.schema) || void 0 === l ? void 0 : l.controls) && e.props.schema.$$id) {
                                var i = m.vRendererConfig.regions.controls
                                  , r = n.__assign({}, e.props.schema);
                                return delete r.$$id,
                                o.default.createElement(c.RegionWrapper, {
                                    key: i.key,
                                    preferTag: i.preferTag,
                                    name: i.key,
                                    label: i.label,
                                    regionConfig: i,
                                    editorStore: m.manager.store,
                                    manager: m.manager,
                                    children: o.default.cloneElement(e, {
                                        schema: r
                                    }),
                                    wrapperResolve: i.wrapperResolve,
                                    rendererName: t.renderer.name
                                })
                            }
                            return e
                        }
                        ))) : a
                    }
                    ))
                },
                renderFooter: function() {
                    var e = this.props.$$editor
                      , t = this.props.steps
                      , a = this.state.currentStep
                      , n = this.super();
                    if (!e || !(null == t ? void 0 : t[a - 1]))
                        return n;
                    var l = e.plugin
                      , i = l.vRendererConfig.regions.actions;
                    return o.default.createElement(c.RegionWrapper, {
                        key: i.key,
                        preferTag: i.preferTag,
                        name: i.key,
                        label: i.label,
                        regionConfig: i,
                        editorStore: l.manager.store,
                        manager: l.manager,
                        children: n,
                        wrapperResolve: i.wrapperResolve,
                        rendererName: e.renderer.name
                    })
                }
            },
            t
        }
        return n.__extends(t, e),
        t.prototype.buildEditorToolbar = function(e, t) {
            if (e.info.plugin === this && e.info.renderer.name === this.rendererName && !e.info.hostId) {
                var a = e.node;
                t.push({
                    level: "secondary",
                    icon: "fa fa-chevron-left",
                    tooltip: "上个步骤",
                    onClick: function() {
                        var e = a.getComponent();
                        if (null == e ? void 0 : e.gotoStep) {
                            var t = e.state.currentStep;
                            e.gotoStep(t - 1)
                        }
                    }
                }),
                t.push({
                    level: "secondary",
                    icon: "fa fa-chevron-right",
                    tooltip: "下个步骤",
                    onClick: function() {
                        var e = a.getComponent();
                        if (null == e ? void 0 : e.gotoStep) {
                            var t = e.state.currentStep;
                            e.gotoStep(t + 1)
                        }
                    }
                })
            }
        }
        ,
        t.prototype.filterProps = function(e) {
            return e.affixFooter = !1,
            e
        }
        ,
        t
    }(i.BasePlugin);
    t.WizardPlugin = u,
    l.registerEditorPlugin(u)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.WrapperPlugin = void 0;
    var n = a(0)
      , l = a(5)
      , i = n.__importDefault(a(4))
      , r = a(1)
      , o = a(2)
      , s = a(3)
      , d = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rendererName = "wrapper",
            t.$schema = "https://isuda.baidu.com/schemas/WrapperSchema.json",
            t.name = "包裹",
            t.description = "类似于容器，唯一的区别在于会默认会有一层内边距。",
            t.tags = ["容器"],
            t.icon = "",
            t.scaffold = {
                type: "wrapper",
                body: "内容"
            },
            t.previewSchema = n.__assign({}, t.scaffold),
            t.regions = [{
                key: "body",
                label: "内容区"
            }],
            t.panelTitle = "包裹",
            t.panelControls = [{
                children: i.default.createElement(l.Button, {
                    size: "sm",
                    className: "m-b-sm",
                    level: "info",
                    block: !0,
                    onClick: function() {
                        t.manager.showInsertPanel("body")
                    }
                }, "新增内容")
            }, {
                type: "divider"
            }, s.getSchemaTpl("size", {
                label: "内间距大小",
                options: [{
                    label: "极小",
                    value: "xs"
                }, {
                    label: "小",
                    value: "sm"
                }, {
                    label: "默认",
                    value: ""
                }, {
                    label: "中",
                    value: "md"
                }, {
                    label: "大",
                    value: "lg"
                }, {
                    label: "无",
                    value: "none"
                }],
                pipeIn: s.defaultValue("")
            }), s.getSchemaTpl("className", {
                description: "设置样式后，大小设置将无效。",
                pipeIn: s.defaultValue("bg-white")
            })],
            t
        }
        return n.__extends(t, e),
        t
    }(o.BasePlugin);
    t.WrapperPlugin = d,
    r.registerEditorPlugin(d)
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.BasicEditor = t.RendererEditor = void 0;
    var n = a(0)
      , l = a(1)
      , i = a(2);
    t.RendererEditor = function(e, t) {
        return function(a) {
            l.registerEditorPlugin(function(a) {
                function l(n) {
                    var l = a.call(this, n) || this;
                    return l.rendererName = e,
                    l.name = l.tipName || t.name,
                    l.description = t.description,
                    l.scaffold = t.scaffold || {
                        type: t.type
                    },
                    l.previewSchema = t.previewSchema || l.scaffold,
                    l.settingsSchema && (l.panelTitle = l.settingsSchema.title,
                    l.panelControls = l.settingsSchema.controls),
                    l
                }
                return n.__extends(l, a),
                l
            }(a))
        }
    }
    ;
    var r = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e),
        t
    }(i.BasePlugin);
    t.BasicEditor = r
}
, function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = a(0)
      , l = n.__importDefault(a(4))
      , i = n.__importDefault(a(21))
      , r = n.__importDefault(a(8))
      , o = n.__importDefault(a(27))
      , s = a(34)
      , d = a(35)
      , c = a(6)
      , u = function(e) {
        function t(t) {
            var a = e.call(this, t) || this;
            return a.manager.on("build-panels", a.buildPanels),
            a
        }
        return n.__extends(t, e),
        t.prototype.componentWillUnmount = function() {
            this.manager.off("build-panels", this.buildPanels)
        }
        ,
        t.prototype.buildPanels = function(e) {
            var t = e.context.data;
            Array.isArray(t) && t.splice(0, t.length)
        }
        ,
        t.prototype.render = function() {
            var e = this.props
              , t = e.preview
              , a = e.className
              , n = e.theme
              , i = e.data;
            return l.default.createElement("div", {
                className: r.default("ae-Editor", {
                    preview: t
                }, a)
            }, l.default.createElement("div", {
                className: "ae-Editor-inner",
                onContextMenu: this.handleContextMenu
            }, l.default.createElement("div", {
                className: "ae-Main"
            }, l.default.createElement(o.default, {
                editable: !t,
                store: this.store,
                manager: this.manager,
                theme: n,
                data: i
            }))), l.default.createElement(s.SubEditor, {
                store: this.store,
                manager: this.manager,
                theme: n
            }), l.default.createElement(d.ScaffoldModal, {
                store: this.store,
                manager: this.manager,
                theme: n
            }))
        }
        ,
        n.__decorate([c.autobind, n.__metadata("design:type", Function), n.__metadata("design:paramtypes", [Object]), n.__metadata("design:returntype", void 0)], t.prototype, "buildPanels", null),
        t
    }(i.default);
    t.default = u
}
]));
