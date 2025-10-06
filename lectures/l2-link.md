---
theme: default
class: text-center
highlighter: shiki
lineNumbers: true
info: "Computer and Communication Networks: Link"
drawings:
  persist: false
fonts:
  mono: Fira Mono
layout: cover
title: 'Computer and Communication Networks: Link'
---

# Computer and Communication Networks : Link

Lecture 2

---
layout: default
---

# Content overview

- Link Layer
- Ethernet
- Header analysis across layers
- ARP: Connecting Layers 2 and 3
- Network Performance Parameters
- Ethernet Switch

---
layout: section
---

# Link Layer

---
layout: three-slots
---

# Link Layer: introduction

::left::

- nodes -> hosts, routers
- links -> communication channels that connect adjacent nodes along communication path
    - wired , wireless 
    - LANs

- layer-2 packet -> frame, encapsulates datagram
  
**Link Layer has responsibility of transferring datagram from one node to physically adjacent node over a link.**

::right::
 
<img src="./images/l2-services1.png" class="pr-10 h-105 float-right" />

---
layout: three-slots
---

# Link Layer: services

::left::
<v-click>

- **framing, link access:**
  - encapsulate datagram into frame, adding header, trailer
  - channel access if shared medium
  - “MAC” addresses in frame headers identify source, destination (different from IP address!)
</v-click>
<v-click>

- **reliable delivery between adjacent nodes:**
  - we revisit this again in the Transport Topic
  - seldom used on low bit-error link (fiber, some twisted pair)
  - wireless links: high error rates
</v-click>

::right::
 
<img src="./images/l2-services2.png" class="pr-10 h-100 float-right" />

---
layout: three-slots
---

# Link Layer: services

::left::
<v-click>

- **flow control:**
  - pacing between adjacent sending and receiving nodes
</v-click>
<v-click>

- **error detection:**
  - errors caused by signal attenuation, noise
  - receiver detects errors, signals retransmission, or drops frame
</v-click>  
<v-click>

- **error correction:**
  - receiver identifies and corrects bit error(s) without retransmission
</v-click>
<v-click>

- **half-duplex and full-duplex:**
  - with half duplex, nodes at both ends of link can transmit, but not at same time
</v-click>
::right::
 
<img src="./images/l2-services2.png" class="pr-10 h-100 float-right" />

<!--
Error detection in the link layer is usually more sophisticated and is implemented in hardware. Error correction is similar to error detection, except that a receiver not only detects when bit errors have occurred in the frame but also deter- mines exactly where in the frame the errors have occurred (and then corrects these errors). 
-->
---
layout: three-slots
---

# Host link-layer implementation

::left::

- in each-and-every host
- link layer implemented on-chip or in network interface card (NIC) 
  - implements link, physical layer
- attaches into host’s system buses
- combination of hardware, software, firmware

::right::

<img src="./images/l2-interface.png" class="pr-10 h-100 float-right" />

<!--
The Ethernet capabilities are either integrated into the motherboard chipset or implemented via a low-cost dedicated Ethernet chip. For the most part, the link layer is implemented on a chip called the network adapter, also sometimes known as a network interface controller (NIC). The network adapter implements many link layer services including framing, link access, error detection, and so on. Thus, much of a link-layer controller’s functionality is implemented in hardware. For example, Intel’s 700 series adapters [Intel 2020] implements the Ethernet protocols; the Atheros AR5006 [Atheros 2020] controller implements the 802.11 WiFi protocols. 

Figure shows that while most of the link layer is implemented in hardware, part of the link layer is implemented in software that runs on the host’s CPU. The software components of the link layer implement higher-level link-layer functionality such as assembling link-layer addressing information and activating the controller hardware. On the receiving side, link-layer software responds to con- troller interrupts (for example, due to the receipt of one or more frames), handling error conditions and passing a datagram up to the network layer. Thus, the link layer is a combination of hardware and software.
-->
---
layout: three-slots
---

# Interfaces communicating

<div class="relative h-60">
    <img v-click src="./images/l2-interface-comunicating.png" class="absolute top-0 right-0 w-full h-full object-contain rounded-xl"/>
    <div v-click class="absolute bottom-40 left-10 flex items-center gap-2 text-green-600 text-lg font-semibold">
        <span>&darr; |packet|</span>
    </div>
    <div v-click class="absolute bottom-20 left-5 flex items-center gap-2 text-green-600 text-lg font-semibold">
        <span>&darr; |H<sub>l</sub>|packet|</span>
    </div>
    <div v-click class="absolute top-57 left-90 flex items-center gap-2 text-green-600 text-lg font-semibold">
        <span>|H<sub>l</sub>|packet| &rarr;</span>
    </div>
    <div v-click class="absolute bottom-20 left-180 flex items-center gap-2 text-green-600 text-lg font-semibold">
        <span>|packet| &uarr;</span>
    </div>
