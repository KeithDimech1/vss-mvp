---
title: "How to Integrate Dext Prepare with Sage 50 Using Dext Connect"
url: "https://help.dext.com/en/articles/105795-how-to-integrate-dext-prepare-with-sage-50-using-dext-connect"
collection: "Accounting Softwares"
source: "dext"
---

# This is a guide how to connect your Sage 50 account with the Dext Connect desktop application.

 

Important: To be able to integrate with an accounting software you must have Administrator level [User Privilege](https://help.dext.com/en/s/article/what-does-user-privilege-mean) access. If you cannot see the **Connections** section in the sidebar it means you don&#x27;t have this access. Reach out to your account administrator or accountant/bookkeeper to request access.

 

Please note that Dext Prepare does not work with Sage 50&#x27;s share mode. To prevent errors, we recommend pausing share mode before publishing, then resuming once complete.

 

**System Requirements:**

- Windows 8 and above

- 4GB RAM

- Sage 50 2022.3 or newer

- 32bit or 64bit Setup

 

- You must must be an administrator on your local computer or server

- You must have a separate user account set up in Sage 50 to perform the integration with

- You must be able to whitelist Dext Connect on your antivirus or firewall software

- Installation location

**You must install the Connect application in a location where:**

- It is turned on and has access to a stable internet connection whenever Dext Prepare needs access to Sage 50

- Stable access to the Sage 50 client files, ideally on the same computer or server that Sage 50 is installed on

- If you are using Dext Prepare with a client, Dext Connect should be installed where the client&#x27;s files are. This may be your client&#x27;s machine.

- If you are using Sage 50 on a virtual machine or remote desktop environment, work with your IT team to ensure the Dext Connect application will be online when you are working with Dext Prepare.

There are 4 main steps to follow to complete this process:1. [Download and install Dext Connect](#h_01EZ7WYKNDSNGBMDGAVHWH0WCN)2. [Create a new user in Sage ](#h_01EZ7WYV5G8SCB2GQ410QDP4EZ)3. [Complete the integration ](#h_01EZ7WZ2652V86RTZ9Q1ZH6D0X)4. [Use Dext Connect to review and publish documents](#h_01EZDCFRR2090T4CHM6TYA21F6)

# To download and install Dext Connect follow these steps:

1. [Download Dext Connect here](https://releases.dext.com/desktop/DextConnectAppSetup.exe)2. Double-click on the file to start the installer.2a. When installing, Windows might display the following message:

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59661794/2e330c617b256dc664f940fef656/685_50bbbd29d4c0a1d9a0b42d540af60645.jpg?expires=1765161000&signature=c71711830be1f581d370335c79a11b808f5eb920f14aa47555d33991304bc088&req=1dxpw1n9pTNk2hL085ZhoVtxMP8sLo5B4Kfjb4kfhBGL%2Bbvbu4ACd7gKQwaR%0A1xyC1hPcG6pRWezg%0A)This is common for new software that has just been released. To continue click **More info** and then select **Run anyway.**Agree to the License Agreement and select the installation folder. This **must** be on the same computer or server as Sage 50 is installed on.3. Once installed, start the application (there should be a shortcut on the desktop) and log into a Dext Prepare account. This account should have access to all of the client accounts that you want to integrate with Sage 50. Any integrations performed on the app are only available when the account that performed the integration is signed in.You should also make sure not to integrate the same company file on two different instances of the Connect app if you need to have it installed in multiple locations.

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59661803/c45dfc784e69b9bd4e29f504bc1a/685_71852a97306cf44b20d654fbf8cfd684.jpg?expires=1765161000&signature=4c97779b83eff301ac9d074ee92b6b56dbd1c40ee630ad97d752e0b5fe6fab1b&req=1dxpw1nyrDRk2hL085Zhoe13X9qamxdAZoAvfDhcn75Hmi%2FaoFwtMJE%2FFWdo%0A4DJMjKxfY1HRuHaB%0A) 

# Create a new user in Sage 50

Before you can integrate Sage 50 with Dext Connect a new user must be created in Sage 50 to act as the connection between the two pieces of software.**Important: **Each client file you integrate with **must** have its own dedicated user for Dext Connect. To create a new user, log on to Sage 50 and into the company account that you would like to connect.1. Click on **Settings **then click **Access Rights** and then **New**2. Complete the details for your new user, ensure they have full access and then click **OK **

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59661815/d76cf2529a08e5a5dc8129305065/685_c2637094c745baf788077f6ffd8bbefb.jpg?expires=1765161000&signature=88f5fb6f8970a4c47bd39d6c4840f13fad7290f3674d3ac723dfad59d6429388&req=1dxpw1nyrTJk2hL085ZhoYli0Me0RS6GRHDUKmMgsNaVx%2BU45xtMq%2FoFdSia%0A5iELWPT2XUPESoSO%0A)If you are unable to add a new user, you need to enable **Access Rights.** To do so follow these steps:

