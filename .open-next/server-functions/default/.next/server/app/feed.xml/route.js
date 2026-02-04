(()=>{var e={};e.id=7608,e.ids=[7608],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},33816:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>x,routeModule:()=>g,serverHooks:()=>h,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>m});var a={};r.r(a),r.d(a,{GET:()=>c});var i=r(42706),o=r(28203),n=r(45994),s=r(80636);let l=process.env.NEXT_PUBLIC_SITE_URL||"https://www.imagetourl.cloud",u=[{slug:"best-practices-image-to-url-cdn-delivery",title:"Best Practices for Image to URL CDN Delivery",description:"Learn the best practices for optimizing image delivery through CDN for faster loading times and better user experience.",publishedAt:"2024-01-15",author:"ImageToURL Team",category:"Performance",tags:["CDN","Performance","Optimization"]}];function p(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}async function c(){return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>ImageToURL Blog</title>
    <link>${l}/blog</link>
    <description>Tips, tutorials, and insights about image hosting and web development. Learn about image optimization, CDN performance, and best practices for developers and creators.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${l}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${l}/android-chrome-512x512.png</url>
      <title>ImageToURL Blog</title>
      <link>${l}/blog</link>
    </image>
    ${u.map(e=>`
    <item>
      <title><![CDATA[${e.title}]]></title>
      <link>${l}/${s.q}/blog/${e.slug}</link>
      <guid isPermaLink="true">${l}/${s.q}/blog/${e.slug}</guid>
      <description><![CDATA[${e.description}]]></description>
      <pubDate>${new Date(e.publishedAt).toUTCString()}</pubDate>
      <author>${p(e.author)}</author>
      <category>${p(e.category)}</category>
      ${e.tags.map(e=>`<category>${p(e)}</category>`).join("\n      ")}
    </item>`).join("")}
  </channel>
</rss>`.trim(),{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=3600, s-maxage=3600"}})}let g=new i.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/feed.xml/route",pathname:"/feed.xml",filename:"route",bundlePath:"app/feed.xml/route"},resolvedPagePath:"/Users/bipulkumar/Documents/Image_to_url/app/feed.xml/route.ts",nextConfigOutput:"standalone",userland:a}),{workAsyncStorage:d,workUnitAsyncStorage:m,serverHooks:h}=g;function x(){return(0,n.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:m})}},96487:()=>{},78335:()=>{},80636:(e,t,r)=>{"use strict";r.d(t,{IB:()=>a,q:()=>i});let a=["en","zh","hi","es","ar","fr","bn","pt","ru","ur","id","de","ja","sw","mr","te","tr","ta","vi","ko","it","th","gu","pl","uk","fa","ml","kn","or","my"],i="en"},42706:(e,t,r)=>{"use strict";e.exports=r(44870)}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[5994],()=>r(33816));module.exports=a})();