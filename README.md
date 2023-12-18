Afry Frontend Code Test. 
Built on ReactJS 

Instructions English

Develop a simple web application / webpage with at least the three views described below. Choose what framework and/or techniques that you find suitable for the task, unless we specifically ask you to use a certain framework. The focus should be to choose a reasonably modern framework/technique and show that you know this well and structure your code with an architecture that is easy to follow.

The web app shall keep all data in some kind of database (you can choose a suitable type, and everything from local storage to conventional database or web service will do). This storage shall make it possible to restart/reload your web app/page without losing information.

For us to run a test your code it, along with any dependencies, shall be installed and started through npm or similar without requiring other globally installed software. We prefer you to send the code to us using a link to your code on GitHub or equivalent, rather than having it sent to us in a .zip-file or similar.

View 1:

Here the user can create a person. A person has a name and can be associated with a company (companies are created in view 2).

View 2:

Here the user can create a company. A company should only have "names" as attributes. Here the user should also be able to choose a company and then get all employees listed. In that listing, it should also be possible to remove an employee from the company. Then, the employee should no longer be associated with the company, but the person should remain in the system without any connection to any company (as if you created a person in view 1 without choosing a company).

View 3:

Here is a list of all people who are not linked to companies and have the opportunity to link them to one of the companies created in view 2.