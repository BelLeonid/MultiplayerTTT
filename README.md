# MultiplayerTTT
Multiplayer TTT (local)

I used gameState to control various parameters about the state of the game - ids of connected players, currently active player, is the game started or over, etc.
I used board to represent the TTT board

Gameserver uses socketio to inform the players about the changes in game state. 
As of moment of writing the README file, checks of possible turns were only made clientside, but they should also be done clientside for security reasons, but I'm running out of time (Though I'll try to implement them later)

Server waits until 2 players connect, then first player to connect goes first. As soon as he makes his turn, server makes changes to the board and gamestate and alerts all the players that the turn was made, and players update their html board accordingly. Also, after the turn is made server checks if the game is over due to draw or victory. If it so happens, it sends an according event, and html board informs each respective player if they won or lost, or if it was a draw. 

Since I basically made a simple 3x3 field, I did some simple checks for rows, columns, diagonal and antidiagonal, and checking function takes into consideration last turn of the player - it will look for diagonal win only if last turn was on a diagonal.

Perhaps that algorithm (as well as the whole game setup) could be upgraded to allow for a bigger fields, but again, time constraints.

So the basic event loop is connection -> (waiting until 2 connections) -> start event -> turns until victory or draw.

To start the game:
Run npm i to install packages
go to backend and execute node index.js
go to frontend and open index.html file twice (hotseat TTT, yay)
