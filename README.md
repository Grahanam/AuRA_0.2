# Aura


## Getting Started

Follow these steps to get started with the project:

### Setup Server

- First Clone this Repository

- Go to backend directory
```bash
cd backend
```

- Edit and Rename example.env file to .env 
```bash
secretkey=your_secret_key
url=mongodb_database_url
BUCKET_URL=firebase_storage_bucket_url
CLIENT_ID=Google_developer_client_id
```
Get your Client Id:https://console.cloud.google.com

In Google Developer Console go to -> Apis and Services ->credentials
![auraclientid1](https://github.com/Grahanam/PaLM/assets/68738881/24e3431d-171d-4177-920e-28a93a5dcbc1)

![auraclient2](https://github.com/Grahanam/PaLM/assets/68738881/27aa6a01-8c90-41b2-9d71-81eac5b4d9e7)

Change urls when running in production
![auraclientid3](https://github.com/Grahanam/PaLM/assets/68738881/b6aed0f8-278d-44c0-b434-bad1c82c43a9)


- Add Firebaseservicekey.json file /backend/ directory

Firebase Admin SDK:https://console.firebase.google.com

In Firebase console open: Setting -> Users and Permission -> generate key for nodejs.
Rename the json file to Firebaseservicekey and move it in /backend folder

![aurafirebasesdk](https://github.com/Grahanam/PaLM/assets/68738881/b659d23a-e253-4c41-b14c-cf91b74f815e) 


- Install Node Packages
```bash
npm install 
```

- Run the server
```bash
npm run dev
```


### Setup Client

- Go to frontend directory
```bash
cd frontend
```
- Edit and Rename example.env file to .env 
```bash
VITE_GOOGLE_CLIENT_ID=your_client_Id
VITE_BASE_URL= Api_base_url
```
Same *Client_Id used in backend 


- Install Node Packages
```bash
npm install 
```

- Run the application
```bash
npm run dev
```


### Done !!


## Screenshots:
1. Home Page:
   ![aurahomepage1](https://github.com/Grahanam/PaLM/assets/68738881/5294053b-1092-420d-a10d-2a99e83b4fd4)
   ![aurahomepage2](https://github.com/Grahanam/PaLM/assets/68738881/f8c94a8b-9195-425e-946a-9bd0e47edd22)
   ![aurahomepage3](https://github.com/Grahanam/PaLM/assets/68738881/506bfbf9-76ee-4f87-8116-7f945a62594e)


2. Search Page:
![aurasearchpage1](https://github.com/Grahanam/PaLM/assets/68738881/3a223aed-b19d-4329-b5ef-70589431b947)
![aurasearchpage2](https://github.com/Grahanam/PaLM/assets/68738881/40a37386-379b-433f-9ad5-b3b9ec31898a)
![aurasearchpage3](https://github.com/Grahanam/PaLM/assets/68738881/ef723d73-f5ce-4571-bb9a-ab725d003c55)

3. Playlist Page:
![auraplaylist1](https://github.com/Grahanam/PaLM/assets/68738881/ddeb561e-e48a-435e-80fe-0d95d379ff5b)
![auraplaylist2](https://github.com/Grahanam/PaLM/assets/68738881/f20cb288-8019-4141-8fb4-02038f4c5dfd)
![auraplaylist3](https://github.com/Grahanam/PaLM/assets/68738881/96c525c7-1354-444b-95c7-5ebef895fcc3)

4. Genre Page:
![auragenrepage1](https://github.com/Grahanam/PaLM/assets/68738881/a5f4c34a-8e39-4f6f-aa46-19e6b02c0232)

5. Artist Page:
![auraartistpage1](https://github.com/Grahanam/PaLM/assets/68738881/c6cb8a47-4937-44c1-a3b7-6443eb627389)

6. Album Page:
![auraalbumpage1](https://github.com/Grahanam/PaLM/assets/68738881/74e15057-618c-4025-af99-398c89424fb4)   

## Contact 

For any inquiries or questions,please react out: 
- [Gmail](mailto:lunasuthar5221@gmail.com)
- [Linkedin](https://www.linkedin.com/in/lunaramsuthar/)