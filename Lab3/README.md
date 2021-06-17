# CS110 Lab #3

> Authors:
> \<[Shana Tirtawidjaja](https://github.com/ShanaTi)\> > \<[Yonas Adamu](https://github.com/Yonas-A)\>

## Description

-   Using Fetch/GET method to fetch a data from a server and host it on local web page.

## External libraries used

[moment.js](https://momentjs.com) for formatting the displayed date
[jQuery](https://jquery.com) for setting up a custom click action for the x button on the search bar
[Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) for the navigation bar and header

## Features

-   Input Forms for search bar
-   Buttons
-   Checkbox

## Buttons:

-   Pause Feed & Resume feed:
-   -   Used to pause or resume the feed (if the feed is paused, the checkmark will appear)
-   Search:
-   -   A button to trigger search on a string that will display past and current tweets that contain the text the user enters
-
-   A clear button('X')
-   -   : clears search and shows the unfiltered feed

## Forms

-   Input form/ Search bar
-   -   used to take an input from user and the feed will

## How it works

-   When polling is on:
-   -   If a search string is typed on the search bar, it filters out tweets containing the keyword without the need to press the search button. The search will also include any new tweets containing the word
-   -   If you delete the search with backspace, it waits until the end of the 5 second interval to update the page
-   -   if you use the x button to clear the search, it will update automatically

-   When polling is off:
-   -   If a search string is typed, the user needs to press the search button to filter tweets containing the keyword
-   -   If you delete the words with backspace, it stays on the filtered tweets.
        The user must press the x button to go back to the full display of tweets
