# swpp2019-team15

### Project Requirements and Specification<br>

**Öga**<br>
Requirements and Specification Document<br>
Rev. 1.0 2019-10-05 - initial version

### Project Abstract<br>

Öga is a location based Q&A service, where users' questions regarding a location are forwarded to other users in that location. Its name, meaning eye in Swedish, implies the nature of the questions--it only requires a glance of an eye to answer. The name also hints at the service's nature; where questions and answers are "오고가다" amongst users--a term meaning to and fro in Korean.<br>
There are often occasions when we want to acquire information about a place minutes before arriving. For instance, you may want to know how many seats are available before entering a restaurant or café. But it would be bothersome and inefficient to call all candidate restaurants. Picture this: You want to know how long the current queue is for Gwanak02 as you approach NakSeong Station. If it's too long, riding a different bus would be the smarter option. If you could correctly grasp the circumstance, your decision-making process would be greatly improved.<br/><br/>
Öga connects you with people who are at/near the location at the moment while maintaining the anonymity of users. Moreover, Öga provides a slight sense of bonding and affinity, as users share one thing in common--they will be in the same place sooner or later. These feelings will in turn, encourage users to ask and answer questions.

### Customer<br>

Living in a modern, fast-paced era means that many people are often looking for ways to maximize time efficiency and reduce wasted effort. With this in mind, Öga targets customers who are constantly moving around and changing positions throughout the day, unlike normal office workers. Additionally, Öga is also a useful software for anyone who wants to obtain information about a place prior to visiting. Similar customers who like to provide and receive help from others with the glance of an eye and touch of a finger would benefit greatly from this service.<br/><br/>
For our initial implementation and testing phase, this software will mainly target SNU students looking for efficient ways to survey the status of a place on campus before visiting; and gradually increase the customer range to cover a larger population for future iterations.

## Competitive Landscape<br>

**Competitors**<br>
Öga's questions and answers are focused around a certain location, and take almost zero effort to ask and reply. Quora and Stackoverflow, on the other hand, mainly focus on technical questions that requires effort to both ask and answer. Thus, speed would be a comparative advantage that Öga has over Quora or Stackoverflow. <br/><br/>
Compared to Stackoverflow and Quora, Naver Jiski-iN, takes care of a wider range of questions, and it takes less user effort to answer. However, allowing less user effort leads to poor quality answers in which users have to offer points known as 'Nae-Gong' in order to receive better answers. Öga prevents this issue by providing a predefined set of questions and answers, so that less effort does not lead to poor quality answers. Moreover, Öga asks about a certain location, so it takes less time to receive answers, while Jisik-iN usually requires more that 3,000 views before an answer is received.

**Social Network Services like KaKaoTalk and Twitter.**<br>
Users on Twitter often "tweet" about a certain location via hashtags. A user might post a tweet asking about seats in the library, or post that the line in front of the cafeteria is absurdly long. These tweets, can be a competitor to Öga. However, these tweets are shown to users following a certain hashtag, and there is no guarantee that the user is at that location. By choosing to ask people at the selected location, Öga has an advantage over Twitter.<br/><br/>
Messenger services like KakaoTalk can also be a competitor, as users can directly ask their friends about a location. However, users would have to know in advance whether their friends are at the location, or first inquire about their friends' locations. Using Öga, users can skip these cumbersome phases and obtain the information they need in a more efficient manner.

### User Stories<br>

**User Story #1 _(Sprint 2)_**<br>

- **Feature:** Sending a question to people in a target location
- **Actors:** Question sender looking for a seat in the library
- **Precondition:** The question sender has to be a registered user and logged in.
- **Trigger:** The question sender clicks `SEND A QUESTION` button
- **Scenario:**

  1. The question sender clicks the `SEND A QUESTION` button
  2. The page displays various pictograms which allows the user to select the type of targeted location. (E.g. library/restaurant/bus stop).
  3. After the user has selected a pictogram, the page displays a location search bar, which the user will fill in with the name the target area/location (E.g. SNU library).
  4. The page displays a map of the desired area/available locations and shows a graphic user interface with a set of pre-made location-specific questions.
  5. The user will select an adequate question and press the `SEND` button.

- **Exceptions:** When the user clicks the `SEND` button without selecting the question type/target area/location/question.
- **Acceptance Test:**
  Given the user has filled out all the required fields to create a question, when the user clicks on the `SEND` button, the user should see the page display `Your question has been sent successfully`.

**User Story #2 _(Sprint 2)_**<br>

- **Feature:** Answering a question
- **Actors:** A responder near the library (or target destination)
- **Precondition:** The question sender and responder have to be registered users and logged in, and responders have to be near the target location.
- **Trigger:** Question responder will receive a notification saying `You've got questions to answer`.
- **Scenario:**

  1. The responder receives a notification prompting the user to respond to a question.
  2. The responder clicks the `RESPOND` button and the page displays a range of answers for the user to select based on the location-specific question.
  3. The responder selects an answer by clicking on an adequate pictogram and presses the `ANSWER` button to submit his/her response.

- **Exceptions:** When the responder clicks the `RESPOND` button without selecting the pictogram of an answer.
- **Acceptance Test:**
  Given the responder has chosen an answer for the question and clicked the `ANSWER` button, then the responder should see `Your answer has been sent successfully.`

**User Story #3 _(Sprint 3)_**<br>

- **Feature:** Rating the answer
- **Actors:** A question sender who received a wrong answer from a question responder to his/her question
- **Precondition:** The question sender has to be a registered user and logged in. Also he/she must have a previous record of at least one unrated answer to his/her question.
- **Trigger:** The question sender will receive a notification saying `You received an answer.`
- **Scenario:**

  1. The question sender receives a notification saying `You received an answer.`
  2. The question sender will rate the answer by clicking on an adequate pictogram which displays a satisfaction scale and presses the `RATE` button to submit the rating.

- **Exceptions:** When the question sender has already rated the answer or clicks `RATE` without first selecting a pictogram.
- **Acceptance Test:**
  Given the question sender has chosen an pictogram for the answer and clicked the `RATE` button, the question sender should see a page displaying `Thank you. Your response has been successfully recorded.`

** For Future Iterations**

There are two ways of getting questions. One is when the user logs in, then page displays map with question balloon near the user. The other way is getting alarm from the user's nearby locations. The user can choose whether he/she will choose question balloon voluntarily or getting alarms.

### User Interface Requirements<br>

Describes any customer user interface requirements including graphical user interface requirements. Here you should have sketches or mockups for the main parts of the interface. To save time you may want to use scanned drawings of interface mockups here, instead of Photoshop drawings.

Just like for the User Stories section, you need to list here only the parts of the user interface that are applicable to the previous sprints and the current one. (**Must include in the first version, and must be expanded for future sprints**)
