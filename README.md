
<img alt="배너" width="100%" src="https://github.com/user-attachments/assets/92f1dd9c-1498-4dfd-ad38-8451a62750b1" />

## 📷 Project Overview
**OreOre**  
A second-hand electronics marketplace designed for easy selling, enabling users to list products, accept payments, and ship items directly to buyers

<details>
<summary>🇰🇷 Korean Description</summary>
- 서비스명 : oreore( 오래오래 ) </br>
- 프로젝트 설명 : 중고 물품을 등록하고 거래할 수 있는 간편한 중고거래 플랫폼
</details>
</br>

## ✨ Key Features
- 📋 **Main Page** </br>
	•	Browse products uploaded by users by category.</br>
	•	Sort products by newest or oldest.
- 📷 **Product Detail Page** </br>
	•	View detailed product information and seller details.</br>
	•	Add products to the cart or purchase them directly.
- 🙌🏻 **My Page** </br>
	•	View and update user profile information.</br>
	•	Manage products currently for sale, including listing, editing, and deleting items.
- 🛒 **Cart & Checkout** </br>
	•	Add items to the cart before purchasing.</br>
	•	Show the total price grouped by seller when multiple items are purchased from the same seller.</br>
	•	Implemented payment functionality using the Toss Payments API.
</br>

## 📺 Screen Layout

|Log in|Sign up|Main|
| :-----------------------------------------------------------: | :-------------------------------------------------------: | :--------------------------------------------------------------: |
|       <img width="949" height="780" alt="Image" src="https://github.com/user-attachments/assets/62c39c19-8fff-4e04-bcf7-50e35181654f" />        |     <img width="935" height="800" alt="Image" src="https://github.com/user-attachments/assets/048a209f-bf18-40dd-acac-0cde638f1999" />     |         <img width="981" height="714" alt="Image" src="https://github.com/user-attachments/assets/29e93779-9f70-4e8d-88c0-781f13863f52" />          |
|Product Detail|Add Product|My Account|
|    <img width="944" height="605" alt="Image" src="https://github.com/user-attachments/assets/8c43a805-5002-4de7-9fdc-0753b8dda7e8" />    |    <img width="623" height="725" alt="Image" src="https://github.com/user-attachments/assets/5233216e-1fc1-48e0-8e06-01890a3b72c3" />    | <img width="1005" height="799" alt="Image" src="https://github.com/user-attachments/assets/308cc925-e85c-47f3-9218-8858608942ae" /> |
|Edit Profile Info|Shopping Cart|Checkout Page|
| <img width="1005" height="763" alt="Image" src="https://github.com/user-attachments/assets/8478a514-3978-4571-98ad-34eb0d85c831" /> | <img width="1002" height="620" alt="Image" src="https://github.com/user-attachments/assets/6b28991a-9264-4040-8bfe-a5c0d77606b1" /> |     <img width="1011" height="790" alt="Image" src="https://github.com/user-attachments/assets/ed7aada6-36bf-41dd-961c-f526740fb57d" />     |


## 🛠️ Technical Challenges & Solutions
<details>
<summary><strong>1. Separating Buyer and Seller Roles</strong></summary>

<br>

**Problem**  
In a secondhand marketplace, users can act as both buyers and sellers, which made role handling unclear during product registration and order processing.

**Solution**
- Explicitly assigned `sellerId` when creating products and `buyerId` when creating orders.
- Used `authMiddleware` to verify the logged-in user and consistently use the authenticated `userId` throughout product and order flows.
- Improved the middleware to validate the `Authorization` header, decode the token, and store user information in `req.user`.

**Outcome**
- Clearly separated buyer and seller roles across the service.
- Improved data consistency and strengthened authentication-based request handling.

</details>

<details>
<summary><strong>2. Toss Payments Integration</strong></summary>

<br>

**Problem**  
Payment requests were created successfully, but the payment approval step sometimes failed, which prevented orders from being completed properly.

**Solution**
- Reviewed and fixed approval request parameters such as `paymentKey`, `orderId`, and `secretKey`.
- Added logic to prevent duplicate approval requests for the same `orderId`.

**Outcome**
- Stabilized the payment approval flow.
- Reduced the risk of duplicate or inconsistent payment processing.

</details>

<details>
<summary><strong>3. AWS S3 Upload Flow Refactoring</strong></summary>

<br>

**Problem**  
Unsafe file names and duplicated upload logic caused broken image URLs and made the backend harder to maintain.

**Solution**
- Implemented AWS S3 presigned URL uploads for profile and product images.
- Refactored repeated upload logic into a reusable backend function.
- Moved S3 configuration into environment variables.
- Sanitized file names before generating S3 object keys to prevent broken image URLs.

**Outcome**
- Reduced duplicated code and improved maintainability.
- Resolved image rendering issues caused by unsafe file names.
- Made the upload flow more reliable across different environments.

</details>


## 📚 Technology Stack
<div style="display: flex; gap: 12px;">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-black?style=for-the-badge&logo=zustand&badgeColor=010101">
  <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white">
  <img src="https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black">
  <img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white">
  <img src="https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white">
</div>
