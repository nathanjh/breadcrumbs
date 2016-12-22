Breadcrumbs
===========

Adds the ability to seek through the change history for a file using a video playback-like scrubber UI. This core abstraction is then used to power a system for writing and watching code tutorials within one’s editor, with support for the student to “branch off” of an otherwise linear tutorial. Change histories for an Atom buffer are encoded as diffs in a metadata file, which can be shared between developers. Includes an annotation UI for adding comments to the timeline of code tutorials which appear when you watch that change (like YouTube’s video comments).

### Install

-	Install [Atom.](atom.io)
-	Install [breadcrumbs.](https://atom.io/packages/breadcrumbs)

### Features

**Live coding mode:**

-	Toggle record mode and save all changes

-	Press record at any point in the coding process to capture all the changes made to the file.

**Tutorial mode:**

-	Using a pre-built tutorial, scroll through to see the code unfold before your eyes.

-	As you scroll through the timeline, code and comments will appear on the screen.

-	Use built in git checkout features to create a separate timeline and play with the code in your own editor and environment. If you make a change that you wish to save, commit them to your chosen branch to view later.

**Teacher mode:**

-	Start with a new named file and press record. When done with the live code session, toggle record off.

-	To add comments at points in the code, after the recording session, just rewind the code and click the pencil icon to enter a comment at each point you feel needed and they will be tagged, and popup when in tutorial playback mode.

-	Comments are in development so delete in the comment window = 'ctrl'+'delete'...we know that sucks, but it works for the first release and will be first fix on the list.

**Future Features:**

-	Comments box delete fix with inline comment tool-tip style additions.

-	Full playback mode with a true time line.

-	Audio playback and recording while coding tied to the time line bar.

-	Better styling of the bar, and all package items.

-	Issue a feature request or bug fix and we will do our best to get that resolved.

---

The Crumbs
----------

-	[**Alex Carroll**](https://github.com/lexac1)
-	[**Jay Tsukano**](https://github.com/jtsukano)
-	[**Justin Dizon**](https://github.com/grandtheft-spaceship)
-	[**Nathan Herrera**](https://github.com/nathanjh)

License
-------

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

Acknowledgments
---------------

-	Mark Hahn - *The voice of reason in the forums.*
-	Ben Booth - *Inspired by his persistent-undo package.*
-	Long Tran - *Original Dev Team member and time-travel researcher...you were missed.*