</div>

::left::

sending side:
- encapsulates packet in frame
- adds error checking bits, reliable data transfer, flow control, etc.

::right::

receiving side:
- looks for errors, reliable data transfer, flow control, etc.
- extracts packet, passes to upper layer at receiving side

---
layout: three-slots
---

# Network addressing

- **Port** -> directs the data to the specific application or service on that device (more in lecture 4).
- **IP address** -> routes data across networks to reach the correct device (more in lecture 3).
- **MAC address** -> handles communication within a local network by identifying physical devices.

<img src="./images/l2-network-addressing.png" class="pt-10 h-60" />

---

# MAC addresses

- each interface has unique 48-bit MAC address
- e.g.: 1A-2F-BB-76-09-AD (hexadecimal (base 16) notation (each “numeral” - [0..9, A..F] represents 4 bits)), on figure you can see MAC address

<img src="./images/l2-mac.png" class="pr-50 h-75 float-right" />

---

# MAC addresses

- MAC (or LAN or physical or Ethernet) address: 
  - function: **used “locally” to get frame from one interface to another physically-connected interface (same subnet, in IP-addressing sense)**
  - 48-bit MAC address (for most LANs) burned in NIC ROM, also sometimes software settable
- MAC address allocation administered by IEEE
- manufacturer buys portion of MAC address space (to assure uniqueness)
- analogy:
  - MAC address: like birth number
  - IP address: like postal address
- MAC flat address: portability 
  - can move interface from one LAN to another
  - recall IP address not portable: depends on IP subnet to which node is attached
---

# Multiple access links

So far, we've assumed that every link connects exactly two machines. In reality, a single wire can connect multiple computers.

<v-click>
Two types of “links”:
</v-click>
<v-click>

- **point-to-point**
  - point-to-point link between Ethernet switch and host
</v-click>
<v-click>

- **broadcast (shared wire or medium)**
  - old-school Ethernet, upstream HFC in cable-based access network, 802.11 wireless LAN, 5G, satellite
</v-click>
<v-click>
<img src="./images/l2-multiple-access-links.png" class="pr-0 h-50 float-right" />
</v-click>
--- 

# Shared Media

Many machines using the same wire (single shared broadcast channel):
- If multiple machines transmit at the same time, signals will interfere or collide.
- Analogy: People talking simultaneously on a group call.

<v-click>

Who determines when a node can transmit?
</v-click>
<v-click>

**Multiple Access protocol (distributed algorithm)**
</v-click>
<v-click>

*Note: More on multiple access protocols in a later lecture.*
</v-click>

<div class="flex justify-center">
    <img src="./images/l2-shared-medium.png" class="pt-5 h-40" />
</div>

---
layout: section
---

# Ethernet

---

# Ethernet

- as the first widely adopted technology for Local Area Networks (LANs), remains the dominant standard today
- simpler, cheap
- kept up with speed race: 10 Mbps – 400 Gbps 
- single chip solutions support multiple speeds (e.g., Broadcom  BCM5761)
- machines in the same LAN can exchange messages directly at Layer 2
  - no need for IPs, routers, forwarding, etc.
  - analogy: If we're in the same room, we can talk without using the postal system.
---
layout: three-slots
---

# Ethernet: physical topology

::left::
- **bus:** popular through mid 90s
  - all nodes in same collision domain (can collide with each other)
- **star(switched):** prevails today
  - active link-layer 2 switch in center
  - each “spoke” runs a (separate) Ethernet protocol (nodes do not collide with each other)
- **ring**
- **tree**

::right::
<img src="./images/l2-physical-topology1.png" class="pr-25 h-105 float-right" />
--- 

# Ethernet: types of LAN communication

Ethernet supports three types of communication:
- **Unicast:** Send a packet to a single recipient.
- **Broadcast:** Send a packet to everyone on the local network.
- **Multicast:** Send a packet to everyone in a specific group.
  - Machines in the local network can join groups.

<img src="./images/l2-types-lan.png" class="pt-5 h-55 float-right" />
---

# Ethernet frame structure

(Field Lenght in Bytes)

<img src="./images/l2-frame-format.png" class="pb-5 h-20 float-right" />

