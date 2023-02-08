export enum Categories {
    BUSINESS_LIBRARY = 'business-library',
    SIDE_HUSTLES = 'side-hustles',
    IDEA_VAULT = 'idea-vault',
    GUIDES = 'guides',
    REFERRAL_LIBRARY = 'referral-library',
}

type Image = {
    url: string;
    alt: string;
}

export type Article = {
    title: string;
    description: string;
    date: string;
    author: string;
    image: Image;
    tags: Categories[] | string[];
    contentLink: string;
    keyword?: string;
};

export type Reward = {
    reward: string;
    requirement: string;
};

export type Referral = {
    name: string;
    description: string;
    link: string;
    code: string;
    tags: string[];
    rewards: Reward[];
};

const mockUber: Referral = {
    name: 'Uber',
    description: 'Drive with uber and get $1000 in bonus earnings',
    link: 'https://www.uber.com/invite/uberjoshua',
    code: 'uberjoshua',
    tags: ['transportation', 'ride-sharing'],
    rewards: [
        {
            reward: '$5 off your first ride',
            requirement: 'New users only'
        }
    ]
}

const mockLyft: Referral = {
    name: 'Lyft',
    description: 'Drive with Lyft and get $1000 in bonus earnings',
    link: 'https://www.lyft.com/i/JOSHUA1234',
    code: 'JOSHUA1234',
    tags: ['transportation', 'ride-sharing'],
    rewards: [
        {
            reward: '$5 off your first ride',
            requirement: 'New users only'
        }
    ]
}

export const mockReferrals: Referral[] = [mockUber, mockLyft];

export const mockArticle1: Article = {
    title: 'The millionaire who lost it all and became a castaway',
    description: 'When David Glasheen lost his fortune in the 1980s stock crash, he packed a small suitcase and moved to a remote island. He’s been there ever since.',
    author: 'Zachary Crockett',
    date: "December 17, 2022",
    image: {
        url: 'https://thehustle.co/wp-content/uploads/2022/12/HEADER2-1.gif',
        alt: 'I came, I saw, I conquered'
    },
    tags: [Categories.BUSINESS_LIBRARY, Categories.GUIDES],
    contentLink: "/start-a-business"
}

const mockArticle2: Article = {
    title: 'MVG - Minimum Viable Gym',
    description: 'Learn to make MAX profits with the MVG business model',
    date: "",
    author: 'Zachary Crockett',
    image: {
        url: 'https://i.ytimg.com/vi/gey73xiS8F4/maxresdefault.jpg',
        alt: 'Swole dude thinking of creating an MVG - Minimum Viable Gym'
    },
    tags: [Categories.GUIDES, Categories.IDEA_VAULT],
    contentLink: "/MVG-Minimum-Viable-Gym"
}

const mockArticle3: Article = {
    title: 'Break out of the Matrix! Side Hustle Guide',
    description: 'Learn how to start a business with this guide',
    date: "",
    author: 'Zachary Crockett',
    image: {
        url: 'https://i.scdn.co/image/ab67616d0000b273e8fc7a65835cd8a48b841944',
        alt: 'Some dude seeing through the matrix and breaking out of it'
    },
    tags: [Categories.REFERRAL_LIBRARY, Categories.SIDE_HUSTLES, "matrix breakout"],
    contentLink: "/break-out-of-the-matrix-side-hustle-guide"
}

export const mockArticles: Article[] = [mockArticle1, mockArticle3, mockArticle1, mockArticle2, mockArticle3, mockArticle2];

// export const mockArticles: Article[] = [mockArticle1];