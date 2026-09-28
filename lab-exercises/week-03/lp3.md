# Laboratory practice 3

## Task 1 - Logical Network Design in Cisco Packet Tracer

### Objective:
Your task is to design and configure a network based on the provided topology using Cisco Packet Tracer. You will apply **VLSM (Variable Length Subnet Masking)** to create an efficient addressing scheme and configure **static routing** to ensure full communication between all devices in the network.

### Network Requirements:
- Network assigned by ISP: 172.21.128.0/17
- Subnets to be created:
  - Network N1 – 60 PCs
  - Network N2 – 12 PCs
  - Network N3 – 5000 PCs
  - Network N4 – 2046 PCs

### Addressing Rules
1. Use **VLSM** to minimize address waste.
2. **Router** Ethernet interfaces must always have the **first valid address** in the subnet.
3. The addresses of serial interfaces are always the **first two valid addresses** in the given subnet.
   - Router R1 always uses the lower IP address, and R2 uses the next higher one.
4. PCs are assigned as follows:
   - PC1 → 2nd valid address in its subnet
   - PC2 → 4th valid address in its subnet
   - PC3 → 255th valid address in its subnet
   - PC4 → 257th valid address in its subnet

### Practical Steps
1. **Plan the subnetting:**
   - Use VLSM to divide 172.21.128.0/17 into subnets based on the given host requirements.
   - Clearly document each subnet’s network address, mask, and usable IP range.
2. **Build the topology** in Packet Tracer according to the given topology in [Figure1](#figure1):
   - Use Ethernet connections between routers and PCs/switches.
   - Use a serial connection between routers.
3. **Assign IP addresses** to all devices according to your addressing plan.
4. **Configure static routing** on all routers so that every device in the network can communicate with every other device.
5. **Verify connectivity using** the ping command between all PCs.


## Topology
<figure id="figure1" style="text-align: center;">
  <img src="./lp3-topology.png" alt="Topology">
  <figcaption>Figure 1: Topology</figcaption>
</figure>

## 🧮 VLSM Subnet Planning Table

| **Network** | **Hosts Needed** | **Subnet Mask (/Prefix Length)** | **Subnet Mask (Decimal)** | **Network Address** | **Usable IP Range** | **Broadcast Address** | **Router Interface IP** | **PC IPs** |
|--------------|------------------|--------------------------|----------------------------|---------------------|---------------------|------------------------|-------------------------|-------------|
| N1 | | | | | | | | |
| N2 | | | | | | | | |
| N3 | | | | | | | | |
| N4 | | | | | | | | |
| N5 | | | | | | | | |

## Task 2

Now, we will investigate ARP protocol. Follow the instructions:

1. Open [lp3-arp.pkt](./lp3-arp.pkt) file and configure PC1-PC4.
   
    PC1:
    - IPv4 Address: 192.168.0.1 and Subnet Mask: 255.255.255.0

    PC2:
    - IPv4 Address: 192.168.0.2 and Subnet Mask: 255.255.255.0

    PC3:
    - IPv4 Address: 192.168.0.3 and Subnet Mask: 255.255.255.0

    PC4:
    - IPv4 Address: 192.168.0.4 and Subnet Mask: 255.255.255.0
  
2. Switch to **simulation mode** in PT.
3. Disable all filters (Show All/None) and enable filters for **ARP** and **ICMP** (Edit Filters).
4. Check arp table on PCes.
   ```console
   C:\> arp -a
   ```
   Are tables empty?
5. Check mac tables on switches.
   ```console
    SW> enable
    SW# show mac-address-table
   ```
   Are tables empty?
6. Clear mac tables on switches.
   ```console
    SW# clear mac-address-table
   ```
   Finally, make sure that tables are empty
7. Add a Simple PDU from PC1 to PC4 to simulate a real PING between the PCs.
8. Click on Play Simulation and follow the network traffic.
   
   a) Which devices received the first message from PC1?

   b) What information did this message contain (ARP Request)?
   
   c) What was the path of PC4’s response to PC1 for the first message?

   d) Which MAC tables on the switches were updated after the communication? What new records were added?

   e) Which ARP tables on the devices were updated? What new records were added?

   f) What was the path of the ICMP (PING) message from PC1 to PC4?
9. Try the same experiment with different devices.