<v-click>

- **preamble** -> used to synchronize receiver, sender clock rates
  - 7 bytes of 10101010 followed by one byte of 10101011 (SFD)
</v-click>
<v-click>

- **SFD** -> start frame delimiter
</v-click>
<v-click>

- **destination MAC** -> 6 bytes destination MAC address
  - if adapter receives frame with matching destination address, or with broadcast address (e.g., ARP packet), it passes data in frame to network layer protocol
  - otherwise, adapter discards frame
</v-click>
<v-click>

- **source MAC** -> 6 bytes source MAC address
</v-click>
---

# Ethernet frame structure

<img src="./images/l2-frame-format.png" class="pb-5 h-20 float-right" />

<v-click>

- **type/length** -> 2 bytes that determine whether it is an IEEE 802.3 or Ethernet II frame
  - **type** -> indicates the higher-layer protocol (used in Ethernet II)
  - **length** -> specifies the length of the payload (used in IEEE 802.3)
</v-click>
<v-click>

- **Payload** -> data
</v-click>
<v-click>

- **FCS** ->  Frame Check Sequence is a 4-octet (32-bit) cyclic redundancy check (CRC) that allows the receiver to detect corrupted data within the entire frame
</v-click>

---

# Ethernet: unreliable, connectionless

- **connectionless:** no handshaking between sending and receiving NICs

- **unreliable:** receiving NIC doesn’t send ACKs or NAKs to sending NIC
  - data in dropped frames recovered only if initial sender uses higher layer rdt (e.g., TCP), otherwise dropped data lost
---

# Ethernet: Receiver activity diagram

```mermaid
%%{init: {"look": "handDrawn", "theme": "default", "themeVariables": { "fontSize": "24px" }}}%%
flowchart LR
    A(["Start"]) --> B["Idle"]
    B --> C{"Is carrier present?"}
    C -- Yes --> D["Set status: Carrier present"]
    D --> E["Bit synchronization and wait for SFD"]
    E --> F{"Are FCS and frame length correct?"}
    F -- No --> B
    F -- Yes --> G{Does the destination MAC address match my device?}
    G -- No --> B
    G -- Yes --> H[Pass frame to upper layer]
    H --> B
```
---

# Ethernet: Transmitter activity diagram

```mermaid
%%{init: {"look": "handDrawn", "theme": "default", "themeVariables": { "fontSize": "24px" }}}%%
flowchart LR
    A(["Start"]) --> B["Wait for packet from upper layer and build frame"]
    B --> C{"Is carrier present?"}
    C -- Yes --> D["Wait for free channel"]
    D --> E["Wait Interframe Gap"]
    E --> C
    C -- No --> F["Transmit frame"]
    F --> G{"Collision detected?"}
    G -- Yes --> J["Send jam sequence and increment retransmission counter"]
    H --> B
    G -- No --> H["Send frame and set status: Transmission finished"]
    J --> K["Generate back-off time"]
    K --> L{"Reached retransmission counter limit?"}
    L -- Yes --> M["Set status: Retransmission limit exceeded"]
    M --> B
    L -- No --> N["Wait Interframe Gap"]
    N --> O["Wait/Decrement back-off time"]
    O --> C
```
---

# 802.3 Ethernet standards: link & physical layers

- many different Ethernet standards
  - common MAC protocol and frame format
    - MAC protocol is CSMA/CD for shared/hub-based Ethernet
    - Modern switched full-duplex Ethernet still uses the same MAC addressing and frame format, but CSMA/CD is not needed
  - different speeds: 10 Mbps, ... 100 Mbps, 1Gbps, 10 Gbps, 40 Gbps, 100 Gbps, 400 Gbps (and beyond).
    - different physical layer media: fiber, cable

<img src="./images/l2-802.3-standards.png" class="pr-10 h-50 float-right" />

<!--
This is an international standard for Local and Metropolitan Area Networks (LANs and MANs), employing
CSMA/CD as the shared media access method and the IEEE 802.3 (Ethernet) protocol and frame format for
data communication. This international standard is intended to encompass several media types and
techniques for a variety of MAC data rates. 802.3 defines MAC protocol and format of frames.
On the same 802.3 physical layer, two types of frames can exists: 802.3 + LLC and Ethernet II.
-->
---

#  Ethernet frame types

<img src="./images/l2-frames.png" class="h-100 float-right" />

---
layout: section
---

# Header analysis across layers

---

# Network addressing

