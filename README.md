# JC Consulting

# Capstone Documents
http://tamdang-portfolio.herokuapp.com/capstone

# Steps for running app
1. Run 'npm install'
2. Run 'npm start' for starting app

# Front-end
Create front-end components in src/ folder

# Git Instructions
# Before coding
1. git checkout master
2. git pull

# Coding
3. git branch [branch_name]
4. git checkout [branch_name]

# Commit
5. git status
6. git add [relative_path_of_what_you_change]
7. git commit -m "your_message_here"
8. git push

# After coding
9. Go to repo, click "compare/new request" 
10. Write preview what your changes
11. Assign s.o for checking


**********************************************************************************************************************************

#About the structure:
# Folder: Front-end: 
      Components:                  
      Services:
      Test:                  
      Validators:
      
  All folders will have 5 folders:   
  admin / client  /main / candidate  /jc
          
# Folder: Back-end:
        Models
        Router
   All folders will have 5 folders:   
  admin / client  /main / candidate  /jc
          
        config -> database connection
        
# Names:
    - Folder / Components:
            new_folder
                  Ex:
                  - admin_homepage
                  - client_job_list
                  - jc_homepage
      
   -  Variables:
            aaaAaaa 
# Comments:
  Don't forget to comment the code
  
  Don't create componets with the same name, even if it is inb different folder (Confilct in app.module.ts)
  
  Don't push a code if it is not running
  
  # Testing email verification"
  In case anyone gets to this part and want to test email verification. For some reason, all the mail host limit number of emails
  can be sent. So after a few emails, you will be blocked from the host for like 15 minutes.
      Go to Ethereal.mail:
      
      Go to JC back-end -> user.js -> { 
            in the sendEmail session, there will be fake email and password, use that to login onto ethereal.mail.
            That site will contain your verification email regardess of the receiver is real or fake
      }
  
          
        
          
      
