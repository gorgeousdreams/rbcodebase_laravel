# RBCodebase on the Laravel PHP Framework

Documentation for the framework by @github/robertholf can be found on the [RBCodebase website](http://rbcodebase.com). :punch: :stuck_out_tongue_winking_eye:

## Features
The following is a status on requested features:

### System

- :black_large_square: Logs
	- :black_large_square: Email
- :black_large_square: Tests
	- :ballot_box_with_check: Send Email
	- :ballot_box_with_check: New User Registration
	- :ballot_box_with_check: New User Registration With Email Confirmation

### Marketing

#### Production
- :black_large_square: Landing
	- :black_large_square: Email capture
	- :black_large_square: Coming soon

#### Live
- :black_large_square: About Page
- :black_large_square: Team Page
- :black_large_square: Contact (Form) Page
- :black_large_square: Sales
	- :black_large_square: Testimonial CRUD
	- :black_large_square: Pricing CRUD
	- :black_large_square: Features CRUD
	- :black_large_square: FAQ CRUD
- :black_large_square: Blog
	- :black_large_square: Content Management/WYSIWYG
	- :black_large_square: Category CRUD/View
	- :black_large_square: Social Sharing
- :ballot_box_with_check: Language switcher
- :ballot_box_with_check: Custom Error Messages
- :black_large_square: HTML Sitemap
- :ballot_box_with_check: XML Sitemap
- :ballot_box_with_check: Privacy Policy
- :ballot_box_with_check: Terms of Use

### Actor

#### User
- :black_large_square: Authentication
	- :ballot_box_with_check: Registration
		- :ballot_box_with_check: Register via Email
		- :ballot_box_with_check: Register via Facebook (SSO)
		- :ballot_box_with_check: Register via Google+ (SSO)
		- :ballot_box_with_check: Register via Twitter (SSO)
		- :ballot_box_with_check: Register via LinkedIn (SSO)
		- :ballot_box_with_check: Register via GitHub (SSO)
		- :ballot_box_with_check: Confirm Email Address
		- :black_large_square: Redeem Registration Code
	- :ballot_box_with_check: Sign In
		- :ballot_box_with_check: Sign-in via Email
		- :ballot_box_with_check: Sign-in via Facebook (SSO)
		- :ballot_box_with_check: Sign-in via Google+ (SSO)
		- :ballot_box_with_check: Sign-in via Twitter (SSO)
		- :ballot_box_with_check: Sign-in via LinkedIn (SSO)
		- :ballot_box_with_check: Sign-in via GitHub (SSO)
		- :ballot_box_with_check: Password recovery/change via Email
		- :ballot_box_with_check: Redirect to intended
		- :ballot_box_with_check: Throttle Login Attempts
		- :ballot_box_with_check: Remember Token
		- :black_large_square: Two Factor Authentication
		- :ballot_box_with_check: Sign-on AS User (Administrative Feature)
	- :ballot_box_with_check: Logout
- :black_large_square: Profile Management
	- :ballot_box_with_check: Profile Overview
	- :ballot_box_with_check: Set Local Timezone
	- :ballot_box_with_check: Set Language Preference
	- :ballot_box_with_check: Change Password
	- :ballot_box_with_check: Change Email (settings)
	- :black_large_square: Change Email Preferences
	- :ballot_box_with_check: Custom User Types in Registration/Profile Update
	- :ballot_box_with_check: Custom Fields based on assigned Types
	- :ballot_box_with_check: Update Meta in Custom Fields
	- :ballot_box_with_check: Display Connected Social Providers
		- :ballot_box_with_check: View connected profiles
		- :ballot_box_with_check: Connect to Provider while authenticated
		- :ballot_box_with_check: Disconnect from Provider while authenticated
	- :ballot_box_with_check: Default to Gravitar as Profile Image
	- :black_large_square: Set Profile Image via Upload
	- :ballot_box_with_check: Set Profile Image via Social Network
	- :black_large_square: Upload Cover Image via Upload
	- :black_large_square: Delete Account
- :black_large_square: Billing
	- :black_large_square: Add cards to wallet
	- :black_large_square: Manage recurring subscriptions
	- :black_large_square: View Invoices
- :black_large_square: Notifications
	- :black_large_square: Email Notifications
	- :black_large_square: SMS Notifications
	- :black_large_square: Desktop Notifications
- :black_large_square: Public Profile
	- :black_large_square: Profile URL
	- :black_large_square: Display Followers
	- :black_large_square: Display Following
	- :black_large_square: Show Timeline
- :black_large_square: Platform Invites
	- :black_large_square: Invite from Email
	- :black_large_square: Invite from Gmail
	- :black_large_square: Invite from Facebook

#### Subscription Management
- :black_large_square: Plan Management
	- :black_large_square: See available plans
	- :black_large_square: Renew current plan
	- :black_large_square: Upgrade plan
	- :black_large_square: Prorate discount based on current plan remainder
	- :black_large_square: Apply discount
	- :black_large_square: Setup Recurring Payments
	- :black_large_square: Redeem Discount
	- :black_large_square: Make One Time Payment
- :black_large_square: Payment Profile
	- :black_large_square: Add Payment Method
	- :black_large_square: Remove Payment Method
	- :black_large_square: View Invoices
- :black_large_square: Payment History
	- :black_large_square: View previous payments
	- :black_large_square: Cancel recurring billing
- :black_large_square: Subscription Plan
	- :black_large_square: Pull rates & features from DB
	- :black_large_square: Payment overview page w/discount
	- :black_large_square: On return set as Subscriber group
	- :black_large_square: Accept Payment via PayPal
	- :black_large_square: Accept Payment via Stripe
	- :black_large_square: Show payment sucess & link to step 5
	- :black_large_square: Email receipt

### Brand/Project Setup
- :black_large_square: Profile Setup
	- :black_large_square: Create Brand (Title & Description)
	- :black_large_square: Set as Manager
- :black_large_square: Intake Questions
	- :black_large_square: Show question groups
	- :black_large_square: Show questions
	- :black_large_square: Show number of remaining questions
	- :black_large_square: Video intro

#### Brand

- :black_large_square: Brand Management
	- :black_large_square: Update brand information
	- :black_large_square: Upload Brand thumbnail
	- :black_large_square: Upload brand header image
	- :black_large_square: Change status to inactivate brand
	- :black_large_square: On update redirect with mesage
	- :black_large_square: Invite Team Member
- :black_large_square: Social Accounts
	- :black_large_square: Connect Profile as User
	- :black_large_square: Connect Profile as Page
	- :black_large_square: Disconnect Profile

#### Dashboard


### Administrative

- :black_large_square: Authentication
	- :black_large_square: User Groups & Permissions
		- :black_large_square: Manage System Groups
		- :black_large_square: Define System Group: Administrator
		- :black_large_square: Define System Group: Reseller
		- :black_large_square: Define System Group: Subscriber
		- :black_large_square: Define System Group: User
		- :black_large_square: Define Company Group: Manager
		- :black_large_square: Define Company Group: Employee
		- :black_large_square: Manage Indidivual Permissions
		- :black_large_square: Assign Individual Permissions in Group
	- :black_large_square: Users
		- :black_large_square: Create Users
		- :black_large_square: View User Info
		- :black_large_square: Update Users
		- :black_large_square: Delete Users
		- :black_large_square: Paginate Users Table
		- :black_large_square: Search Users
		- :black_large_square: Filter Users
		- :black_large_square: View User Groups
		- :black_large_square: View User Subscriptions
		- :black_large_square: View User Audit Logs
		- :black_large_square: Assign Permission System Groups to User
		- :black_large_square: Assign Permission Brand Groups to User
		- :black_large_square: Manage User Meta
		- :black_large_square: Set User Status
- :black_large_square: Messaging
	- :black_large_square: Internal Messaging
		- :black_large_square: Send Alert
		- :black_large_square: View Alert Statistics (Read)
		- :black_large_square: Expire alert on specified date
		- :black_large_square: Send Image in Alert
		- :black_large_square: Target Specific Group
		- :black_large_square: Specify target (Web, Mobile)
	- :black_large_square: External Messaging
		- :black_large_square: Email Templates
		- :black_large_square: Message Groups/Types
		- :black_large_square: Messages Composition
		- :black_large_square: Message Archives/Reporting
- :black_large_square: Subscription
	- :black_large_square: Plans
		- :black_large_square: Create Plan
		- :black_large_square: View Plan Details /Usage
		- :black_large_square: Update Plans
		- :black_large_square: Delete Plan
		- :black_large_square: View number of users in Plan
		- :black_large_square: Set Plan Duration
		- :black_large_square: Set Plan Usage Levels
		- :black_large_square: Restrict User Actions by Usage Levels
	- :black_large_square: Discount Codes
		- :black_large_square: Manage Discount Codes
		- :black_large_square: View expired codes
		- :black_large_square: Restrict codes to specific plan
		- :black_large_square: Set Expiration Dates
		- :black_large_square: Set Max Available
- :black_large_square: Reporting
	- :black_large_square: User Reporting
		- :black_large_square: Report by inactive users
	- :black_large_square: Subscriber Reporting
		- :black_large_square: View Sales by Plan
		- :black_large_square: Detail Application Usage
		- :black_large_square: Detail Last Login/Times Logged
		- :black_large_square: Track signups by Cohort
		- :black_large_square: Report average usage by Cohort
		- :black_large_square: Email subscriber based on criteria
		- :black_large_square: Report by likely upsell candidates
		- :black_large_square: Export ad hoc reporting
		- :black_large_square: Integrate ad hoc reporting groups to MailChimp

### API

Authentication
	Manage API Keys
	Meter Usage
	Authenticate Token


## Installation

```sh
$
```