- **Port** -> directs the data to the specific application or service on that device (more in lecture 4).
- **IP address** -> routes data across networks to reach the correct device (more in lecture 3).
- **MAC address** -> handles communication within a local network by identifying physical devices.

<img src="./images/l2-network-addressing.png" class="pt-10 h-60" />

---
layout: three-slots
---

# Header Layer 2

<v-click>
<img src="./images/l2-example-packet.png" class="h-25 pr-30 w-180 float-right" />
</v-click>

::left::

<v-click>

Destination MAC Address: **00:02:cf:ab:a2:4c**
<div class="border-2 border-red-500 w-[190px] h-[20px] absolute top-22.5 left-69"></div>
</v-click>
<v-click>

Source MAC Address: **b4:b5:2f:74:cb:ae**
<div class="border-2 border-red-500 w-[200px] h-[20px] absolute top-22.5 left-118"></div>
</v-click>

<v-click>

<div class="border-2 border-red-500 w-[60px] h-[20px] absolute top-22.5 left-170"></div>
<img src="./images/l2-type-length.png" class="pr-5 w-180 float-right" />
</v-click>


::right::
<v-click>

<img src="./images/l2-type.png" class="pt-24 pr-5 w-180 float-right" />
<div class="border-2 border-red-500 w-[60px] h-[20px] absolute top-22.5 left-170"></div>
</v-click>

---
layout: three-slots
---

# Header Layer 3

<v-click>
<img src="./images/l2-example-packet.png" class="h-25 pr-30 w-180 float-right" />
</v-click>

::left::

<v-click>

IP version: **4**

IHL(Internet Header Length): Number 32-bit words, value = **5**
<div class="border-2 border-red-500 w-[30px] h-[20px] absolute top-22.5 left-186"></div>
</v-click>
<v-click>

Type of service
<div class="border-2 border-red-500 w-[30px] h-[20px] absolute top-22.5 left-194"></div>
</v-click>

<v-click>

Total Length: Number bytes in packet, **768**
<div class="border-2 border-red-500 w-[60px] h-[20px] absolute top-27 left-69"></div>
</v-click>

<v-click>

Identification: used for fragmentation and reassembly of IP packets, **0x0f77**
<div class="border-2 border-red-500 w-[60px] h-[20px] absolute top-27 left-85"></div>
</v-click>

<v-click>

Flags and Fragment Offset
<div class="border-2 border-red-500 w-[60px] h-[20px] absolute top-27 left-102"></div>
</v-click>
<v-click>

Time to live: **0x80 (128)**
<div class="border-2 border-red-500 w-[30px] h-[20px] absolute top-27 left-118"></div>
</v-click>
::right::
<v-click>
<div class="border-2 border-red-500 w-[30px] h-[20px] absolute top-27 left-126"></div>
<img src="./images/l2-protocol.png" class="pt-5 pb-5 w-180 float-right" />
</v-click>
<v-click>

Header Checksum
<div class="border-2 border-red-500 w-[60px] h-[20px] absolute top-27 left-137"></div>
</v-click>
<v-click>

Source Address: **192.168.1.33**
<div class="border-2 border-red-500 w-[127px] h-[20px] absolute top-27 left-153"></div>
</v-click>
<v-click>

Destination Address: **147.175.1.55**
<div class="border-2 border-red-500 w-[60px] h-[20px] absolute top-27 left-186"></div>
<div class="border-2 border-red-500 w-[60px] h-[20px] absolute top-31.5 left-69"></div>
</v-click>

---
layout: three-slots
---

# Header Layer 4

<v-click>
<img src="./images/l2-example-packet.png" class="h-25 pr-30 w-180 float-right" />
</v-click>

::left::
<v-click>

Source Port: **50032**
<div class="border-2 border-red-500 w-[60px] h-[20px] absolute top-31.5 left-85.5"></div>
</v-click>
<v-click>

<img src="./images/l2-port.png" class="pt-5 pb-5 w-180 float-right" />
<div class="border-2 border-red-500 w-[60px] h-[20px] absolute top-31.5 left-101.5"></div>
</v-click>

::right::
<v-click>

Sequence Number: **2959815190**
<div class="border-2 border-red-500 w-[135px] h-[20px] absolute top-31.5 left-118"></div>
</v-click>
<v-click>

Acknowledgement Number: **2065982245**
<div class="border-2 border-red-500 w-[135px] h-[20px] absolute top-31.5 left-152"></div>
</v-click>
<v-click>

