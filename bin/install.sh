#!/bin/sh

# Script to install the NodeSource Node.js 9.x and
# Markus
#
# Run as root or insert `sudo` before `sh`:
#
# curl -sSL https://raw.githubusercontent.com/sudo-dog/Markus/master/bin/install.sh | sudo sh -
#   or
# wget -qO- https://raw.githubusercontent.com/sudo-dog/Markus/master/bin/install.sh | sudo sh -
#

# Call function when failed
# Print url of github issue, exit program
fail()
{
    echo '[INFO] Go to https://github.com/sudo-dog/Markus for more information'

    # Exit program
    exit 0
}

# Install NodeJS
# Determin which os package manager is available, if any of them is available, install node withit
installNode()
{
    if command -v yum >/dev/null 2>&1; then
        echo '[INFO] Installing Node with yum'
        # Fetch source script
        curl --silent --location https://rpm.nodesource.com/setup_9.x | sudo bash -
        # Install nodeJS
        sudo yum -y install nodejs
        # Install install build tools
        echo '[INFO] Installing build tools with yum'
        sudo yum install gcc-c++ make
    elif command -v apt-get >/dev/null 2>&1; then
        echo '[INFO] Installing Node with apt-get'
        # Fetch source script
        curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
        # Install nodeJS
        sudo apt-get install -y nodejs
        # Install install build tools
        echo '[INFO] Installing build tools with apt-get'
        sudo apt-get install -y build-essential
    elif command -v pacman >/dev/null 2>&1; then
        echo '[INFO] Installing Node with pacman'
        # Install nodeJS
        pacman -S nodejs npm
    elif command -v pkg >/dev/null 2>&1; then
        echo '[INFO] Installing Node with pkg'
        # Install nodeJS 
        pkg install nodejs-current
    else 
        echo '[ERR!] No exists package manager'
        # Echo failed message and quit
        fail
    fi
}

# Install Markus
installMarkus()
{
    echo '[INFO] Installing Markus with git'

    # Cloning Markus
    git clone https://github.com/sudodotdog/Markus.git markus
    cd markus

    # Install dependences
    git checkout tags/3.5.7
    make install

    # Build
    make build
    echo ''
    echo '[INFO] Run "dist/script/service/markus.js"'
}

# Install git
installGit()
{
    if command -v git >/dev/null 2>&1; then
        echo '[INFO] Git is already installed'
    else
        echo '[INFO] Installing git'
        apt-get install git
        sudo apt-get install python-software-properties
        sudo apt-get install software-properties-common 
        # double check git is installed
        if command -v git >/dev/null 2>&1; then
            echo '[INFO] Git Installed'
        else
            echo '[ERR!] Git Install Failed'
            # Echo failed message and quit
            fail
        fi
    fi
}

# Determine if nodeJS and npm environment is exist
# Install Markus by npm after install or determinee
if command -v node >/dev/null 2>&1; then
    # if node is exist, try if npm is exist
    if command -v npm >/dev/null 2>&1; then
        # if npm exist, skip and install Markus
    else 
        # if npm in not exist, node js is not installed successfully
        installNode
    fi

    # if git is exist, try if git is exist
    if command -v git >/dev/null 2>&1; then
        # if git exist, skip and install Markus
    else 
        # if git in not exist, install it
        installGit
    fi
    
    installMarkus
else 
    installNode
    installMarkus
fi

echo '[INFO] Completed'
