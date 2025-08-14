# Robot Frontend

## How to Run

1. **Edit `docker-compose.yml`:**  
   Ensure the `docker-compose.yml` file points to the correct Dockerfiles for both the frontend and backend. Update the `build.context` and `dockerfile` paths as needed.

2. **Start the Application:**  
   Run the following command to build and start all services:

    ```sh
    docker compose -p deptron -f ./path/to/docker/compose/docker-compose.yml up -d --build
    ```

3. **Access the Frontend:**  
   Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Features

- **MQTT Client Connection Notifications:**  
  Toast notifications will appear at the bottom-right of the screen whenever an MQTT client connects or disconnects from the broker. The runtime will automatically start on connect and reset on disconnect.

- **Console Output:**  
  Check logs and outputs using Docker Desktop for troubleshooting and monitoring. Every significant actions is announced to user via whether console output or toast or docker console output.

## Command System

All commands are sent to the MQTT client via the `broker/commands` topic. Possible string outputs through this topic are:

- `Forward`
- `Backward`
- `Left`
- `Right`
- `Pause`
- `Stop`
- `Release`
- `Take`
- `Charge`
- The **Başlat** button sends the `Forward` command to the MQTT client.
- The **Durdur** button sends the `Stop` command to the MQTT client.

## Important Notes

- **Mosquitto is NOT used.**  
  Use the provided Python scripts for MQTT functionality instead.

- **Speed and Charge Updates:**
    - Send speed to the MQTT topic `client/speed`. (in unit of meter/second)
    - Send charge percentage to the MQTT topic `client/charge`.  
      The backend will automatically forward these values to the frontend. Values must be numbers or strings.

---

## Command List

The following commands are available and can be sent to the robot:

- **Forward**: Move the robot forward.
- **Backward**: Move the robot backward.
- **Left**: Turn the robot left.
- **Right**: Turn the robot right.
- **Pause**: Pause the robot's movement.
- **Stop**: Stop the robot.
- **Release**: Release the robot (custom action).
- **Take**: Take action (custom action).
- **Charge**: Start charging.

You can add commands using the UI dialog, and remove them as needed. Use the "Başlat" button to send the `Forward` command, and the "Durdur" button to send the `Stop` command.

---