Header Length(4) / Reserved(6) / Flags(6): **5 / 000000 / 011000**
<div class="border-2 border-red-500 w-[60px] h-[20px] absolute top-31.5 left-186"></div>
</v-click>
<v-click>

Windows Size: **258**
<div class="border-2 border-red-500 w-[60px] h-[20px] absolute top-35.5 left-69"></div>
</v-click>
<v-click>

Checksum: **0x59a2**
<div class="border-2 border-red-500 w-[60px] h-[20px] absolute top-35.5 left-85.5"></div>
</v-click>


---
layout: section
---

# ARP (Address Resolution Protocol): Connecting Layers 2 and 3

---
layout: default
---

# Connecting Layers 2 and 3

Recall: Packet gets passed down the stack, picking up more headers.
- Layer 3 fills in the IP addresses.
- Then, Layer 2 needs to fill in the MAC addresses.

<img src="./images/l2-arp.png" class="pt-5 pr-50 h-65 float-right" />

---

# Connecting Layers 2 and 3

If the destination IP is in our local network:
- Find the destination's MAC address, and send to destination on Layer 2.

If the destination IP is not in our local network:
- Find the router's MAC address, and send to the router on Layer 2.
- Router can forward our packet toward the destination.

<img src="./images/l2-arp.png" class="pt-5 pr-60 h-55 float-right" />

---

# Connecting Layers 2 and 3

How do we send packets to the destination (local) or the router (non-local)?

- We could broadcast: Put FF:FF:FF:FF:FF:FF as destination MAC.
  - But now, everybody else has to process this packet.
  - Need extra bandwidth to send the packet to everyone on local network.

- We really want to unicast the packet to the right MAC address.
  - We need some way to translate IP addresses to MAC addresses.

<img src="./images/l2-arp.png" class="pt-5 pr-65 h-50 float-right" />
---

# ARP – Steps

**ARP** translates Layer 3 IP addresses to Layer 2 MAC addresses.
- Example: Alice knows Bob's IP address is 1.2.3.4. She wants to know Bob's MAC address.

Steps of the protocol:
1. Alice checks her cache to see if she already knows Bob's MAC address.
2. If Bob's MAC address is not in the cache, Alice broadcasts:
"What is the MAC address of 1.2.3.4?"
3. Bob responds by unicasting to Alice:
"My IP is 1.2.3.4 and my MAC address is ca:fe:f0:0d:be:ef."<br>Everyone else does nothing.
4. Alice caches the result.

---

# ARP – Steps

Alice knows Bob's IP address is 1.2.3.4. She wants to learn Bob's MAC address.

<div class="relative h-80">
  <img v-click="[1]" v-show="$clicks === 1" src="./images/l2-arp-steps1.png"
       class="absolute inset-0 w-full h-full object-contain rounded-xl"/>
  <img v-click="[2]" v-show="$clicks === 2" src="./images/l2-arp-steps2.png"
       class="absolute inset-0 w-full h-full object-contain rounded-xl"/>
  <img v-click="[3]" v-show="$clicks === 3" src="./images/l2-arp-steps3.png"
       class="absolute inset-0 w-full h-full object-contain rounded-xl"/>
  <img v-click="[4]" v-show="$clicks === 4" src="./images/l2-arp-steps4.png"
       class="absolute inset-0 w-full h-full object-contain rounded-xl"/>
</div>
---

# ARP

ARP runs directly on Layer 2 (not IP).

<img src="./images/l2-arp2.png" class="pt-5 pb-5 h-70 float-right" />

*Note: You can also broadcast an unsolicited response:*

*"My IP is 1.2.3.4, and my MAC is ca:fe:f0:0d:be:ef...even though no one asked."*
---

# ARP - Wireshark (Request -> Response)

<img src="./images/l2-arp-req.png" class="pt-2 pb-5 h-55 float-right" />
<img src="./images/l2-arp-res.png" class="pt-2 pb-5 h-55 float-right" />

---
layout: section
---

# Network Performance Parameters

---

# Properties of Links

A link connects two devices.

Properties of a link:
- **Bandwidth:** Number of bits sent/received per unit time.
  - "Width" of the link.
  - Measured in bits per second (bps).
- **Propagation delay:** Time it takes a bit to travel along the link.
  - "Length" of the link.
  - Measured in seconds.

<img src="./images/l2-bandwith.png" class="pt-0 h-27 float-right" />

- **Bandwidth-delay product:** Bandwidth × delay.
  - "Capacity" of the link.
---

# Measuring Packet Delay with Timing Diagrams

