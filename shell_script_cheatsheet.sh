#!/bin/bash
# ========== This is a comprehensive guide/cheatsheet for Shell Script ==========

# ===== Keywords =====
if          # Start a conditional block
then        # Follow up for 'if', 'elif', or 'case'
else        # Alternative block if the 'if' condition fails
elif        # Else if, additional conditional block
fi          # End an 'if', 'elif', 'else' block
for         # Start a for loop
in          # Specify the list in a for loop
while       # Start a while loop
until       # Start an until loop, opposite of while
do          # Start the block of a loop or conditional
done        # End the block of a loop or conditional
case        # Start a case statement
esac        # End a case statement
function    # Define a function
return      # Return a value from a function
break       # Exit from a loop
continue    # Skip to the next iteration of a loop
echo        # Print a message to the console
exit        # Exit the script with a status code

# ===== Logical Operators =====
&&          # Logical AND, execute the next command if the previous one succeeds
||          # Logical OR, execute the next command if the previous one fails
!           # Logical NOT, invert the exit status of a command

# ===== Comparison Operators =====
-eq         # Equal to (used in arithmetic comparisons)
-ne         # Not equal to (used in arithmetic comparisons)
-gt         # Greater than (used in arithmetic comparisons)
-ge         # Greater than or equal to (used in arithmetic comparisons)
-lt         # Less than (used in arithmetic comparisons)
-le         # Less than or equal to (used in arithmetic comparisons)
=           # String comparison, equal
!=          # String comparison, not equal
<           # String comparison, less than (use with [[ ]])
>           # String comparison, greater than (use with [[ ]])

# ===== File Test Operators =====
-e          # Check if file exists
-f          # Check if file is a regular file
-d          # Check if file is a directory
-r          # Check if file is readable
-w          # Check if file is writable
-x          # Check if file is executable
-s          # Check if file is not empty
-h          # Check if file is a symbolic link
-c          # Check if file is a character special file
-b          # Check if file is a block special file

# ===== Variables =====
$#          # Number of positional parameters
$0          # Name of the script
$1, $2, ... # Positional parameters
$@          # All positional parameters as separate words
$*          # All positional parameters as a single word
$?          # Exit status of the last command executed
$$          # Process ID of the current shell
$!          # Process ID of the last background command
$-          # Current options set for the shell
$_          # Last argument of the previous command

# ===== Common Concepts =====
# Variable assignment
VAR=value   # Assign value to VAR
echo $VAR   # Print the value of VAR

# Arrays
array=(val1 val2 val3)  # Define an array
echo ${array[0]}        # Access the first element of the array
echo ${array[@]}        # Access all elements of the array

# Functions
my_function() {
    echo "This is a function"
}
my_function              # Call the function

# Command substitution
result=$(command)        # Assign the output of a command to a variable
result=`command`         # Another syntax for command substitution

# Arithmetic operations
result=$((3 + 4))        # Perform arithmetic operations
let result=3+4           # Another way to perform arithmetic operations

# Input/Output Redirection
command > file           # Redirect output to a file
command < file           # Redirect input from a file
command >> file          # Append output to a file
command 2> file          # Redirect standard error to a file
command > file 2>&1      # Redirect both stdout and stderr to a file
command | another_command # Pipe the output of one command to another

# String operations
str="Hello"
str+=" World"            # Concatenate strings
echo $str                # Print concatenated string

# Conditional execution
[ condition ] && echo "True"  # Execute echo if condition is true
[ condition ] || echo "False" # Execute echo if condition is false

# Loops
for i in {1..5}; do
    echo $i
done

while [ condition ]; do
    echo "Looping"
done

until [ condition ]; do
    echo "Looping"
done

# Here documents
cat << EOF
This is a
multi-line string
EOF

# Here strings
cat <<< "This is a string"

# Exit codes
exit 0                    # Exit with status 0 (success)
exit 1                    # Exit with status 1 (failure)

# ===== Miscellaneous =====
# Source another script
. ./script.sh             # Source script.sh (alternative syntax)
source ./script.sh        # Source script.sh

# Background jobs
command &                 # Run command in the background
wait                      # Wait for all background jobs to finish

# Subshells
(command1; command2)      # Run commands in a subshell

# Debugging
set -x                    # Enable debugging
set +x                    # Disable debugging

# Script arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -f|--file)
            FILE="$2"
            shift
            shift
            ;;
        -v|--verbose)
            VERBOSE=1
            shift
            ;;
        *)
            echo "Unknown option $1"
            exit 1
            ;;
    esac
done

# Set the node NODE_ENV variable to "production" permanently if not already set
! [ -n "$NODE_ENV" ] && test -f ~/.bashrc && echo 'export NODE_ENV=production' >> ~/.bashrc && source ~/.bashrc
! [ -n "$NODE_ENV" ] && test -f ~/.zshrc && echo 'export NODE_ENV=production' >> ~/.zshrc && source ~/.zshrc

# Set the node NODE_ENV variable to "production" permanently if not already set
if [ -n "$NODE_ENV" ]; then
    echo "Variable is already set to '$NODE_ENV'"
else
    test -f ~/.bashrc && echo 'export NODE_ENV=production' >> ~/.bashrc && source ~/.bashrc
    test -f ~/.zshrc && echo 'export NODE_ENV=production' >> ~/.zshrc && source ~/.zshrc
    echo "Variable is now set to '$NODE_ENV'"
fi