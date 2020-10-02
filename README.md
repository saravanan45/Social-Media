
Social Media Application - Tweet

 In this application, we are using
	Front End - ReactJs, Redux, Styled Components
	Back End - ExpressJS
	Database - Firebase

 Backend API's are created using Express JS and uploaded in the Firebase database
 
FrontEnd - Pages
	1. Login page
	2. Registration Page
	3. Dashboard Page - private page - only loggedIn users can see

should work on mobile/ipads/desktop

Registration Page - fields
	1. Email
	2. Username
	3. password
	4. confirm password
	5. Register button
	
validation for all fields
password - validation for 8 chars, one caps, one small letter, one special character, one number
on valid submission - redirect to login page.
	
Login Page - fields
	1. email Id
	2. Password
	3. Login button
	
validation for both email and password
on Valid submission - redirect to dashboard page

Dashboard page

header - fields
	1. logout button
	2. Notification button
	3. add new tweet button
	3. on Mobile screen only - profile button will be shown
	
 Notification button
	- should be shown on user liking and commenting your post
	- clicking on the notification will mark it as read

 Logout button
	- Redirect to login page
	
 add New tweet button
	- post new tweet to everyone
	
 Profile button
	- shown only on mobile screen size
	- display the user profile Inof
	
body - two sections
	1. tweets - posted by everyone(left side)
	2. profile - user Info(right side)
	
  tweets section
	- showing tweets posted by everyone based on recent time(recent tweet posted at the top)
	- Every tweets has certain fields
		- user image who has posted the tweet
		- tweet body
		- tweet posted time
		- how many likes
		- how many comments
				- clicking on comments will show all the comments posted(popup dialog)
						- user image who has posted commenting
						- comment body
				
  Profile section
	- normally shown on right side for desktop screen
	- clicking profile icon will display the profile at the top before the tweets(for smaller screens - mobile and ipads)
	
	fields
		- User image
		- bio
			- bio can be edited by clicking the edit button
				- small description about user
				- location
			
Backend API's - written and published to firebasae