Suppose we have a link with:
- Bandwidth = 1 Mbps. *(1,000,000 bits per second.)*
- Propagation delay = 1 ms. *(0.001 seconds.)*

*Note: We measure in bits per second, not bytes!*

How long does it take to send a 100-byte *(800-bit)* packet?
- From the time the first bit is sent,
- To the time the last bit is received.

Let's draw a timing diagram to help.

---

# Measuring Packet Delay with Timing Diagrams

The packet delay is the time it takes for an entire packet to be sent, starting from the time the first bit is put on the wire, to the time the last bit is received at the other end. 

<img src="./images/l2-timing-diagram1.png" class="pt-0 pr-20 h-90 float-right" />

---

# Measuring Packet Delay with Timing Diagrams

Packet Delay    =       <span style="color:red">Transmission Delay</span>		+    <span style="color:blue">Propagation Delay</span>

Packet Delay    =  <span style="color:red">(Packet Size / Bandwidth)</span> 	+    <span style="color:blue">Propagation Delay</span>

<img src="./images/l2-timing-diagram-5.png" class="pt-0 pr-25 h-90 float-right" />
---

# Link Tradeoffs

Which link is better? It depends.
- Link 1:	Bandwidth 10 Mbps	Propagation Delay = 10 ms
- Link 2:	Bandwidth 1 Mbps	Propagation Delay = 1 ms

10-byte packet: Link 2 is better.
- ~10 ms with Link 1.	
- ~1 ms with Link 2.
- For small packet, transmission delay is negligible. Propagation delay dominates.

10,000-byte packet: Link 1 is better.
- ~18 ms with Link 1.	
- ~81 ms with Link 2.
- For large packet, transmission delay dominates.
---

# Timing Diagrams and Pipe Diagrams

<img src="./images/l2-timing-diagram-6.png" class="pt-0 pr-20 h-110 float-right" />
---

# Timing Diagrams and Pipe Diagrams

The pipe diagram is an alternate view of the link.

- Shows the bits on the link at a frozen moment in time.

<img src="./images/l2-pipe2.png" class="pt-10 pb-10 pr-60 h-40 float-right" />

<div class="relative h-40 w-full flex flex-col items-center">
  <!-- Image container -->
  <div class="relative w-full h-30">
    <!-- Background pipe rectangle (centered) -->
    <img 
      src="./images/l2-pipe-rectangle1.png" 
      class="absolute w-180 h-32 object-contain rounded-xl z-0" 
      style="top: 5px; left: 50%; transform: translateX(-50%);"
    />
    <!-- Moving pipe images -->
    <img 
      v-for="i in 18" 
      :key="i" 
      v-click="[i]" 
      v-show="$clicks === i" 
      src="./images/l2-pipe1.png" 
      class="absolute top-[10px] w-full h-full object-contain rounded-xl z-10" 
      :style="{ left: '-330px', transform: `translateX(${i*34.5}px)` }"
    />
  </div>

  <!-- Title under images -->
  <div class="text-center text-xl font-semibold" style="margin-top: 10px;">
    t = {{ $clicks <= 1 ? 0 : $clicks - 1 }}s
  </div>
</div>
---

# Pipe Diagrams

Pipe diagram shows the bits on the link at a frozen moment in time.
- **Height = bandwidth.** How many bits we can put in the pipe per unit time.
- **Width = propagation delay.** How long it takes for bits to travel through the pipe.
- **Area = bandwidth-delay product.** How many bits fit in the pipe at a given instant.

<img src="./images/l2-pipe-diagram1.png" class="pt-0 pr-60 h-80 float-right" />
---

# Pipe Diagrams

Shorter propagation delay: Pipe length is shorter.

<img src="./images/l2-pipe3.png" class="pt-10 pb-10 pr-60 h-40 float-right" />

<div class="relative h-40 w-full flex flex-col items-center">
  <!-- Image container -->
  <div class="relative w-full h-30">
    <!-- Background pipe rectangle (centered) -->
    <img 
      src="./images/l2-pipe-rectangle2.png" 
      class="absolute w-180 h-32 object-contain rounded-xl z-0" 
      style="top: 5px; left: 50%; transform: translateX(-50%);"
    />
    <!-- Moving pipe images -->
    <img 
      v-for="i in 14" 
      :key="i" 
      v-click="[i]" 
      v-show="$clicks === i" 
      src="./images/l2-pipe1.png" 
      class="absolute top-[10px] w-full h-full object-contain rounded-xl z-10" 
      :style="{ left: '-255px', transform: `translateX(${i*34}px)` }"
    />
  </div>

  <!-- Title under images -->
  <div class="text-center text-xl font-semibold" style="margin-top: 10px;">
    t = {{ $clicks <= 1 ? 0 : $clicks - 1 }}s
  </div>
