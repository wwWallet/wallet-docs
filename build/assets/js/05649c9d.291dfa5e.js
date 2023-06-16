"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[102],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>g});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(r),f=i,g=d["".concat(s,".").concat(f)]||d[f]||u[f]||a;return r?n.createElement(g,o(o({ref:t},p),{},{components:r})):n.createElement(g,o({ref:t},p))}));function g(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:i,o[1]=l;for(var c=2;c<a;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},335:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var n=r(7462),i=(r(7294),r(3905));const a={sidebar_position:2},o="Registering as an OID4VCI Client",l={unversionedId:"wallet-mock/registering-as-client",id:"wallet-mock/registering-as-client",title:"Registering as an OID4VCI Client",description:"In order for a wallet to be able to receive verifiable credentials from an Enterprise Issuer, it must first be registered",source:"@site/docs/wallet-mock/registering-as-client.md",sourceDirName:"wallet-mock",slug:"/wallet-mock/registering-as-client",permalink:"/docs/docs/wallet-mock/registering-as-client",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Application Setup",permalink:"/docs/docs/wallet-mock/application-setup"},next:{title:"Enterprise Issuer",permalink:"/docs/docs/category/enterprise-issuer"}},s={},c=[{value:"How to create a key pair and a DID for the Wallet Provider using the <code>configwallet</code> CLI",id:"how-to-create-a-key-pair-and-a-did-for-the-wallet-provider-using-the-configwallet-cli",level:2}],p={toc:c},d="wrapper";function u(e){let{components:t,...r}=e;return(0,i.kt)(d,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"registering-as-an-oid4vci-client"},"Registering as an OID4VCI Client"),(0,i.kt)("p",null,"In order for a wallet to be able to receive verifiable credentials from an Enterprise Issuer, it must first be registered\nas a Client to an Enterprise Issuer with a DID."),(0,i.kt)("h2",{id:"how-to-create-a-key-pair-and-a-did-for-the-wallet-provider-using-the-configwallet-cli"},"How to create a key pair and a DID for the Wallet Provider using the ",(0,i.kt)("inlineCode",{parentName:"h2"},"configwallet")," CLI"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"export SERVICE_URL=http://127.0.0.1:8002\nexport SERVICE_SECRET=dsfsffeffdsfsdfsdfsdsdf\nconfigwallet generate did   # this command will generate a key-pair and the JWK will be exposed in the /jwks endpoint.\n")),(0,i.kt)("p",null,"Now that the DID of the Wallet Provider has been generated, the Wallet Provider must provide this DID through a secure off-bound process to an Enterprise Issuer who will trust client assertions issued with the corresponding public key in the /jwks endpoint."))}u.isMDXComponent=!0}}]);