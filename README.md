# henritwitterbot

# Introduction
I was a big fan of graphical adventure games, back in the late '80s and '90s. One of my favorite games was "Colonel's Bequest" by Sierra On-Line, a "whodunit" murder mystery adventure game, written by Roberta Williams and released in 1989. This Twitter bot (implemented in Oracle Nashorn 8, JavaScript on the JVM) responds to the same kind of input as the Henri Dijon character in this game.

Colonel Henri Dijon is now on Twitter. Although known to hate socializing, he now has a Twitter account and is ready to answer your questions about his family members, estate, pets (horse, dog and parrot), servants (maid, butler, doctor, attorney) and some other things that players of The Colonel's Bequest adventure game should recognize. He will respond with his characteristic not-always-very-friendly remarks.

At the time of writing, the bot is off-line

# Examples

If you are interested in his opinion of his maid, Fifi. You can tweet him one of the following texts (choose the variant you like best, it does not make a difference):

@henridijon ask about maid
@henridijon ask Henri about the maid
@henridijon ASK Colonel ABOUT Fifi
ASK @henridijon ABOUT fifi
Note that the bot is smart enough to understand both "Fifi", "maid" and "the maid", just like the optional "Colonel" and "Henri" names. Also, using upper- or lowercase characters does not matter.

Perhaps you heard the rumors of Fifi and Rudy having a fight. If you'd like to inform the Colonel, tweet him one of the following tweets:

@henridijon tell about Fifi and Rudy
@henridijon tell henri about fifi AND rudy
@henridijon TELL colonel ABOUT Fifi AND Rudy
tell @henridijon about Fifi AND Rudy

If you are only interested in chit-chat, you can let him know by tweeting either:

@henridijon talk
@henridijon talk to henri
@henridijon talk to me
Manual
The Henri Dijon Bot is case insensitive. You can user tweet him both lower- and UPPERCASE (even MiXeD) texts. @Mentions other than @henridijon are ignored, just like #hashtags.

# Full manual

All the forms currently recognized by the bot:

Asking Henris opinion about someone or something

@henridijon ASK ABOUT xxx
ASK @henridijon ABOUT xxx
@henridijon ASK HENRI ABOUT xxx
@henridijon ASK COLONEL ABOUT xxx
@henridijon ASK ABOUT xxx AND yyy
ASK @henridijon ABOUT xxx AND yyy
@henridijon ASK HENRI ABOUT xxx AND yyy
@henridijon ASK COLONEL ABOUT xxx AND yyy

Telling him about somebody or something

@henridijon TELL ABOUT xxx
TELL @henridijon ABOUT xxx
@henridijon TELL HENRI ABOUT xxx
@henridijon TELL COLONEL ABOUT xxx
@henridijon TELL ABOUT xxx AND yyy
TELL @henridijon ABOUT xxx AND yyy
@henridijon TELL HENRI ABOUT xxx AND yyy
@henridijon TELL COLONEL ABOUT xxx AND yyy

Chit-chat

@henridijon TALK
@henridijon TALK TO HENRI
@henridijon TALK TO COLONEL
@henridijon TALK TO ME
TALK TO @henridijon

If Henri does not understand your tweet, he will answer in the similar way he would have done in the game.

Coming soon: SHOW and GIVE commands