</div>
---

# Pipe Diagrams

Higher bandwidth: Pipe height is taller.

<img src="./images/l2-pipe7.png" class="pt-10 pb-10 pr-60 h-40 float-right" />

<div class="relative h-60 w-full flex flex-col items-center">
  <!-- Image container -->
  <div class="relative w-full h-50">
    <!-- Background pipe rectangle (centered) -->
    <img 
      src="./images/l2-pipe-rectangle3.png" 
      class="absolute w-full h-52 object-contain rounded-xl z-0" 
      style="top: 5px; left: 50%; transform: translateX(-50%);"
    />
    <!-- Moving pipe images -->
    <img 
      v-for="i in 9" 
      :key="i" 
      v-click="[i]" 
      v-show="$clicks === i" 
      src="./images/l2-pipe5.png" 
      class="absolute top-[10px] w-full h-full object-contain rounded-xl z-10" 
      :style="{ left: '-150px', transform: `translateX(${i*30}px)` }"
    />
  </div>

  <!-- Title under images -->
  <div class="text-center text-xl font-semibold" style="margin-top: 10px;">
    t = {{ $clicks <= 1 ? 0 : $clicks - 1 }}s
  </div>
</div>
---

# Pipe Diagrams – Transmission Delay

The width of the packet in the pipe represents the transmission delay.

- How long it takes to put all the bits in the pipe.
- More bandwidth = taller pipe = more bits in pipe per unit time = narrower packet in pipe.

<img src="./images/l2-pipe2.png" class="pt-10 pb-10 pr-60 h-40 float-right" />

<div class="relative h-40 w-full flex flex-col items-center">
  <!-- Image container -->
  <div class="relative w-full h-30">
    <!-- Background pipe rectangle (centered) -->
    <img 
      src="./images/l2-pipe-rectangle1.png" 
      class="absolute w-180 h-32 object-contain rounded-xl z-0" 
      style="top: 5px; left: 50%; transform: translateX(-50%);"
    />
    <!-- Moving pipe images -->
    <img 
      v-for="i in 12" 
      :key="i" 
      v-click="[i]" 
      v-show="$clicks === i" 
      src="./images/l2-pipe4.png" 
      class="absolute top-[10px] w-full h-full object-contain rounded-xl z-10" 
      :style="{ left: '-225px', transform: `translateX(${i*34.5}px)` }"
    />
  </div>

  <!-- Title under images -->
  <div class="text-center text-xl font-semibold" style="margin-top: 10px;">
    t = {{ $clicks <= 1 ? 0 : $clicks - 1 }}s
  </div>
</div>
---

# Pipe Diagrams – Transmission Delay

The width of the packet in the pipe represents the transmission delay.

- How long it takes to put all the bits in the pipe.
- More bandwidth = taller pipe = more bits in pipe per unit time = narrower packet in pipe.

<img src="./images/l2-pipe8.png" class="pt-2 pb-2 pr-58 h-25 float-right" />

<div class="relative h-60 w-full flex flex-col items-center">
  <!-- Image container -->
  <div class="relative w-full h-50">
    <!-- Background pipe rectangle (centered) -->
    <img 
      src="./images/l2-pipe-rectangle4.png" 
      class="absolute w-full h-52 object-contain rounded-xl z-0" 
      style="top: 5px; left: 50%; transform: translateX(-50%);"
    />
    <!-- Moving pipe images -->
    <img 
      v-for="i in 10" 
      :key="i" 
      v-click="[i]" 
      v-show="$clicks === i" 
      src="./images/l2-pipe6.png" 
      class="absolute top-[10px] w-full h-full object-contain rounded-xl z-10" 
      :style="{ left: '-165px', transform: `translateX(${i*30}px)` }"
    />
  </div>

  <!-- Title under images -->
  <div class="text-center text-xl font-semibold" style="margin-top: 10px;">
    t = {{ $clicks <= 1 ? 0 : $clicks - 1 }}s
  </div>
</div>
---

# Pipe Diagrams – Transmission Delay

The width of the packet in the pipe represents the transmission delay.

- How long it takes to put all the bits in the pipe.
- More bandwidth = taller pipe = more bits in pipe per unit time = narrower packet in pipe.

<img src="./images/l2-transmission-delay.png" class="pt-0 pr-10 h-80 float-right" />
---

