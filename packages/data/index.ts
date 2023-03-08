export type User = {
    email: string;
    name?: string;
}

// Todo
// 1. Add description field
export type NewSite = {
    domain: string;
    name: string;
    logo: string;
    content: Content
    authors: Author[];
    gtag: Gtag;
    socials?: Social[];
}

export type Social = {
    name: SocialEnum;
    link: string;
}


export enum SocialEnum {
    Facebook = 'facebook',
    Twitter = 'twitter',
    Instagram = 'instagram',
    Pinterest = 'pinterest',
    Youtube = 'youtube',
    Linkedin = 'linkedin',
    Tumblr = 'tumblr',
    Snapchat = 'snapchat',
    Tiktok = 'tiktok',
}

export type Content = {
    keywords: string[];
    images?: string[];
    affiliateLinks?: AffiliateLink[];
}

export type AffiliateLink = {
    name: string;
    link: string;
    img?: string;
    code?: string;
}

export type Author = {
    name: string;
    avatar?: string;
    socials?: Social[];
}

export type Gtag = {
    id: string;     // G-YBZY5KMGEQ
}


export function generateGtag(gtag: Gtag) {
    return `
<script async src="https://www.googletagmanager.com/gtag/js?id=${gtag.id}"></script>
<script >
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${gtag.id}');
</script>`
}