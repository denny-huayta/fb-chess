Feature: Chess
	In order to verify chess master
	As a player 1
	I want to login

	Scenario: See Home Page
		When I go to the home page
		Then I should see "Sign up with Facebook"

	Scenario: See Home Page
		When I go to the home page
		And I follow "Games"
		Then I should see "Games"

	Scenario: See Home Page
		When I go to the home page
		And I follow "Chessboard"
		Then I should see "Turno"

	Scenario: Login with Facebook
		When I go to the home page
		And I follow "Sign up with Facebook"
		Then I should see "Log in"