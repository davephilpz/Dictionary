This dictionary app is to become more proficient with Node, Express, Mongo, Mongoose, EJS, and other pieces of modern tech.

The purpose is to start taking the Japanese/Chinese/English dictionary that I have built over the last 10+ years and transfer it online. 

The words will be added slowly since they are all in different formats as I improved how i input them into excel over the years. I have them in JSON in the data folder, but there is no way to parse the data because the same symbol has different meanings in different places. Therefore I have to input it all all over again into my word schema.

I am in the process of adding a function that pulls (n) random entries from the dictionary and shows the Japanese word. The user can then click the reveal to see the answer like a flash card. The green adds to user mastered and red to don't know well at all etc. You can then choose to pull words from dict. or from your current lists.

Plan to add this as a normal user route after logged in.

Need to do global error handling and work on filters/pagination for search first as that is the main functionality.