- Click **Settings** then click **Company Preferences **and click **Parameters**.

- In the **Others** area select the **Access Rights** check box then click **OK**.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59661822/aff1e851f376d384ae5e03696ba8/685_c21693fd644a170ed1c7f56a242e2fff.jpg?expires=1765161000&signature=5e3fe4b95845ae8d472c2f40a1666e67edab355cd7409a73dff680ad03a62276&req=1dxpw1nyrjVk2hL085ZhoS4w6dPGceZmag7IjOrRH%2F3W7i4joLMKN7shrzGJ%0AS99FUYjL752KHII6%0A) 

# Complete the integration

Return to Dext Connect and follow these steps:1. Select the account that you wish to connect and click on the green **Integrate** button

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59661841/042b7f26dc272b4e6b60be634670/685_e2b420b388e4a8803d8006df00f123cc.jpg?expires=1765161000&signature=7e5f750289749c80c8f49ca0b40fd5053eebbd2e69ee2510201a7c07eae1a049&req=1dxpw1nyqDZk2hL085ZhoRluPTYUEwWoyWLHoWdlyLI5mvgcV3hM4t%2Bj9RF%2B%0Acz7%2BQ90k4%2FGDm5VU%0A) 

2. Select the **Sage 50** application from the list of available applications and click **OK**

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59661853/328c47e929051f4fbcc173e2d40c/685_932c862183a6d3051cd66729fde7d2ee.jpg?expires=1765161000&signature=d5c846fb3735cf0cf312b0943f9128270ae137d9691554414f1853f10dbdd0f0&req=1dxpw1nyqTRk2hL085ZhoeLb1Z29C55B5Dj7gVgOqWuFZHJo5ay%2BuSWMdNXR%0AkWALLqH1X4bRb7x0%0A)3. Click the **Select Company** button and browse to find the folder of the Sage 50 company that you want to integrate and then click **Next**

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59661866/14017f3090a6e8f27cd8ad9e7352/685_19702902a9d35c216280e8f685c09741.jpg?expires=1765161000&signature=92b51361c5a3ce84e5a4cd52da37bda0b6ca7098d3bfa578e3b15faa7b74fa05&req=1dxpw1nyqjFk2hL085ZhobmzraxFV0Rmln%2Fm4iNbZqGmYgnSPHHG5NskS8MS%0Aa%2F4enyC8kl%2FUoL1m%0A)4. Log in to Sage 50 using the new user credentials that you created earlier and click **Integrate**

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59661884/079b2c5d172ae711647fa48eff39/685_93cac351906697ca6cf95169c40482ac.jpg?expires=1765161000&signature=a8589e3d523d291a0a70690a09f69ecf62eacffac2742e9ee882c53d0134f3d2&req=1dxpw1nypDNk2hL085ZhoTKjy9tbsiQjzkckBs5Dy94rE6U40N1fcRHxdHvW%0ARWgsBZBPxQqzXelm%0A) 

5. On the next screen choose the tax status of this account, including default tax codes, default cost codes and whether multiple currencies should be published to this account.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59661898/aae4bc7fc2f36223d77d47556ce1/685_03f8772c6cb61e2f408f435497be81b6.jpg?expires=1765161000&signature=00e355d34e5fb6ad4fefdc001dd198372872078129bfa304f9c54d7f81c49fbc&req=1dxpw1nypT9k2hL085ZhobMXp13gyzVlPLYhRFkMRlohZwQ8TMl9JF8GOfg0%0AfRKaPDEbXuTBADhi%0A) 

6. Click **Finish **on the next screen.

 

