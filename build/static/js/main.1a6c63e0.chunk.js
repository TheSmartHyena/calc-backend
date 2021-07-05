(this["webpackJsonpcalc-frontend"]=this["webpackJsonpcalc-frontend"]||[]).push([[0],{37:function(e,t,n){},62:function(e,t,n){},64:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(25),s=n.n(r),i=(n(37),n(14)),l=n.n(i),j=n(31),o=n(26),d=n(11),u=n(27),x=n(65),b=n(66),h=n(30),O=n(68),f=n(67),v=n(69),p=n(15),y=n.n(p),C=n(1),k=function(e){var t=e.details,n=e.onClickHistory;return Object(C.jsx)(O.a,{style:{width:"18rem"},className:"history-card",onClick:function(){return n(t.calculus,t.result)},children:Object(C.jsxs)(O.a.Body,{children:[Object(C.jsx)(O.a.Subtitle,{className:"mb-2 text-muted text-right",children:t.calculus}),Object(C.jsx)(O.a.Text,{className:"text-right",children:t.result})]})})};n(61),n(62);y.a.defaults.headers.post["Content-Type"]="application/json";var m=function(){var e=Object(c.useState)(""),t=Object(d.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(""),s=Object(d.a)(r,2),i=s[0],p=s[1],m=Object(c.useState)([]),g=Object(d.a)(m,2),w=g[0],N=g[1],S=Object(c.useState)(0),L=Object(d.a)(S,2),R=L[0],B=L[1],T=function(){var e=Object(o.a)(l.a.mark((function e(){var t,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("ERROR"!==n&&""!==n){e.next=3;break}return F(),e.abrupt("return");case 3:return e.prev=3,e.next=6,y.a.post("".concat("https://red-loon-48470.herokuapp.com","/calc"),{calculus:n});case 6:t=e.sent,p("".concat(n," = ").concat(t.data.result)),a(t.data.result),(c=Object(j.a)(w)).unshift({calculus:n,result:t.data.result}),N(c),B(1),e.next=20;break;case 15:e.prev=15,e.t0=e.catch(3),p("".concat(n," = Error")),a("ERROR"),422===e.t0.response.data.statusCode?alert("Error during calculus: ".concat(e.t0.response.data.message)):alert("An un-identified error happened.");case 20:case"end":return e.stop()}}),e,null,[[3,15]])})));return function(){return e.apply(this,arguments)}}(),E=function(e){1===R&&"+"!==e&&"-"!==e&&"*"!==e&&"/"!==e?(B(0),a(e)):(B(0),a(n+e))},F=function(){p(""),a("")},H=function(e,t){p(e),a(t),B(0)};return Object(C.jsxs)("div",{className:"Calc",children:[Object(C.jsxs)(u.a,{children:[Object(C.jsx)("title",{children:"Calculator"}),Object(C.jsx)("meta",{name:"description",content:"Calc application"})]}),Object(C.jsxs)(x.a,{children:[Object(C.jsx)(b.a,{children:Object(C.jsx)(h.a,{children:Object(C.jsx)("h1",{className:"display-4 text-center",children:"Simple calculator"})})}),Object(C.jsxs)(b.a,{children:[Object(C.jsx)(h.a,{lg:4}),Object(C.jsx)(h.a,{lg:4,children:Object(C.jsx)(O.a,{style:{width:"18rem"},centered:"true",children:Object(C.jsxs)(O.a.Body,{children:[Object(C.jsx)("div",{className:"inputs-body",children:Object(C.jsxs)(O.a.Text,{children:[Object(C.jsx)(f.a.Control,{type:"text",value:i,className:"text-right",readOnly:!0}),Object(C.jsx)(f.a.Control,{type:"text",value:n,className:"text-right",readOnly:!0})]})}),Object(C.jsx)("div",{className:"buttons-body",children:Object(C.jsxs)(O.a.Text,{children:[Object(C.jsxs)(b.a,{children:[Object(C.jsxs)(h.a,{xs:6,children:[Object(C.jsx)(v.a,{onClick:function(){return F()},variant:"outline-secondary",children:"C"})," "]}),Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){a(n.slice(0,-1))},variant:"outline-secondary",children:Object(C.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",className:"bi bi-arrow-left-short",viewBox:"0 0 16 16",children:Object(C.jsx)("path",{fillRule:"evenodd",d:"M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"})})})," "]}),Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E("/")},variant:"outline-secondary",children:"/"})," "]})]}),Object(C.jsxs)(b.a,{children:[Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E("7")},variant:"outline-secondary",children:"7"})," "]}),Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E("8")},variant:"outline-secondary",children:"8"})," "]}),Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E("9")},variant:"outline-secondary",children:"9"})," "]}),Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E("*")},variant:"outline-secondary",children:Object(C.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",className:"bi bi-x",viewBox:"0 0 16 16",children:Object(C.jsx)("path",{d:"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"})})})," "]})]}),Object(C.jsxs)(b.a,{children:[Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E("4")},variant:"outline-secondary",children:"4"})," "]}),Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E("5")},variant:"outline-secondary",children:"5"})," "]}),Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E("6")},variant:"outline-secondary",children:"6"})," "]}),Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E("-")},variant:"outline-secondary",children:"-"})," "]})]}),Object(C.jsxs)(b.a,{children:[Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E("1")},variant:"outline-secondary",children:"1"})," "]}),Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E("2")},variant:"outline-secondary",children:"2"})," "]}),Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E("3")},variant:"outline-secondary",children:"3"})," "]}),Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E("+")},variant:"outline-secondary",children:"+"})," "]})]}),Object(C.jsxs)(b.a,{children:[Object(C.jsxs)(h.a,{xs:6,children:[Object(C.jsx)(v.a,{onClick:function(){return E("0")},variant:"outline-secondary",children:"0"})," "]}),Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return E(".")},variant:"outline-secondary",children:"."})," "]}),Object(C.jsxs)(h.a,{xs:3,children:[Object(C.jsx)(v.a,{onClick:function(){return T()},variant:"outline-secondary",children:"="})," "]})]})]})})]})})}),Object(C.jsx)(h.a,{lg:4,children:w.map((function(e){return Object(C.jsx)(k,{details:e,onClickHistory:H})}))})]})]})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,70)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),r(e),s(e)}))};s.a.render(Object(C.jsx)(a.a.StrictMode,{children:Object(C.jsx)(m,{})}),document.getElementById("root")),g()}},[[64,1,2]]]);
//# sourceMappingURL=main.1a6c63e0.chunk.js.map