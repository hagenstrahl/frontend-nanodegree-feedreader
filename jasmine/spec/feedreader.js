/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* test suite named "RSS Feeds" */
    describe('RSS Feeds', function () {
        /* it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('their URLs are defined', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('their names are defined', function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* test suite named "The menu" */
    describe('The menu', function () {
        let body;

        beforeEach(function () {
            body = document.querySelector('body');
        });

        /* test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function () {
            expect(body.classList.contains('menu-hidden')).toBeTruthy();
        });

        /* test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('is visible when clicked and hidden when clicked again', function () {
            const menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).not.toBeTruthy();
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBeTruthy();
        });
    });

    /* test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('at least one entry is loaded', function (done) {
            const feedEntries = document.querySelectorAll('.feed .entry');
            expect(feedEntries.length > 0).toBeTruthy();
            done();
        });
    });

    /* test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        let firstFeed, secondFeed;

        /* load first feed and save the content in firstFeed variabel.
         * Then load the secound feed and save the content in secondFeed variable.
         */
        beforeEach(function (done) {
            loadFeed(0, async function () {
                firstFeed = await document.querySelector('.feed').innerHTML;
                loadFeed(1, async function () {
                    secondFeed = await document.querySelector('.feed').innerHTML;
                    done();
                });
            })

        });

        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('content changes when a new feed is loaded', function (done) {
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });
    });
}());
