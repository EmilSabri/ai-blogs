import{S as G,i as H,s as I,k as v,q as g,a as S,l as k,m as w,r as p,c as b,h as m,b as D,G as u,u as E,C,K,n as F}from"../../../chunks/index-cf94e352.js";function L(o,e,s){const l=o.slice();return l[1]=e[s],l}function A(o){let e,s,l=o[1].title+"",c,d,f;return{c(){e=v("div"),s=v("a"),c=g(l),f=S(),this.h()},l(i){e=k(i,"DIV",{});var h=w(e);s=k(h,"A",{href:!0});var _=w(s);c=p(_,l),_.forEach(m),f=b(h),h.forEach(m),this.h()},h(){F(s,"href",d="/articles/"+o[1].contentLink)},m(i,h){D(i,e,h),u(e,s),u(s,c),u(e,f)},p(i,h){h&1&&l!==(l=i[1].title+"")&&E(c,l),h&1&&d!==(d="/articles/"+i[1].contentLink)&&F(s,"href",d)},d(i){i&&m(e)}}}function P(o){let e,s,l=o[0].search_params+"",c,d,f=o[0].didFind?"":"were not found. Showing all articles",i,h,_=o[0].articles,n=[];for(let t=0;t<_.length;t+=1)n[t]=A(L(o,_,t));return{c(){e=v("h1"),s=g("Search results for "),c=g(l),d=S(),i=g(f),h=S();for(let t=0;t<n.length;t+=1)n[t].c()},l(t){e=k(t,"H1",{});var r=w(e);s=p(r,"Search results for "),c=p(r,l),d=b(r),i=p(r,f),h=b(r);for(let a=0;a<n.length;a+=1)n[a].l(r);r.forEach(m)},m(t,r){D(t,e,r),u(e,s),u(e,c),u(e,d),u(e,i),u(e,h);for(let a=0;a<n.length;a+=1)n[a].m(e,null)},p(t,[r]){if(r&1&&l!==(l=t[0].search_params+"")&&E(c,l),r&1&&f!==(f=t[0].didFind?"":"were not found. Showing all articles")&&E(i,f),r&1){_=t[0].articles;let a;for(a=0;a<_.length;a+=1){const q=L(t,_,a);n[a]?n[a].p(q,r):(n[a]=A(q),n[a].c(),n[a].m(e,null))}for(;a<n.length;a+=1)n[a].d(1);n.length=_.length}},i:C,o:C,d(t){t&&m(e),K(n,t)}}}function V(o,e,s){let{data:l}=e;return o.$$set=c=>{"data"in c&&s(0,l=c.data)},[l]}class z extends G{constructor(e){super(),H(this,e,V,P,I,{data:0})}}export{z as default};
