"use strict";(self.webpackChunkgatsby_blog_template=self.webpackChunkgatsby_blog_template||[]).push([[768],{3317:function(e,t,a){var n=a(7294);t.Z=function(e){var t=e.title;return n.createElement("header",{className:"border-bottom border-color-light-grey"},n.createElement("div",{className:"container"},n.createElement("h1",{className:"margin-none padding-top-2 padding-bottom-2"},t)))}},2089:function(e,t,a){var n=a(7294);t.Z=function(e){var t=e.content,a=e.sidebar;return n.createElement("section",{className:"main-container container"},n.createElement("div",{className:"content-wrapper padding-top-half padding-bottom-2"},t),n.createElement("div",{className:"sidebar-wrapper padding-top-half padding-bottom-2"},a))}},3480:function(e,t,a){a.d(t,{Z:function(){return i}});var n=a(7294),r=a(7606),l=a(9778),o=function(e){var t=e.value,a=e.currentPage,o=e.pathPrefix,i=e.pathPrefixPagination,s=-1===t,c=-2===t,m=o;return s?m+=i+"/"+(a-3):c?m+=i+"/"+(a+3):1!==t&&(m+=i+"/"+t),n.createElement(l.Z,{to:m,className:"pagination-item "+(a===t?"active":""),activeClassName:"active"},s&&n.createElement(r.G,{icon:["fas","angle-double-left"],size:"xs"}),t>0&&t,c&&n.createElement(r.G,{icon:["fas","angle-double-right"],size:"xs"}))},i=function(e){var t=e.currentPage,a=e.totalPages,r=e.pathPrefix,l=e.pathPrefixPagination,i=e.extraClass,s=[];if(a<=7)for(var c=1;c<=a;c++)s.push(c);else if(t<=4){for(var m=1;m<=5;m++)s.push(m);s.push(-2,a)}else if(a-t<4){s.push(1,-1);for(var d=a-4;d<=a;d++)s.push(d)}else s.push(1,-1,t-1,t,t+1,-2,a);return n.createElement(n.Fragment,null,a>=2&&n.createElement("div",{className:"pagination-container "+i},s.map((function(e,a){return n.createElement(o,{key:r+"-"+a,value:e,currentPage:t,pathPrefix:r,pathPrefixPagination:l})}))))}},9354:function(e,t,a){var n=a(7294),r=a(8415),l=a(2797),o=a.n(l);t.Z=function(e){var t=e.date,a=e.extraClass,l=void 0===a?"":a;return n.createElement("div",{className:"text-description "+l},o().postOnDate," ",(0,r.p6)(t))}},149:function(e,t,a){a.d(t,{Z:function(){return u}});var n=a(1721),r=a(7294),l=a(6125),o=a(9778),i=function(e){var t=e.post,a=e.extraClass,n=void 0===a?"":a;return t.cover?r.createElement(o.Z,{to:t.slug,key:t.title,className:"thumbnail-wrapper line-height-reset "+n},r.createElement(l.G,{image:(0,l.d)(t.cover),className:"thumbnail-img",alt:""})):null},s=a(9354),c=function(e){var t=e.post,a=e.extraClass,n=void 0===a?"":a;return r.createElement("div",{className:"post-info-wrapper "+n},r.createElement(o.Z,{to:t.slug,key:t.title},r.createElement("h2",null,r.createElement("small",null,t.title))),r.createElement("div",{className:"margin-bottom-half"},t.excerpt),r.createElement("small",null,r.createElement(s.Z,{date:t.date})))},m=function(e){var t=e.post,a=e.hasThumbnail;return r.createElement("article",{key:t.title,className:"article-container padding-bottom-2 padding-top-2 border-bottom border-color-light-grey"},a&&r.createElement(i,{post:t}),r.createElement(c,{post:t}))},d=function(e){function t(){for(var t,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=e.call.apply(e,[this].concat(n))||this).state={maxPosts:(t.props.hasLoadmore||t.props.forcePostsPerPage)&&t.props.postsPerPage?t.props.postsPerPage:t.props.postList.length},t.handleLoadmore=function(){var e=t.props,a=e.hasLoadmore,n=void 0!==a&&a,r=e.numberLoadmore;n&&t.setState((function(e){return{maxPosts:e.maxPosts+r}}))},t}return(0,n.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.postList,a=e.hasThumbnail,n=void 0===a||a,l=e.hasLoadmore,o=void 0!==l&&l,i=this.state.maxPosts;return r.createElement(r.Fragment,null,r.createElement("div",{className:"post-listing-container"},t.map((function(e,t){return t<i?r.createElement(m,{key:e.title,post:e,hasThumbnail:n}):null}))),o&&i<t.length&&r.createElement("div",{className:"loadmore-wrapper margin-top padding-top-half text-center"},r.createElement("button",{className:"btn-primary",onClick:this.handleLoadmore},this.props.btnLoadmore)))},t}(r.Component),u=d},1097:function(e,t,a){a.d(t,{Z:function(){return v}});var n=a(7294),r=a(9778),l=function(e){var t=e.extraClass,a=void 0===t?"":t,r=e.children;return n.createElement("aside",{className:a+" padding-top padding-bottom"},r)},o=function(e){var t=e.title;return n.createElement("h3",{className:"text-uppercase"},n.createElement("small",null,t))},i=a(8415),s=a(2797),c=a.n(s),m=function(e){var t=e.categoryList;return n.createElement(l,{extraClass:"categories-container"},n.createElement(o,{title:c().categoryWidgetTitle}),n.createElement("div",null,t.map((function(e){return n.createElement(r.Z,{key:e,to:(0,i.IX)(e),className:"block border-bottom border-color-light-grey padding-top-half padding-bottom-half"},n.createElement("span",null,e))}))))},d=function(e){var t=e.content;return n.createElement(r.Z,{key:t,to:(0,i.bT)(t),className:"inline-block margin-right-half margin-bottom-half  border border-color-light-grey padding-left-half padding-right-half"},n.createElement("span",null,t))},u=function(e){var t=e.tagList;return n.createElement(l,{extraClass:"categories-container"},n.createElement(o,{title:c().tagWidgetTitle}),n.createElement("div",null,t.map((function(e){return n.createElement(d,{key:e,content:e})}))))},p=function(e){var t=e.latestPostEdges,a=(0,i.UI)(t);return n.createElement(l,{extraClass:"latest-posts-container"},n.createElement(o,{title:c().latestPostsWidgetTitle}),n.createElement("div",null,a.map((function(e){return n.createElement(r.Z,{key:e.title,to:e.slug,className:"block border-bottom border-color-light-grey padding-top-half padding-bottom-half"},n.createElement("span",null,e.title))}))))},g=function(e){var t=e.links;return n.createElement(n.Fragment,null,t&&t.length>0&&n.createElement(l,{extraClass:"categories-container"},n.createElement(o,{title:c().linksWidgetTitle}),n.createElement("div",null,t.map((function(e){return n.createElement(r.Z,{key:e.label,to:e.url,className:"block border-bottom border-color-light-grey padding-top-half padding-bottom-half"},n.createElement("span",null,e.label))})))))},h=a(1721),f=a(7606),E=function(e){function t(){return e.apply(this,arguments)||this}return(0,h.Z)(t,e),t.prototype.render=function(){return n.createElement(n.Fragment,null,c().hasSearch&&n.createElement(l,{extraClass:"search-container"},n.createElement(o,{title:c().searchWidgetTitle}),n.createElement("form",{className:"margin-bottom-none",action:"/search/",method:"get"},n.createElement("div",{className:"container-full row padding-none margin-bottom-none"},n.createElement("div",{className:"padding-none padding-right-half col-xs-10"},n.createElement("input",{className:"margin-bottom-none",type:"text",name:"q",placeholder:c().searchWidgetPlaceHolder,required:!0,spellCheck:"false"})),n.createElement("div",{className:"padding-none padding-left-half col-xs-2"},n.createElement("button",{type:"submit",className:"btn btn-primary"},n.createElement(f.G,{icon:["fas","search"],style:{color:"#FFFFFF"}})))))))},t}(n.Component),b=E,v=function(e){var t=e.tagList,a=e.categoryList,r=e.latestPostEdges,l=e.links;return n.createElement("aside",{className:"sidebar-container width-full "+(c().sidebarSticky?"height-full":"")},n.createElement(b,null),r&&n.createElement(p,{latestPostEdges:r}),a&&n.createElement(m,{categoryList:a}),t&&n.createElement(u,{tagList:t}),l&&n.createElement("div",{className:"position-sticky top-zero"},n.createElement(g,{links:l})))}},7931:function(e,t,a){a.r(t);var n=a(7294),r=a(5414),l=a(6283),o=a(3317),i=a(2089),s=a(1097),c=a(149),m=a(3480),d=a(8415),u=a(2797),p=a.n(u);t.default=function(e){var t=e.data,a=e.pageContext,u=a.category,g=a.categoryList,h=a.tagList,f=a.latestPostEdges,E=a.currentPage,b=a.totalPages,v=t.allMarkdownRemark.edges,y=(0,d.UI)(v),P=n.createElement(n.Fragment,null,n.createElement(c.Z,{postList:y,hasThumbnail:p().categoryHasThumbnail,hasLoadmore:!1}),n.createElement(m.Z,{extraClass:"margin-top padding-top-half",currentPage:E,totalPages:b,pathPrefix:(0,d.UM)(u),pathPrefixPagination:p().pathPrefixPagination})),x=n.createElement(s.Z,{tagList:h,categoryList:g,latestPostEdges:f,links:p().sidebarLinks});return n.createElement(l.Z,null,n.createElement("div",{className:"category-container"},n.createElement(r.Z,{title:p().categoryHeader+" "+u+" - "+p().siteTitle}),n.createElement(o.Z,{title:p().categoryHeader+" "+u}),n.createElement(i.Z,{content:P,sidebar:x})))}}}]);
//# sourceMappingURL=component---src-templates-category-template-jsx-9c9aec87535bb2b5ec34.js.map