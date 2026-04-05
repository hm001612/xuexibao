// 英语题库 — 人教PEP版（新教材） 一至六年级

export const ENGLISH_QUESTIONS = {

  '一年级': [
    { id:'e1_1', grade:'一年级', type:'word', difficulty:1,
      question:'Look and match. 连线',
      items:[
        {hint:'red colour',answer:'red',emoji:'🔴'},
        {hint:'yellow colour',answer:'yellow',emoji:'🟡'},
        {hint:'green colour',answer:'green',emoji:'🟢'},
        {hint:'blue colour',answer:'blue',emoji:'🔵'},
      ]},
    { id:'e1_2', grade:'一年级', type:'choice', difficulty:1,
      question:'Choose the right answer. 选择正确答案',
      items:[
        {q:"Hello! I'm Tom. ____!",options:['A. Bye','B. Hello','C. Yes','D. Good'],answer:1},
        {q:"What colour is the apple?  ____",options:['A. It\'s red.','B. It\'s blue.','C. It\'s green.','D. It\'s yellow.'],answer:0},
        {q:"How many cats? ____",options:['A. One cat.','B. Three cats.','C. Two cats.','D. Four cats.'],answer:1,note:'图中有3只猫'},
      ]},
    { id:'e1_3', grade:'一年级', type:'dialogue', difficulty:1,
      question:'Put the dialogue in order. 将对话排序',
      lines:[
        {text:'A: Hello! I\'m Mary.',order:1},
        {text:'B: Hi! I\'m Tom. Nice to meet you.',order:2},
        {text:'A: Nice to meet you too.',order:3},
        {text:'B: Goodbye!',order:4},
        {text:'A: Goodbye!',order:5},
      ]},
    { id:'e1_4', grade:'一年级', type:'sentence', difficulty:1,
      question:'Read and write. 读图写句子',
      items:[
        {hint:'A dog is ___.',picture:'dog running',answer:'This is a dog.'},
        {hint:'Point to the ___ ball.',options:['red','blue','yellow'],answer:'示例：Point to the red ball.'},
      ]},
  ],

  '二年级': [
    { id:'e2_1', grade:'二年级', type:'word', difficulty:1,
      question:'Read and write. 看图写单词',
      items:[
        {hint:'school thing you write with',answer:'pen',emoji:'🖊️'},
        {hint:'school thing you draw a line with',answer:'ruler',emoji:'📏'},
        {hint:'school thing you rub out mistakes',answer:'eraser',emoji:'⬜'},
        {hint:'place to sit at school',answer:'desk',emoji:'🪑'},
      ]},
    { id:'e2_2', grade:'二年级', type:'choice', difficulty:1,
      question:'Choose the best answer.',
      items:[
        {q:"— Where is the book?\n— It is ____ the desk.",options:['A. in','B. on','C. under','D. at'],answer:1},
        {q:"— How many pencils do you have?\n— ____ three.",options:['A. It have','B. I has','C. I have','D. It is'],answer:2},
        {q:"This is my father. ____ name is David.",options:['A. His','B. Her','C. My','D. Its'],answer:0},
      ]},
    { id:'e2_3', grade:'二年级', type:'reading', difficulty:2,
      passage:"My name is Amy. I have a school bag. In my bag, I have 2 books, 3 pencils, 1 ruler and 1 eraser. My bag is blue. I like my bag very much.",
      questions:[
        {q:"How many books does Amy have?",options:['A. One','B. Two','C. Three','D. Four'],answer:1},
        {q:"What colour is Amy's bag?",options:['A. Red','B. Green','C. Blue','D. Yellow'],answer:2},
        {q:"Does Amy like her bag?",options:['A. Yes, she does.','B. No, she doesn\'t.','C. Yes, he does.','D. No, he doesn\'t.'],answer:0},
      ]},
    { id:'e2_4', grade:'二年级', type:'dialogue', difficulty:2,
      question:'Complete the dialogue. 补全对话',
      context:'Two students are talking about their classroom.',
      blanks:[
        {position:1,options:['How many','What colour','Where is'],answer:0,contextLine:'____ windows are there?'},
        {position:2,options:['There are six.','It is big.','Yes, there is.'],answer:0,contextLine:'____'},
        {position:3,options:['How many','What colour','Where is'],answer:2,contextLine:'____ the board?'},
        {position:4,options:['It is at the front.','There is one.','It is black.'],answer:0,contextLine:'____'},
      ]},
  ],

  '三年级': [
    { id:'e3_1', grade:'三年级', type:'word', difficulty:1,
      question:'Write the correct words. 写出正确单词',
      items:[
        {hint:'morning greeting',answer:'Good morning',emoji:'🌅'},
        {hint:'afternoon greeting',answer:'Good afternoon',emoji:'☀️'},
        {hint:'evening greeting',answer:'Good evening',emoji:'🌙'},
        {hint:'say goodbye',answer:'Goodbye',emoji:'👋'},
      ]},
    { id:'e3_2', grade:'三年级', type:'choice', difficulty:1,
      question:'Choose the best answer.',
      items:[
        {q:"— What's your name?\n— ____ name is Lily.",options:['A. My','B. Your','C. His','D. Her'],answer:0},
        {q:"He is my father. ____ name is Jack.",options:['A. My','B. Her','C. His','D. Their'],answer:2},
        {q:"____ is she? She is my sister.",options:['A. What','B. Where','C. Who','D. How'],answer:2},
      ]},
    { id:'e3_3', grade:'三年级', type:'reading', difficulty:2,
      passage:"This is my family. My father is tall and strong. My mother is beautiful. She has long hair. I have a little brother. He is cute and funny. We all love each other. We are a happy family!",
      questions:[
        {q:"What does the father look like?",options:['A. Short and thin','B. Tall and strong','C. Fat and short','D. Small and cute'],answer:1},
        {q:"Does the mother have long hair?",options:['A. Yes, she does.','B. No, she doesn\'t.','C. Yes, he does.','D. No, he doesn\'t.'],answer:0},
        {q:"How many people are in the family?",options:['A. Two','B. Three','C. Four','D. Five'],answer:2},
      ]},
    { id:'e3_4', grade:'三年级', type:'sentence', difficulty:2,
      question:'Translate into English. 翻译句子',
      items:[
        {cn:'这是我的妈妈。她叫李梅。',answer:'This is my mother. Her name is Li Mei.'},
        {cn:'我有一个弟弟。他很可爱。',answer:'I have a little brother. He is very cute.'},
        {cn:'那只动物是什么？它是一只老虎。',answer:'What\'s that animal? It\'s a tiger.'},
      ]},
    { id:'e3_5', grade:'三年级', type:'dialogue', difficulty:2,
      question:'Complete the dialogue in the zoo.',
      blanks:[
        {position:1,options:['What\'s that?','Who is that?','Where is that?'],answer:0,contextLine:'____ It\'s a panda.'},
        {position:2,options:['It\'s black and white.','It\'s big.','It can run fast.'],answer:0,contextLine:'What colour is it? ____'},
        {position:3,options:['I like pandas.','I have a panda.','Pandas are bad.'],answer:0,contextLine:'Do you like pandas? Yes, ____'},
      ]},
  ],

  '四年级': [
    { id:'e4_1', grade:'四年级', type:'word', difficulty:2,
      question:'Fill in the blanks with the correct words.',
      words:['there','Is','any','some','are'],
      sentences:[
        {blank:'____ is a blackboard in our classroom.',answer:'There'},
        {blank:'____ there a computer?',answer:'Is'},
        {blank:'There are ____ books on the desk.',answer:'some'},
      ]},
    { id:'e4_2', grade:'四年级', type:'cloze', difficulty:2,
      intro:"Read and fill in the blanks.",
      passage:"Look! There _1_ many animals in the zoo. The pandas _2_ black and white. They _3_ very cute. I _4_ pandas very much.",
      blanks:[
        {n:1,options:['is','are','am','be'],answer:1},
        {n:2,options:['is','are','am','has'],answer:1},
        {n:3,options:['is','are','am','has'],answer:1},
        {n:4,options:['like','likes','liking','liked'],answer:0},
      ]},
    { id:'e4_3', grade:'四年级', type:'reading', difficulty:3,
      passage:"Sarah's Day\nSarah gets up at 6:30. She has breakfast at 7:00. She goes to school at 7:30. At school, she has Chinese, Maths and English. She has lunch at 12:00. After school, she does her homework at 4:00. She has dinner at 6:30. She goes to bed at 9:00.",
      questions:[
        {q:"What time does Sarah get up?",options:['A. 6:00','B. 6:30','C. 7:00','D. 7:30'],answer:1},
        {q:"When does she do her homework?",options:['A. At 3:00','B. At 4:00','C. At 5:00','D. At 6:00'],answer:1},
        {q:"What subjects does Sarah study at school?",options:[
          'A. Chinese, Maths, English','B. Chinese, Art, Music',
          'C. Maths, Science, English','D. Chinese, PE, English'],answer:0},
      ]},
    { id:'e4_4', grade:'四年级', type:'sentence', difficulty:2,
      question:'Translate into English.',
      items:[
        {cn:'今天天气怎么样？今天很晴朗。',answer:'What\'s the weather like today? It\'s sunny today.'},
        {cn:'你喜欢什么季节？我喜欢春天。',answer:'What\'s your favourite season? My favourite season is spring.'},
        {cn:'农场里有多少头奶牛？',answer:'How many cows are there on the farm?'},
      ]},
    { id:'e4_5', grade:'四年级', type:'dialogue', difficulty:3,
      question:'Complete the shopping dialogue.',
      context:'In a shop, A is a customer, B is the shopkeeper.',
      blanks:[
        {position:1,options:['Can I help you?','What do you want?','How much?'],answer:0,contextLine:'B: ____ '},
        {position:2,options:['I\'d like a shirt.','I want some food.','I need a pen.'],answer:0,contextLine:'A: ____'},
        {position:3,options:['It\'s 50 yuan.','Very cheap!','Buy two, get one.'],answer:0,contextLine:'B: How much is it? ____'},
        {position:4,options:['Here you are.','No, thanks.','That\'s too expensive.'],answer:0,contextLine:'A: OK. ____'},
      ]},
  ],

  '五年级': [
    { id:'e5_1', grade:'五年级', type:'word', difficulty:2,
      question:'Choose the word that best completes each sentence.',
      words:['kind','patient','hard-working','funny','smart'],
      sentences:[
        {blank:'Tom always helps others. He is very ____.',answer:'kind'},
        {blank:'Lisa never gives up. She is ____ and ____.',answer:'hard-working / patient'},
        {blank:'Jack tells jokes. He is very ____.',answer:'funny'},
      ]},
    { id:'e5_2', grade:'五年级', type:'cloze', difficulty:3,
      intro:"Read and choose the best words.",
      passage:"Last Saturday, I _1_ to the park with my family. We _2_ a picnic there. The weather _3_ great. My sister _4_ on the grass and I _5_ photos. We _6_ a very good time.",
      blanks:[
        {n:1,options:['go','went','goes','going'],answer:1},
        {n:2,options:['have','has','had','having'],answer:2},
        {n:3,options:['is','was','were','are'],answer:1},
        {n:4,options:['run','runs','ran','running'],answer:2},
        {n:5,options:['take','took','takes','taking'],answer:1},
        {n:6,options:['have','has','had','having'],answer:2},
      ]},
    { id:'e5_3', grade:'五年级', type:'reading', difficulty:3,
      passage:"Spring Festival is the most important festival in China. It usually comes in January or February. Before the festival, people clean their homes and buy new clothes. On New Year's Eve, families get together for a big dinner. Children get red envelopes with money. People set off fireworks to celebrate. The festival lasts fifteen days.",
      questions:[
        {q:"When does Spring Festival usually come?",options:[
          'A. March or April','B. January or February',
          'C. November or December','D. May or June'],answer:1},
        {q:"What do children receive during Spring Festival?",options:[
          'A. New clothes','B. Fireworks','C. Red envelopes with money','D. Special food'],answer:2},
        {q:"How long does the festival last?",options:[
          'A. One week','B. Ten days','C. Fifteen days','D. One month'],answer:2},
      ]},
    { id:'e5_4', grade:'五年级', type:'sentence', difficulty:3,
      question:'Write in English.',
      items:[
        {cn:'上周末你做了什么？我去看了一场电影。',answer:'What did you do last weekend? I went to see a film.'},
        {cn:'你会弹钢琴吗？是的，我会。',answer:'Can you play the piano? Yes, I can.'},
        {cn:'这本书是谁的？它是迈克的。',answer:'Whose book is this? It\'s Mike\'s.'},
      ]},
    { id:'e5_5', grade:'五年级', type:'dialogue', difficulty:3,
      question:'Complete the dialogue about the Spring Festival holiday.',
      blanks:[
        {position:1,options:['How was your holiday?','Where did you go?','What did you do?'],answer:0,contextLine:'A: ____'},
        {position:2,options:['It was great!','I went to Beijing.','I had dumplings.'],answer:0,contextLine:'B: ____'},
        {position:3,options:['What did you do?','Did you travel?','How long?'],answer:0,contextLine:'A: ____'},
        {position:4,options:['I visited my grandparents.','I stayed at home.','I watched TV.'],answer:0,contextLine:'B: ____'},
      ]},
  ],

  '六年级': [
    { id:'e6_1', grade:'六年级', type:'word', difficulty:3,
      question:'Fill in the blanks using the correct form of the words.',
      items:[
        {blank:'Tom is ____ (tall) than his brother.',answer:'taller'},
        {blank:'This is the ____ (good) book I have ever read.',answer:'best'},
        {blank:'She ____ (go) to school by bike every day.',answer:'goes'},
        {blank:'We ____ (visit) the Great Wall last summer.',answer:'visited'},
      ]},
    { id:'e6_2', grade:'六年级', type:'cloze', difficulty:3,
      intro:"Read and fill in the blanks.",
      passage:"We should protect our earth. Every day, people _1_ a lot of rubbish. Factories _2_ dirty water into rivers. We _3_ too much electricity. To help the earth, we _4_ turn off lights when we leave. We should also _5_ less water and _6_ waste.",
      blanks:[
        {n:1,options:['make','makes','made','making'],answer:0},
        {n:2,options:['put','puts','putting','to put'],answer:0},
        {n:3,options:['use','uses','using','to use'],answer:0},
        {n:4,options:['can','must','should','would'],answer:2},
        {n:5,options:['use','uses','using','used'],answer:0},
        {n:6,options:['reduce','reduces','reducing','reduced'],answer:0},
      ]},
    { id:'e6_3', grade:'六年级', type:'reading', difficulty:3,
      passage:"My Dream Job\nI want to be a doctor when I grow up. Doctors help sick people get better. I think it is a very important and meaningful job. My father is a doctor. Every day he goes to the hospital and helps many patients. He often comes home very late, but he is never tired because he loves his work. I want to be like my father — kind, patient and helpful. I will study hard to achieve my dream.",
      questions:[
        {q:"What does the writer want to be?",options:['A. A teacher','B. A doctor','C. A nurse','D. An engineer'],answer:1},
        {q:"Why does the writer want to become a doctor?",options:[
          'A. Because it pays well','B. Because it is meaningful and important',
          'C. Because it is easy','D. Because doctors travel a lot'],answer:1},
        {q:"What is the father like?",options:[
          'A. Lazy and tired','B. Kind, patient and helpful',
          'C. Strict and serious','D. Funny and clever'],answer:1},
      ]},
    { id:'e6_4', grade:'六年级', type:'sentence', difficulty:3,
      question:'Translate into English.',
      items:[
        {cn:'你比你哥哥高多少？我比他高5厘米。',answer:'How much taller are you than your brother? I am 5 cm taller than him.'},
        {cn:'你打算周末做什么？我打算去拜访祖父母。',answer:'What are you going to do this weekend? I\'m going to visit my grandparents.'},
        {cn:'我们应该节约用水，保护地球。',answer:'We should save water and protect the earth.'},
      ]},
    { id:'e6_5', grade:'六年级', type:'dialogue', difficulty:3,
      question:'Complete the farewell dialogue between classmates.',
      blanks:[
        {position:1,options:['Good luck in junior high!','What will you do?','Where are you going?'],answer:0,contextLine:'A: We\'re graduating! ____'},
        {position:2,options:['Thank you! You too!','I\'m so sad.','I don\'t know.'],answer:0,contextLine:'B: ____'},
        {position:3,options:['What will you miss most?','Are you happy?','Do you have plans?'],answer:0,contextLine:'A: ____'},
        {position:4,options:['I\'ll miss our teachers and classmates.','I want to go home.','I like summer.'],answer:0,contextLine:'B: ____'},
      ]},
    { id:'e6_6', grade:'六年级', type:'reading', difficulty:3,
      passage:'Have you ever been to the Great Wall? It is one of the greatest wonders in the world. The Great Wall was built more than 2,000 years ago. It stretches over 6,000 kilometres. Many people visit it each year. When you stand on it, you can see mountains all around. It is truly amazing!',
      questions:[
        {q:'How long ago was the Great Wall built?',options:['A. 1,000 years ago','B. 2,000 years ago','C. 3,000 years ago','D. 500 years ago'],answer:1},
        {q:'How long is the Great Wall?',options:['A. Over 3,000 km','B. Over 4,000 km','C. Over 5,000 km','D. Over 6,000 km'],answer:3},
        {q:'What can you see from the Great Wall?',options:['A. The sea','B. Tall buildings','C. Mountains','D. Desert'],answer:2},
      ]},
  ],
}