7. If you need to change the tax settings, access the client account on the Dext Prepare web application and **Connections**, then click **Integrations.**

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59661910/6b0e1b70b71b7fe785a8d282bc80/685_1f61d31a539517f330a41f413e9ece91.jpg?expires=1765161000&signature=4ddde3ecdfa0ef24853cf8dc63f8556b107307f6c32e48989972bb14a70b61a0&req=1dxpw1nzrTdk2hL085ZhoVuUlHdPnNP1%2F1ZtH0dWmIk2EJoS7XrLdCZHz1Sx%0A%2BX5lqQ2kv57vPC7Q%0A) 

# How to review and publish documents to Sage 50

Once your accounts are linked with Sage 50, you - and any of your colleagues - will be able to publish documents to Sage 50 as long as the Dext Connect app has internet access.We recommend that you use the [Dext Prepare web application](https://app.dext.com/login) to review documents and publish them to Sage 50, so that you can work collaboratively and in real-time with your clients and colleagues. [Set rules](https://help.dext.com/en/s/article/How-to-use-Supplier-and-Customer-Rules) and add [payment methods](https://help.dext.com/en/s/article/How-to-link-a-Payment-Method-to-a-Bank-Account) to your client&#x27;s documents as you would with any cloud-based integration.

Published documents will appear in the **Transactions List** in Sage 50. A link to the document image is included in the **Ex. Ref** field. Complete the reconciliation process as normal in Sage 50.

 

**Note:** [Image sharing](https://help.dext.com/en/s/article/The-System-Settings-page) must be enabled in Dext Prepare to see the document image.

 

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59661923/aeda8dd497eba4952901059d91f6/685_fb7b2df02f09022e68aaac01503f7743.jpg?expires=1765161000&signature=8ea5f58e939ab0a7e434da7742717872528e7c4cf47cb2698dfe212bbe3520a7&req=1dxpw1nzrjRk2hL085ZhoUYFZzMfBhrQ6%2B6%2BhQqSQAaIWZ2zjqIxBLH7Yw%2Fg%0APFh9qrEMf2yYhV8u%0A)However you can review and publish documents using the Dext Connect application as well. To do so:1. Click **View** next to a client&#x27;s name to access their Dext Prepare account

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59661934/c589d3e7f27ce6851a4f633fde9a/685_3f089dffc473fe96a11384f7d8a77a80.jpg?expires=1765161000&signature=0e92d9971d7a70df3688950b2e1a4287230f4baa7857205b08ea728c76281025&req=1dxpw1nzrzNk2hL085ZhoZquki%2BllJDhiiPMdQN7WYHzYGit0HtkHq6n225u%0APJiWAREk%2BosYYn7N%0A) 

2. Just like in Dext Prepare, select a workspace and a document to view its details:

[](https://dext.intercom-attachments.eu/i/o/weauzzxo/59661947/3044da93122bc787c44713602327/685_c85969fd5827c1adda861cd540648c8c.jpg?expires=1765161000&signature=56d187dc902b61f415e3dbe9519fae6ca8460b6c5f08ce1e6f6e9f3e6e6ee9cb&req=1dxpw1nzqDBk2hL085ZhocA6rFwgy4T744aOmDKP04r8NUGQCcaJXW2FJwwz%0AF2WfclcVNNI8H7ea%0A)3. Click **Edit in Browser** to open the document in Dext Prepare and change any information, set supplier rules, and add any payment methods.4. Click **Publish** to export the document to Sage 50.

Related Articles[How Sage 50 Multiple Currency Works in Dext Prepare](https://help.dext.com/en/articles/105684-how-sage-50-multiple-currency-works-in-dext-prepare)[How to Publish Items to Sage 50 Canada](https://help.dext.com/en/articles/105690-how-to-publish-items-to-sage-50-canada)[How to Migrate Your Sage 50 Integration to Dext Connect](https://help.dext.com/en/articles/105830-how-to-migrate-your-sage-50-integration-to-dext-connect)[How to Integrate Dext Prepare with Sage 50 Canada Using Dext Connect](https://help.dext.com/en/articles/105831-how-to-integrate-dext-prepare-with-sage-50-canada-using-dext-connect)[How to Integrate Dext Prepare with an Accounting Software](https://help.dext.com/en/articles/416702-how-to-integrate-dext-prepare-with-an-accounting-software)