# Latency , Jitter, Round Trip Time(RTT)

**Latency** - corresponds to how long it takes a message to travel from one end of a network to the other.
<img src="./images/l2-latency.png" class="pb-5 pr-110 h-25 float-right" />

**Jitter** - variability of latency (𝐽𝑖𝑡𝑡𝑒𝑟 = |𝒕𝟏 − 𝒕𝟐|).
<img src="./images/l2-jitter.png" class="pb-5 pr-110 h-30 float-right" />

**RTT** - total time it takes for a packet to go from the sender to the receiver and back again (PING).
<img src="./images/l2-rtt.png" class="pr-110 h-25 float-right" />
---
layout: section
---

# Ethernet Switch

---

# Ethernet Switch

Switch is a **link-layer** device:

- takes an **active** role
  - store, forward Ethernet (or other type of) frames
  - examine incoming frame’s MAC address, **selectively** forward  frame to one-or-more outgoing links when frame is to be forwarded on segment
- **transparent**: hosts unaware of presence of switches
- **plug-and-play**, self-learning
  - switches do not need to be configured

---

# Switch: multiple simultaneous transmissions

- hosts have dedicated, direct connection to switch
- switches buffer packets
- Ethernet protocol used on each incoming link, so: 
  - no collisions; full duplex
  - each link is its own collision domain
- switching: A-to-A’ and B-to-B’ can transmit simultaneously, without collisions
  - but A-to-A’ and C to A’ can not happen simultaneously 

<img src="./images/l2-swicth-simultaneous-transmissions.png" class="pl-50 h-50" />

---

# Switch: self-learning

- switch learns which hosts can be reached through which interfaces
  - when frame received, switch “learns”  location of sender: incoming LAN segment
  - records sender/location pair in switch table

<div class="relative pt-5 h-80">
    <img v-click src="./images/l2-switch-learning1.png" class="absolute inset-0 w-full h-full object-contain rounded-xl"/>
    <img v-click src="./images/l2-switch-learning2.png" class="absolute inset-0 w-full h-full object-contain rounded-xl"/>
</div>
---
layout: three-slots
---

# Switch: forwarding process

Forwarding is **destination-based**: Use the destination to decide the next-hop.
 - if the destination exists in the table: forward to corresponding next-hop
 - if the destination is not in the table: flood out of all ports (except incoming port)

::left::
<v-click>
Case 1: No entry for B (destination) in table.

Flood the packet to all ports (except incoming port).
</v-click>

<div class="relative h-65">
    <img v-click src="./images/l2-switch-learning1.png" class="absolute inset-0 w-full h-full object-contain rounded-xl"/>
    <img v-click src="./images/l2-switch-learning3.png" class="absolute inset-0 w-full h-full object-contain rounded-xl"/>
    <img v-click src="./images/l2-switch-learning4.png" class="absolute inset-0 w-full h-full object-contain rounded-xl"/>
</div>

::right::
<v-click>
Case 2: Entry for B (destination) is in table.

Use table entry to forward to next-hop.
</v-click>

<div class="relative h-65">
    <img v-click src="./images/l2-switch-learning5.png" class="absolute inset-0 w-full h-full object-contain rounded-xl"/>
    <img v-click src="./images/l2-switch-learning6.png" class="absolute inset-0 w-full h-full object-contain rounded-xl"/>
    <img v-click src="./images/l2-switch-learning7.png" class="absolute inset-0 w-full h-full object-contain rounded-xl"/>
</div>
---

# Interconnecting switches

self-learning switches can be connected together:

<img src="./images/l2-switch-learning8.png" class="pl-0 h-65" />

<v-click>

**sending from A to G - how does SW1 know to forward frame destined to G via SW4 and SW3?**
</v-click>
<v-click>
self learning! (works exactly the same as in single-switch case!)
</v-click>
---

# References
1. KAO, Peyrin. CS 168 Textbook: Introduction to the Internet: Architecture and Protocols. [online]. University of California, Berkeley, 2024 [accessed 2025-09-03]. Available from: https://textbook.cs168.io/
2. KUROSE, James F. and ROSS, Keith W. Computer Networking: a Top Down Approach – authors' website. [online]. University of Massachusetts Amherst, 2025 [accessed 2025-09-03]. Available from: https://gaia.cs.umass.edu/kurose_ross/index.php

<br><br>

## License

This presentation is based on materials by **[Peyrin Kao / UC Berkeley]**  
Licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

This presentation is also licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
