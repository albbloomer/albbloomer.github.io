(self.webpackChunkgatsby_blog_template=self.webpackChunkgatsby_blog_template||[]).push([[230],{8594:function(e,t,r){var a,n,o;o=function(){return function(){return function(e){var t=[];if(0===e.length)return"";if("string"!=typeof e[0])throw new TypeError("Url must be a string. Received "+e[0]);if(e[0].match(/^[^/:]+:\/*$/)&&e.length>1){var r=e.shift();e[0]=r+e[0]}e[0].match(/^file:\/\/\//)?e[0]=e[0].replace(/^([^/:]+):\/*/,"$1:///"):e[0]=e[0].replace(/^([^/:]+):\/*/,"$1://");for(var a=0;a<e.length;a++){var n=e[a];if("string"!=typeof n)throw new TypeError("Url must be a string. Received "+n);""!==n&&(a>0&&(n=n.replace(/^[\/]+/,"")),n=a<e.length-1?n.replace(/[\/]+$/,""):n.replace(/[\/]+$/,"/"),t.push(n))}var o=t.join("/"),l=(o=o.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return l.shift()+(l.length>0?"?":"")+l.join("&")}("object"==typeof arguments[0]?arguments[0]:[].slice.call(arguments))}},e.exports?e.exports=o():void 0===(n="function"==typeof(a=o)?a.call(t,r,t,e):a)||(e.exports=n)},3317:function(e,t,r){"use strict";var a=r(7294);t.Z=function(e){var t=e.title;return a.createElement("header",{className:"border-bottom border-color-light-grey"},a.createElement("div",{className:"container"},a.createElement("h1",{className:"margin-none padding-top-2 padding-bottom-2"},t)))}},2089:function(e,t,r){"use strict";var a=r(7294);t.Z=function(e){var t=e.content,r=e.sidebar;return a.createElement("section",{className:"main-container container"},a.createElement("div",{className:"content-wrapper padding-top-half padding-bottom-2"},t),a.createElement("div",{className:"sidebar-wrapper padding-top-half padding-bottom-2"},r))}},9354:function(e,t,r){"use strict";var a=r(7294),n=r(8415),o=r(2797),l=r.n(o);t.Z=function(e){var t=e.date,r=e.extraClass,o=void 0===r?"":r;return a.createElement("div",{className:"text-description "+o},l().postOnDate," ",(0,n.p6)(t))}},149:function(e,t,r){"use strict";r.d(t,{Z:function(){return d}});var a=r(1721),n=r(7294),o=r(6125),l=r(9778),i=function(e){var t=e.post,r=e.extraClass,a=void 0===r?"":r;return t.cover?n.createElement(l.Z,{to:t.slug,key:t.title,className:"thumbnail-wrapper line-height-reset "+a},n.createElement(o.G,{image:(0,o.d)(t.cover),className:"thumbnail-img",alt:""})):null},s=r(9354),c=function(e){var t=e.post,r=e.extraClass,a=void 0===r?"":r;return n.createElement("div",{className:"post-info-wrapper "+a},n.createElement(l.Z,{to:t.slug,key:t.title},n.createElement("h2",null,n.createElement("small",null,t.title))),n.createElement("div",{className:"margin-bottom-half"},t.excerpt),n.createElement("small",null,n.createElement(s.Z,{date:t.date})))},m=function(e){var t=e.post,r=e.hasThumbnail;return n.createElement("article",{key:t.title,className:"article-container padding-bottom-2 padding-top-2 border-bottom border-color-light-grey"},r&&n.createElement(i,{post:t}),n.createElement(c,{post:t}))},p=function(e){function t(){for(var t,r=arguments.length,a=new Array(r),n=0;n<r;n++)a[n]=arguments[n];return(t=e.call.apply(e,[this].concat(a))||this).state={maxPosts:(t.props.hasLoadmore||t.props.forcePostsPerPage)&&t.props.postsPerPage?t.props.postsPerPage:t.props.postList.length},t.handleLoadmore=function(){var e=t.props,r=e.hasLoadmore,a=void 0!==r&&r,n=e.numberLoadmore;a&&t.setState((function(e){return{maxPosts:e.maxPosts+n}}))},t}return(0,a.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.postList,r=e.hasThumbnail,a=void 0===r||r,o=e.hasLoadmore,l=void 0!==o&&o,i=this.state.maxPosts;return n.createElement(n.Fragment,null,n.createElement("div",{className:"post-listing-container"},t.map((function(e,t){return t<i?n.createElement(m,{key:e.title,post:e,hasThumbnail:a}):null}))),l&&i<t.length&&n.createElement("div",{className:"loadmore-wrapper margin-top padding-top-half text-center"},n.createElement("button",{className:"btn-primary",onClick:this.handleLoadmore},this.props.btnLoadmore)))},t}(n.Component),d=p},4428:function(e,t,r){"use strict";var a=r(1721),n=r(7294),o=r(6125),l=r(5414),i=r(8594),s=r.n(i),c=r(2797),m=r.n(c),p=r(8415),d=function(e){function t(){return e.apply(this,arguments)||this}return(0,a.Z)(t,e),t.prototype.render=function(){var e,t,r,a,i=this.props,c=i.postNode,d=i.postPath,u=i.postSEO,g="";if(u){var h=c.frontmatter;e=h.title,t=h.description?h.description:c.excerpt,r=h.keywords,h.cover&&(g=(0,o.e)(h.cover)),a=s()(m().siteUrl,m().pathPrefix,d)}else e=m().siteTitle,t=m().siteDescription,g=m().siteLogo;g=s()(m().siteUrl,m().pathPrefix,g);var f=s()(m().siteUrl,m().pathPrefix),E=[{"@context":"http://schema.org","@type":"WebSite",url:f,name:e,alternateName:m().siteTitleAlt?m().siteTitleAlt:""}];return u&&E.push({"@context":"http://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,item:{"@id":a,name:e,image:g}}]},{"@context":"http://schema.org","@type":"BlogPosting",url:f,name:e,alternateName:m().siteTitleAlt?m().siteTitleAlt:"",headline:e,image:{"@type":"ImageObject",url:g},description:t}),n.createElement(l.Z,null,n.createElement("meta",{name:"description",content:t}),n.createElement("meta",{name:"image",content:g}),r&&n.createElement("meta",{name:"keywords",content:r}),n.createElement("link",{rel:"canonical",href:(0,p.sw)(a||m().siteUrl)}),n.createElement("script",{type:"application/ld+json"},JSON.stringify(E)),n.createElement("meta",{property:"og:url",content:u?a:f}),u?n.createElement("meta",{property:"og:type",content:"article"}):null,n.createElement("meta",{property:"og:title",content:e}),n.createElement("meta",{property:"og:description",content:t}),n.createElement("meta",{property:"og:image",content:g}),n.createElement("meta",{property:"fb:app_id",content:m().siteFBAppID?m().siteFBAppID:""}),n.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),n.createElement("meta",{name:"twitter:creator",content:m().userTwitter?m().userTwitter:""}),n.createElement("meta",{name:"twitter:title",content:e}),n.createElement("meta",{name:"twitter:description",content:t}),n.createElement("meta",{name:"twitter:image",content:g}))},t}(n.Component);t.Z=d},1097:function(e,t,r){"use strict";r.d(t,{Z:function(){return h}});var a=r(7294),n=r(9778),o=function(e){var t=e.extraClass,r=void 0===t?"":t,n=e.children;return a.createElement("aside",{className:r+" padding-top padding-bottom"},n)},l=function(e){var t=e.title;return a.createElement("h3",{className:"text-uppercase"},a.createElement("small",null,t))},i=r(8415),s=r(2797),c=r.n(s),m=function(e){var t=e.categoryList;return a.createElement(o,{extraClass:"categories-container"},a.createElement(l,{title:c().categoryWidgetTitle}),a.createElement("div",null,t.map((function(e){return a.createElement(n.Z,{key:e,to:(0,i.IX)(e),className:"block border-bottom border-color-light-grey padding-top-half padding-bottom-half"},a.createElement("span",null,e))}))))},p=function(e){var t=e.content;return a.createElement(n.Z,{key:t,to:(0,i.bT)(t),className:"inline-block margin-right-half margin-bottom-half  border border-color-light-grey padding-left-half padding-right-half"},a.createElement("span",null,t))},d=function(e){var t=e.tagList;return a.createElement(o,{extraClass:"categories-container"},a.createElement(l,{title:c().tagWidgetTitle}),a.createElement("div",null,t.map((function(e){return a.createElement(p,{key:e,content:e})}))))},u=function(e){var t=e.latestPostEdges,r=(0,i.UI)(t);return a.createElement(o,{extraClass:"latest-posts-container"},a.createElement(l,{title:c().latestPostsWidgetTitle}),a.createElement("div",null,r.map((function(e){return a.createElement(n.Z,{key:e.title,to:e.slug,className:"block border-bottom border-color-light-grey padding-top-half padding-bottom-half"},a.createElement("span",null,e.title))}))))},g=function(e){var t=e.links;return a.createElement(a.Fragment,null,t&&t.length>0&&a.createElement(o,{extraClass:"categories-container"},a.createElement(l,{title:c().linksWidgetTitle}),a.createElement("div",null,t.map((function(e){return a.createElement(n.Z,{key:e.label,to:e.url,className:"block border-bottom border-color-light-grey padding-top-half padding-bottom-half"},a.createElement("span",null,e.label))})))))},h=(r(7606),function(e){var t=e.tagList,r=e.categoryList,n=e.latestPostEdges,o=e.links;return a.createElement("aside",{className:"sidebar-container width-full "+(c().sidebarSticky?"height-full":"")},n&&a.createElement(u,{latestPostEdges:n}),r&&a.createElement(m,{categoryList:r}),t&&a.createElement(d,{tagList:t}),o&&a.createElement("div",{className:"position-sticky top-zero"},a.createElement(g,{links:o})))})},4199:function(e,t,r){"use strict";r.r(t);var a=r(1721),n=r(7294),o=r(5414),l=r(6283),i=r(3317),s=r(2089),c=r(1097),m=r(149),p=r(9778),d=r(4428),u=r(8415),g=r(2797),h=r.n(g),f=function(e){function t(){return e.apply(this,arguments)||this}return(0,a.Z)(t,e),t.prototype.render=function(){var e=this.props.data.allMarkdownRemark.edges,t=(0,u.UI)(e),r=(0,u.yl)(t),a=r.tagList,g=r.categoryList,f=n.createElement(n.Fragment,null,n.createElement(m.Z,{postList:t,hasThumbnail:h().homeHasThumbnail,hasLoadmore:h().homeHasLoadmore,postsPerPage:h().postsPerPage,numberLoadmore:h().numberLoadmore,btnLoadmore:h().btnLoadmore,forcePostsPerPage:0==h().homeHasLoadmore}),!h().homeHasLoadmore&&t.length>h().postsPerPage&&n.createElement("div",{className:"more-articles-wrapper margin-top padding-top-half text-center"},n.createElement(p.Z,{className:"btn btn-primary",to:""+h().pathPrefixBlog+h().pathPrefixPagination+"/2"},h().homeMoreArticles))),E=n.createElement(c.Z,{tagList:a,categoryList:g,links:h().sidebarLinks}),b=(h().homeHeader,""+h().siteTitle);return n.createElement(l.Z,null,n.createElement("div",{className:"index-container"},n.createElement(o.Z,{title:h().siteTitle}),n.createElement(d.Z,null),n.createElement(i.Z,{title:b}),n.createElement(s.Z,{content:f,sidebar:E})))},t}(n.Component);t.default=f}}]);
//# sourceMappingURL=component---src-pages-index-jsx-57d16b130effdf487f48.js.map