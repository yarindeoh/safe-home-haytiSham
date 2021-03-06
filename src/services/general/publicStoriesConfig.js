// IDs are facebook assets ids which are aligned to cloudinary videos public name
export const PUBLIC_STORIES = [
    {
        id: '2F2569875906619933',
        quote: 'האלימות השקטה שהוא הפעיל גמרה אותי מבפנים',
        tags: ['אלימות פיזית', 'אלימות מילולית'],
        tagsId: [5, 4],
        timestamp: '15/03/2020',
        storyteller: 'יעל יהודה',
        img: 'img1.png'
    },
    {
        id: '2F610082766499736',
        quote: 'הוא היה שופך עליי מים רותחים ושורף לי את הבגדים',
        tags: ['אלימות פיזית', 'קנאה ואובססיביות'],
        tagsId: [4, 9],
        timestamp: '25/02/2020',
        storyteller: 'אינגה גל מדורסקי',
        img: 'img2.png'
    },
    {
        id: '2F527567764562364',
        quote: 'הוא איים שיחזיר אותי לאמא שלי בשקיות שחורות',
        tags: ['אלימות פיזית', 'משטרה'],
        tagsId: [4, 18],
        timestamp: '10/03/2020',
        storyteller: 'שרית קרול',
        img: 'img3.png'
    },
    {
        id: '2F243174673491976',
        quote: 'הרגשתי בתוך כלוב זהב',
        tags: ['אלימות מילולית', 'הפחדה'],
        tagsId: [5, 14],
        timestamp: '12/04/2020',
        storyteller: 'יאנה בריקסמן',
        img: 'img4.png'
    },
    {
        id: '2F234311144373734',
        quote: 'אבא היה נותן לאמא אגרופים בפנים',
        tags: ['אלימות פיזית', 'אלימות מילולית', 'משטרה'],
        tagsId: [4, 5, 18],
        timestamp: '08/03/2020',
        storyteller: 'בר סטאר',
        img: 'img5.png'
    }
];

export const getPublicStoryById = id => {
    return PUBLIC_STORIES.find(story => story.id === id);
};
