// 英语 人教PEP版（新教材）— 全年级课程（1-6年级）

const mkUnit = (id,title,theme,lessons,review,keySkills,progress=0) =>
  ({id,title,theme,lessons:lessons.map((l,i)=>({...l,id:`${id}_l${i+1}`,done:i<Math.ceil(lessons.length*(progress/100))})),review,keySkills})

const mkL = (title,type='lesson',pages='') => ({title,type,pages})

export const ENGLISH_CURRICULUM = {
  '一年级': {
    '上学期': { units: [
      mkUnit('u1','Unit 1','Hello!',[
        mkL("Let's learn: Hello, hi, bye","lesson",'2-3'),
        mkL("Let's do: Nice to meet you","lesson",'4-5'),
        mkL("Let's chant & sing","lesson",'6'),
      ],'Fun time 1',['Greetings','Goodbye','Nice to meet you'],100),
      mkUnit('u2','Unit 2','Colours',[
        mkL("Let's learn: red, yellow, green, blue","lesson",'8-9'),
        mkL("Let's do: What colour is it?","lesson",'10-11'),
        mkL("Let's chant & sing","lesson",'12'),
      ],'Fun time 2',['Basic colours','Colour questions','Colour songs'],100),
      mkUnit('u3','Unit 3','My Body',[
        mkL("Let's learn: eye, ear, nose, mouth, hand","lesson",'14-15'),
        mkL("Let's do: Touch your...","lesson",'16-17'),
        mkL("Let's chant & sing","lesson",'18'),
      ],'Fun time 3',['Body parts','Commands','Simon Says game'],80),
      mkUnit('u4','Unit 4','Numbers 1–5',[
        mkL("Let's learn: one, two, three, four, five","lesson",'20-21'),
        mkL("Let's do: How many?","lesson",'22-23'),
        mkL("Let's chant & sing","lesson",'24'),
      ],'Fun time 4',['Numbers 1-5','Counting','How many'],60),
      mkUnit('u5','Unit 5','Animals',[
        mkL("Let's learn: cat, dog, bird, fish, rabbit","lesson",'26-27'),
        mkL("Let's do: I have a...","lesson",'28-29'),
        mkL("Let's chant & sing","lesson",'30'),
      ],'Fun time 5',['Animal names','I have...','My pet'],30),
      mkUnit('u6','Unit 6','Toys',[
        mkL("Let's learn: ball, car, kite, doll","lesson",'32-33'),
        mkL("Let's do: I like...","lesson",'34-35'),
        mkL("Let's chant & sing","lesson",'36'),
      ],'Fun time 6',['Toy vocabulary','I like...','Preferences'],0),
    ]},
    '下学期': { units: [
      mkUnit('u1','Unit 1','My Family',[
        mkL("Let's learn: father, mother, brother, sister","lesson",'2-3'),
        mkL("Let's do: This is my...","lesson",'4-5'),
        mkL("Let's chant & sing","lesson",'6'),
      ],'Fun time 1',['Family members','Introductions','Family song'],100),
      mkUnit('u2','Unit 2','Numbers 6–10',[
        mkL("Let's learn: six, seven, eight, nine, ten","lesson",'8-9'),
        mkL("Let's do: How old are you?","lesson",'10-11'),
        mkL("Let's chant & sing","lesson",'12'),
      ],'Fun time 2',['Numbers 6-10','Age','Birthday'],90),
      mkUnit('u3','Unit 3','Food',[
        mkL("Let's learn: apple, banana, orange, milk, water","lesson",'14-15'),
        mkL("Let's do: I like / I don't like","lesson",'16-17'),
        mkL("Let's chant & sing","lesson",'18'),
      ],'Fun time 3',['Food vocabulary','Like/dislike','Healthy eating'],70),
      mkUnit('u4','Unit 4','Clothes',[
        mkL("Let's learn: shirt, pants, shoes, hat, dress","lesson",'20-21'),
        mkL("Let's do: Put on / Take off","lesson",'22-23'),
        mkL("Let's chant & sing","lesson",'24'),
      ],'Fun time 4',['Clothes vocabulary','Getting dressed','Seasons'],50),
      mkUnit('u5','Unit 5','Shapes',[
        mkL("Let's learn: circle, square, triangle, rectangle","lesson",'26-27'),
        mkL("Let's do: Draw and colour","lesson",'28-29'),
        mkL("Let's chant & sing","lesson",'30'),
      ],'Fun time 5',['Shape names','Drawing shapes','Pattern'],20),
      mkUnit('u6','Unit 6','Weather',[
        mkL("Let's learn: sunny, cloudy, rainy, snowy, windy","lesson",'32-33'),
        mkL("Let's do: How's the weather?","lesson",'34-35'),
        mkL("Let's chant & sing","lesson",'36'),
      ],'Fun time 6',['Weather words','Weather questions','Seasons'],0),
    ]},
  },

  '二年级': {
    '上学期': { units: [
      mkUnit('u1','Unit 1','Back to School',[
        mkL("Let's learn: pen, pencil, ruler, eraser, book","lesson",'2-3'),
        mkL("Let's talk: Is this your...?","lesson",'4-5'),
        mkL("Let's read & write","lesson",'6'),
      ],'Recycle 1',['School things','Is this your...?','Yes/No answers'],100),
      mkUnit('u2','Unit 2','My Classroom',[
        mkL("Let's learn: desk, chair, board, window, door","lesson",'8-9'),
        mkL("Let's talk: Where is the...?","lesson",'10-11'),
        mkL("Let's read & write","lesson",'12'),
      ],'Recycle 2',['Classroom objects','Where is...?','Prepositions on/in/under'],100),
      mkUnit('u3','Unit 3','My Friends',[
        mkL("Let's learn: tall, short, fat, thin, strong","lesson",'14-15'),
        mkL("Let's talk: What does he/she look like?","lesson",'16-17'),
        mkL("Let's read & write","lesson",'18'),
      ],'Recycle 3',['Adjectives','Descriptions','He/She is...'],80),
      mkUnit('u4','Unit 4','My Home',[
        mkL("Let's learn: living room, bedroom, bathroom, kitchen","lesson",'20-21'),
        mkL("Let's talk: Welcome to my home!","lesson",'22-23'),
        mkL("Let's read & write","lesson",'24'),
      ],'Recycle 4',['Room names','Welcome','This is my...'],50),
      mkUnit('u5','Unit 5','Shopping',[
        mkL("Let's learn: How much is it? yuan","lesson",'26-27'),
        mkL("Let's talk: Can I have...?","lesson",'28-29'),
        mkL("Let's read & write","lesson",'30'),
      ],'Recycle 5',['Numbers 1-100','Money','Shopping dialogue'],20),
      mkUnit('u6','Unit 6','Holidays',[
        mkL("Let's learn: Chinese New Year, Mid-Autumn Festival","lesson",'32-33'),
        mkL("Let's talk: Happy ... !","lesson",'34-35'),
        mkL("Let's read & write","lesson",'36'),
      ],'Recycle 6',['Chinese holidays','Festival greetings','Traditions'],0),
    ]},
    '下学期': { units: [
      mkUnit('u1','Unit 1','My Day',[
        mkL("Let's learn: get up, have breakfast, go to school","lesson",'2-3'),
        mkL("Let's talk: What time is it?","lesson",'4-5'),
        mkL("Let's read & write","lesson",'6'),
      ],'Recycle 1',['Daily routines','Telling time','Frequency words'],100),
      mkUnit('u2','Unit 2','Seasons',[
        mkL("Let's learn: spring, summer, autumn, winter","lesson",'8-9'),
        mkL("Let's talk: What season is it?","lesson",'10-11'),
        mkL("Let's read & write","lesson",'12'),
      ],'Recycle 2',['Four seasons','Weather/season link','Activities'],80),
      mkUnit('u3','Unit 3','My Hobbies',[
        mkL("Let's learn: swim, play football, draw, read","lesson",'14-15'),
        mkL("Let's talk: I like... / Do you like...?","lesson",'16-17'),
        mkL("Let's read & write","lesson",'18'),
      ],'Recycle 3',['Hobby verbs','Like/don\'t like','Questions'],60),
      mkUnit('u4','Unit 4','Our Earth',[
        mkL("Let's learn: mountain, river, forest, ocean","lesson",'20-21'),
        mkL("Let's talk: Let's protect our earth!","lesson",'22-23'),
        mkL("Let's read & write","lesson",'24'),
      ],'Recycle 4',['Nature vocabulary','Environment','We should...'],30),
      mkUnit('u5','Unit 5','Jobs',[
        mkL("Let's learn: teacher, doctor, farmer, driver, cook","lesson",'26-27'),
        mkL("Let's talk: What do you want to be?","lesson",'28-29'),
        mkL("Let's read & write","lesson",'30'),
      ],'Recycle 5',['Job words','I want to be...','Dream jobs'],0),
      mkUnit('u6','Unit 6','Review',[
        mkL("Review 1: Let's sing and chant","practice",'32-35'),
        mkL("Review 2: Let's read and play","practice",'36-39'),
      ],'Final Review',['Comprehensive review','Communication skills','Reading'],0),
    ]},
  },

  '三年级': {
    '上学期': { units: [
      mkUnit('u1','Unit 1','Hello',[
        mkL("Let's learn: Greetings","lesson",'2-3'),
        mkL("Let's talk: Nice to meet you","lesson",'4-5'),
        mkL("Let's read & write","lesson",'6'),
      ],'Recycle 1',['Greetings','Self-introduction','Numbers 1-5'],100),
      mkUnit('u2','Unit 2','My Family',[
        mkL("Let's learn: Family members","lesson",'14-15'),
        mkL("Let's talk: This is my...","lesson",'16-17'),
        mkL("Let's read & write","lesson",'18'),
      ],'Recycle 2',['Family words','Possessives','Descriptions'],67),
      mkUnit('u3','Unit 3','At the Zoo',[
        mkL("Let's learn: Animals","lesson",'26-27'),
        mkL("Let's talk: What's that?","lesson",'28-29'),
        mkL("Let's read & write","lesson",'30'),
      ],'Recycle 3',['Animal names','Colors','Numbers 1-20'],33),
      mkUnit('u4','Unit 4','My Home',[
        mkL("Let's learn: Rooms","lesson",'38-39'),
        mkL("Let's talk: Where is...?","lesson",'40-41'),
        mkL("Let's read & write","lesson",'42'),
      ],'Recycle 4',['Room names','Prepositions','Furniture'],0),
    ]},
    '下学期': { units: [
      mkUnit('u1','Unit 1','Welcome Back to School',[
        mkL("Let's learn: school subjects","lesson",'2-3'),
        mkL("Let's talk: What day is it?","lesson",'4-5'),
        mkL("Let's read & write","lesson",'6'),
      ],'Recycle 1',['School subjects','Days of the week','Timetable'],0),
      mkUnit('u2','Unit 2','My Favourite Food',[
        mkL("Let's learn: foods","lesson",'8-9'),
        mkL("Let's talk: Do you like...?","lesson",'10-11'),
        mkL("Let's read & write","lesson",'12'),
      ],'Recycle 2',['Food words','Like/dislike','Eating habits'],0),
      mkUnit('u3','Unit 3','Weather',[
        mkL("Let's learn: weather","lesson",'14-15'),
        mkL("Let's talk: How is the weather?","lesson",'16-17'),
        mkL("Let's read & write","lesson",'18'),
      ],'Recycle 3',['Weather words','Seasons','Appropriate clothing'],0),
      mkUnit('u4','Unit 4','Shopping',[
        mkL("Let's learn: clothes","lesson",'20-21'),
        mkL("Let's talk: How much?","lesson",'22-23'),
        mkL("Let's read & write","lesson",'24'),
      ],'Recycle 4',['Clothes','Prices','Can I have...?'],0),
      mkUnit('u5','Unit 5','Visiting Parks',[
        mkL("Let's learn: nature words","lesson",'26-27'),
        mkL("Let's talk: Let's go to...","lesson",'28-29'),
        mkL("Let's read & write","lesson",'30'),
      ],'Recycle 5',['Nature vocabulary','Suggestions','Directions'],0),
      mkUnit('u6','Unit 6','My Weekend',[
        mkL("Let's learn: activities","lesson",'32-33'),
        mkL("Let's talk: What are you going to do?","lesson",'34-35'),
        mkL("Let's read & write","lesson",'36'),
      ],'Recycle 6',['Weekend activities','Future plans','Going to'],0),
    ]},
  },

  '四年级': {
    '上学期': { units: [
      mkUnit('u1','Unit 1','My Classroom',[
        mkL("Let's learn: classroom objects","lesson",'2-4'),
        mkL("Let's talk: Is there a...?","lesson",'5-7'),
        mkL("Let's read & write","lesson",'8'),
      ],'Recycle 1',['There is/are','Classroom things','Numbers'],0),
      mkUnit('u2','Unit 2','My Schoolbag',[
        mkL("Let's learn: school things","lesson",'10-12'),
        mkL("Let's talk: How many...?","lesson",'13-15'),
        mkL("Let's read & write","lesson",'16'),
      ],'Recycle 2',['Plural nouns','Counting','How many'],0),
      mkUnit('u3','Unit 3','My Friends',[
        mkL("Let's learn: adjectives","lesson",'18-20'),
        mkL("Let's talk: He/She is...","lesson",'21-23'),
        mkL("Let's read & write","lesson",'24'),
      ],'Recycle 3',['Adjectives','Third person','Physical descriptions'],0),
      mkUnit('u4','Unit 4','My Home',[
        mkL("Let's learn: rooms & furniture","lesson",'26-28'),
        mkL("Let's talk: There is/are...","lesson",'29-31'),
        mkL("Let's read & write","lesson",'32'),
      ],'Recycle 4',['Rooms','Furniture','Prepositions'],0),
      mkUnit('u5','Unit 5','What Would You Like?',[
        mkL("Let's learn: food & drinks","lesson",'34-36'),
        mkL("Let's talk: What would you like?","lesson",'37-39'),
        mkL("Let's read & write","lesson",'40'),
      ],'Recycle 5',['Food ordering','Would you like...?','Polite requests'],0),
      mkUnit('u6','Unit 6','Meet My Family',[
        mkL("Let's learn: family & occupations","lesson",'42-44'),
        mkL("Let's talk: What does he/she do?","lesson",'45-47'),
        mkL("Let's read & write","lesson",'48'),
      ],'Recycle 6',['Family','Occupations','Daily work'],0),
    ]},
    '下学期': { units: [
      mkUnit('u1','Unit 1','My Day',[
        mkL("Let's learn: daily routines","lesson",'2-4'),
        mkL("Let's talk: When do you...?","lesson",'5-7'),
        mkL("Let's read & write","lesson",'8'),
      ],'Recycle 1',['Daily schedule','Telling time','Adverbs of frequency'],0),
      mkUnit('u2','Unit 2','What Time Is It?',[
        mkL("Let's learn: telling time","lesson",'10-12'),
        mkL("Let's talk: What time do you...?","lesson",'13-15'),
        mkL("Let's read & write","lesson",'16'),
      ],'Recycle 2',['O\'clock / half past','Time phrases','School schedule'],0),
      mkUnit('u3','Unit 3','Weather',[
        mkL("Let's learn: weather & seasons","lesson",'18-20'),
        mkL("Let's talk: What's the weather like?","lesson",'21-23'),
        mkL("Let's read & write","lesson",'24'),
      ],'Recycle 3',['Weather forecast','Seasons','Appropriate dress'],0),
      mkUnit('u4','Unit 4','At the Farm',[
        mkL("Let's learn: farm animals & crops","lesson",'26-28'),
        mkL("Let's talk: How many...are there?","lesson",'29-31'),
        mkL("Let's read & write","lesson",'32'),
      ],'Recycle 4',['Farm vocabulary','Numbers','Describing farms'],0),
      mkUnit('u5','Unit 5','Seasons',[
        mkL("Let's learn: season activities","lesson",'34-36'),
        mkL("Let's talk: What can you do in...?","lesson",'37-39'),
        mkL("Let's read & write","lesson",'40'),
      ],'Recycle 5',['Season activities','Can/Can\'t','I like...because'],0),
      mkUnit('u6','Unit 6','Shopping',[
        mkL("Let's learn: shopping vocabulary","lesson",'42-44'),
        mkL("Let's talk: Can I help you?","lesson",'45-47'),
        mkL("Let's read & write","lesson",'48'),
      ],'Recycle 6',['Shopping phrases','Prices','Size/colour'],0),
    ]},
  },

  '五年级': {
    '上学期': { units: [
      mkUnit('u1','Unit 1','What\'s He Like?',[
        mkL("Let's learn: personality adjectives","lesson",'2-5'),
        mkL("Let's talk: What's he/she like?","lesson",'6-9'),
        mkL("Let's read & write","lesson",'10'),
      ],'Recycle 1',['Personality adjectives','He/She is...','Comparing people'],0),
      mkUnit('u2','Unit 2','My Week',[
        mkL("Let's learn: school subjects","lesson",'12-15'),
        mkL("Let's talk: What do you have on...?","lesson",'16-19'),
        mkL("Let's read & write","lesson",'20'),
      ],'Recycle 2',['Subjects','Days of week','I have... on...'],0),
      mkUnit('u3','Unit 3','What\'s Your Favourite Food?',[
        mkL("Let's learn: food & cooking","lesson",'22-25'),
        mkL("Let's talk: What's your favourite...?","lesson",'26-29'),
        mkL("Let's read & write","lesson",'30'),
      ],'Recycle 3',['Food vocabulary','Favourite things','Healthy eating'],0),
      mkUnit('u4','Unit 4','What Can You Do?',[
        mkL("Let's learn: skills & abilities","lesson",'32-35'),
        mkL("Let's talk: Can you...?","lesson",'36-39'),
        mkL("Let's read & write","lesson",'40'),
      ],'Recycle 4',['Abilities','Can/Can\'t','Invitations'],0),
      mkUnit('u5','Unit 5','Whose Dog Is This?',[
        mkL("Let's learn: possessives","lesson",'42-45'),
        mkL("Let's talk: Whose...is this?","lesson",'46-49'),
        mkL("Let's read & write","lesson",'50'),
      ],'Recycle 5',['Possessive pronouns','Whose','Mine/Yours/His/Hers'],0),
      mkUnit('u6','Unit 6','In a Nature Park',[
        mkL("Let's learn: nature & environment","lesson",'52-55'),
        mkL("Let's talk: Is there a...? Are there any...?","lesson",'56-59'),
        mkL("Let's read & write","lesson",'60'),
      ],'Recycle 6',['Nature vocabulary','There is/are','Environmental protection'],0),
    ]},
    '下学期': { units: [
      mkUnit('u1','Unit 1','Past and Present',[
        mkL("Let's learn: past tense verbs","lesson",'2-5'),
        mkL("Let's talk: What did you do...?","lesson",'6-9'),
        mkL("Let's read & write","lesson",'10'),
      ],'Recycle 1',['Past tense','Did you...?','Time expressions'],0),
      mkUnit('u2','Unit 2','The Spring Festival',[
        mkL("Let's learn: festival activities","lesson",'12-15'),
        mkL("Let's talk: How was your...?","lesson",'16-19'),
        mkL("Let's read & write","lesson",'20'),
      ],'Recycle 2',['Festival culture','Was/Were','Past activities'],0),
      mkUnit('u3','Unit 3','Last Weekend',[
        mkL("Let's learn: past weekend activities","lesson",'22-25'),
        mkL("Let's talk: What did you do last weekend?","lesson",'26-29'),
        mkL("Let's read & write","lesson",'30'),
      ],'Recycle 3',['Regular past tense','Irregular verbs','Weekend stories'],0),
      mkUnit('u4','Unit 4','He said / She said',[
        mkL("Let's learn: reported speech basics","lesson",'32-35'),
        mkL("Let's talk: He told me...","lesson",'36-39'),
        mkL("Let's read & write","lesson",'40'),
      ],'Recycle 4',['Said/Told','Reporting speech','Story telling'],0),
      mkUnit('u5','Unit 5','Farewells',[
        mkL("Let's learn: farewells & wishes","lesson",'42-45'),
        mkL("Let's talk: Good luck! Congratulations!","lesson",'46-49'),
        mkL("Let's read & write","lesson",'50'),
      ],'Recycle 5',['Farewell expressions','Good wishes','Thank-you letters'],0),
      mkUnit('u6','Unit 6','Review',[
        mkL("Review: Grammar focus","practice",'52-57'),
        mkL("Review: Let's talk & write","practice",'58-63'),
      ],'Final Review',['Comprehensive grammar','Communication','Writing review'],0),
    ]},
  },

  '六年级': {
    '上学期': { units: [
      mkUnit('u1','Unit 1','How Tall Are You?',[
        mkL("Let's learn: comparatives","lesson",'2-5'),
        mkL("Let's talk: How tall/old/heavy are you?","lesson",'6-9'),
        mkL("Let's read & write","lesson",'10'),
      ],'Recycle 1',['Comparatives','Measurements','As...as'],0),
      mkUnit('u2','Unit 2','Ways to Go to School',[
        mkL("Let's learn: transportation","lesson",'12-15'),
        mkL("Let's talk: How do you go to...?","lesson",'16-19'),
        mkL("Let's read & write","lesson",'20'),
      ],'Recycle 2',['Transport vocabulary','By bus/car/bike','How long'],0),
      mkUnit('u3','Unit 3','My Weekend Plan',[
        mkL("Let's learn: weekend vocabulary","lesson",'22-25'),
        mkL("Let's talk: Are you going to...?","lesson",'26-29'),
        mkL("Let's read & write","lesson",'30'),
      ],'Recycle 3',['Going to...','Future plans','Making arrangements'],0),
      mkUnit('u4','Unit 4','Then and Now',[
        mkL("Let's learn: changes over time","lesson",'32-35'),
        mkL("Let's talk: Was/Were...","lesson",'36-39'),
        mkL("Let's read & write","lesson",'40'),
      ],'Recycle 4',['Past and present','Changes','Describing differences'],0),
      mkUnit('u5','Unit 5','Tomorrow\'s Talents',[
        mkL("Let's learn: future tense","lesson",'42-45'),
        mkL("Let's talk: What will you be?","lesson",'46-49'),
        mkL("Let's read & write","lesson",'50'),
      ],'Recycle 5',['Will + verb','Future jobs','Dream and goals'],0),
      mkUnit('u6','Unit 6','A Letter to My Friend',[
        mkL("Let's learn: letter writing","lesson",'52-55'),
        mkL("Let's talk: Writing a friendly letter","lesson",'56-59'),
        mkL("Let's read & write","lesson",'60'),
      ],'Recycle 6',['Letter format','Friendly writing','Expressing feelings'],0),
    ]},
    '下学期': { units: [
      mkUnit('u1','Unit 1','The Unknown World',[
        mkL("Let's learn: science & discovery","lesson",'2-5'),
        mkL("Let's talk: Have you ever...?","lesson",'6-9'),
        mkL("Let's read & write","lesson",'10'),
      ],'Recycle 1',['Present perfect intro','Have you ever...','Science vocabulary'],0),
      mkUnit('u2','Unit 2','Last Weekend',[
        mkL("Let's learn: irregular past verbs","lesson",'12-15'),
        mkL("Let's talk: What happened?","lesson",'16-19'),
        mkL("Let's read & write","lesson",'20'),
      ],'Recycle 2',['Irregular past','Story retelling','Sequence words'],0),
      mkUnit('u3','Unit 3','Protect the Earth',[
        mkL("Let's learn: environmental protection","lesson",'22-25'),
        mkL("Let's talk: We should/shouldn't...","lesson",'26-29'),
        mkL("Let's read & write","lesson",'30'),
      ],'Recycle 3',['Should/Shouldn\'t','Environmental words','Responsibility'],0),
      mkUnit('u4','Unit 4','I Have a Dream',[
        mkL("Let's learn: dreams & goals","lesson",'32-35'),
        mkL("Let's talk: I want to...because...","lesson",'36-39'),
        mkL("Let's read & write","lesson",'40'),
      ],'Recycle 4',['Dreams and aspirations','Because/So','Goal setting'],0),
      mkUnit('u5','Unit 5','Memories of Primary School',[
        mkL("Let's learn: school memories","lesson",'42-45'),
        mkL("Let's talk: My best memory is...","lesson",'46-49'),
        mkL("Let's read & write","lesson",'50'),
      ],'Recycle 5',['Memories','Adjectives','Farewell'],0),
      mkUnit('u6','Unit 6','Graduation',[
        mkL("Let's learn: graduation speech language","lesson",'52-55'),
        mkL("Review & celebration","practice",'56-63'),
      ],'Final Review',['Graduation vocabulary','Making speeches','Primary school review'],0),
    ]},
  },
}
