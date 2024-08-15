"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../config/Firebase";
import { updateProfile } from "firebase/auth";
export default function AlertInputImg() {
    const handlesubmitImg = () => {
        const fileInput: any = document.querySelector('input[type="file"]');
        if (fileInput.files.length > 0) {
            handleImgChange({ target: { files: [fileInput.files[0]] } });
        } else {
            console.log("No file selected!");
        }
    };
    const handleImgChange = (event: any) => {
       
        /** @type {any} */
        const metadata = {
            contentType: "image/jpeg",
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, "imgaes/" + Date.now() +event.target.files[0].name);
        const uploadTask = uploadBytesResumable(
            storageRef,
            event.target.files[0],
            metadata
        );

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case "storage/unauthorized":
                        // User doesn't have permission to access the object
                        break;
                    case "storage/canceled":
                        // User canceled the upload
                        break;

                    // ...

                    case "storage/unknown":
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    updateProfile(auth.currentUser as any, {
                        photoURL: downloadURL,
                    })
                        .then((res) => {
                            window.location.reload();
                          
                           
                            // Profile updated!
                            // ...
                        })
                        .catch((error) => {
                            // An error occurred
                            // ...
                        });
                });
            }
        );
    };

   
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Thay Avatar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#212121]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Tải lên ảnh đại diện</AlertDialogTitle>
                    <AlertDialogDescription>
                        Upload ảnh 18+ sẽ bị khoá nick ngay lập tức
                    </AlertDialogDescription>
                    <input
                        type="file"
                      
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={handlesubmitImg}>
                        Chấp Nhận
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
