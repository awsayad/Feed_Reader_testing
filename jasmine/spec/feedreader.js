/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('RSS are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*This is our second test, it loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined', function () {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* This is our third test, it loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name defined', function () {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /* This is our second test suite, this test suite will check the menu
     * elements and properties
     */
    describe('The Menue', function () {

        /* This test ensures the menu element is
         * hidden by default.
         */
        it('menu element hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);

        })

        /* this test ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('menu visibility', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })
    })

    /* This is our third test suite named "Initial Entries".
     * This test will check the loadFeed function
     */
    describe('Initial Entries', function () {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            })
        });

        it('feed container has at least single entry', function () {
            expect($('.feed .entry ').length).not.toBe(0);
        })
    })

    /* This is our fourth test suite named "New Feed Selection" 
     * It will test the feed of the loadFeed function.
     */
    describe('New Feed Selection', function () {
        var oldFeed;

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                oldFeed = $('.feed').html();
                loadFeed(1, done);
            });
        });
        it('is different from old', function () {
            expect($('.feed').html()).not.toBe(oldFeed);
        });
    });

}());