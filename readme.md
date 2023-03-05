The purpose of this dictionary app is for me to become more proficient with Node, Express, Mongo, Mongoose, EJS, and other pieces of modern tech while reviewing Japanese and creating a more permanent interface accessible anywhere with internet instead of buggy cloud sharing documents.

The purpose of the actual dictionary is to start taking the Japanese/Chinese/English dictionary that I have built over the last 10+ years and transfer it online. 

The words will be added slowly since they are all in different formats as I improved how i input them into excel over the years. I have them in JSON in the data folder, but there is no way to parse the data because the same symbol has different meanings in different places. Therefore I have to input it all over again into my word schema.

Search:
1. Live search, but ***no way to do wildcard in live search yet. Possible new featrure in future.
2. ***May possible add another query/filter to search for a word in example sentences.
3. ***May add a new button in each word card to add the card to collection if logged in. Possibly a modal window and 4 colors. This will save user from having to hit random until they eventually come across that word.

User profile:
1. ***Update collection categories.
2. ***Add example sentence of day.
   
Review:
1. ***No way to remove words from green (mastered) yet after a possible misclick

CSS
1. ***This is a royal mess. Plan to organize after have a decent design and do a modularized scss build and then compile/prefix/compress into single css file to serve.