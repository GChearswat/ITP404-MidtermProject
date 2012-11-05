<?php

class Twitter{
	static function getTweets(){
		$url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=MumfordAndSons&count=10";
		$jsonString = file_get_contents($url);
		$arrayOfTweets = json_decode($jsonString);
		
		echo '<h2> &nbsp&nbsp&nbsp&nbspTwitter Stream </h2>';

		echo '<ul>';
		foreach($arrayOfTweets as $tweet) {
			echo '<li>';
			echo $tweet->text;
			echo '<div class="date">'.$tweet->created_at.'</div>';
			echo '<div style="clear:both;"></div>';
			echo '</br>';
			echo '</li>';

		}
		echo '</ul>';
	}
}
