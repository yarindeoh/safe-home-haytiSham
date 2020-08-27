// IDs are facebook assets ids which are aligned to cloudinary videos public name
export const PUBLIC_STORIES = [
    {
        id: '2F2569875906619933',
        quote: 'האלימות השקטה שהוא הפעיל גמרה אותי מבפנים',
        tags: ['אלימות פיזית', 'אלימות מילולית'],
        timestamp: '15/03/2020',
        storyteller: 'יעל יהודה',
    },
    {
        id: '2F610082766499736',
        quote: 'הוא היה שופך עליי מים רותחים ושורף לי את הבגדים',
        tags: ['אלימות פיזית', 'קנאה ואובססיביות'],
        timestamp: '25/02/2020',
        storyteller: 'דנה אינטרנשיונל',
    },
    {
        id: '2F527567764562364',
        quote: 'אבא היה נותן לאמא אגרופים בפנים',
        tags: ['אלימות פיזית', 'משטרה'],
        timestamp: '10/03/2020',
        storyteller: 'שירן וקארין סנדל',
    },
    {
        id: '2F243174673491976',
        quote: 'הרגשתי בתוך כלוב זהב',
        tags: ['אלימות מילולית', 'הפחדה'],
        timestamp: '12/04/2020',
        storyteller: 'יאנה בריקסמן',
        img: 'img4.png'
    },
    {
        id: '2F234311144373734',
        quote: 'פחדתי שהוא ירצח אותי',
        tags: ['אלימות פיזית', 'אלימות מילולית', 'משטרה'],
        timestamp: '08/03/2020',
        storyteller: 'שרית קרול',
    }
];

export const getPublicStoryById = id => {
    return PUBLIC_STORIES.find(story => story.id === id);
};
