The purpose of this dictionary app is for me to become more proficient with Node, Express, Mongo, Mongoose, EJS, and other pieces of modern tech while reviewing Japanese and creating a more permanent interface accessible anywhere with internet instead of buggy cloud sharing documents.

The purpose of the actual dictionary is to start taking the Japanese/Chinese/English dictionary that I have built over the last 10+ years and transfer it online. 

The words will be added slowly since they are all in different formats as I improved how I input them into excel over the years. I have them in JSON in the data folder, but there is no way to parse the data because the same symbol has different meanings in different places. Therefore, I have to input it all over again into my word schema and will do this slowly over time.

To do list:

Search:
1. Live search, but no way to do wildcard in live search yet. Possible new feature in future.
2. May possibly add another query/filter to search for a word in example sentences.
3. May add a new button in each word card to add the card to collection if logged in. Possibly a modal window and 4 colors. This will save user from having to hit random until they eventually come across that word.
4. Change main search to get and not post so can easily call it and paste in words. Need to check how to also do live search on route without get conflicts. Having it as post makes it hard to use as an endpoint for same site and others because of browser default behavior.

User profile:
1. Sentence of the day still not getting single random and pulls whole array. Need to test and fix, but being lazy and waiting for the new one each day to see results lol.
2. Add a way to list out cards for all words just like main search.
3. Add a way for user to start their own collection by adding their own words and not pulling from dictionary. This will be their own flash card system. Need to decide if I want a new schema for this with a reference, or just an embedded one with a simple JP/ENG words only setup. Will get feedback from a few possible users on what they may want, but need to keep in mind possible future expansion.
   
Review:
1. No way to remove words from green (mastered) yet after a possible misclick.
2. CSS hover does not work for mobile.

CSS
1. This is unorganized. Plan to organize after have a decent design and most of the functionality is complete. Will do a modularized scss build and then compile/prefix/compress into single css file to serve. Maybe consider Tailwind this time?

Security:
1. Add recaptcha to help prevent bots.
2. Add IP blocking if certain patterns arise.
3. Add 2 factor authentication and require mobile code for medium risks and locking for high risks.
4. Consider adding CSRF sessions and hidden form fields, but may be overkill.

Signup:
1. Add email authentication.
2. Consider adding Google/Apple/Facebook logins and enable skipping of email auth if successful.

Recovery:
1. Add a password recovery method.

Bundler:
1. After most of the above is taken care of, configure parcel for performance.

Footer:
1. Finish privacy policy.
2. Add a contact form for submitting suggestions or issues. Make this SUPER hard for bots to crack and no info at all on front end.