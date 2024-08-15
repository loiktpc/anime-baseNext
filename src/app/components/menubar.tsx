"use client";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";
import {
    FaArrowCircleRight,
    FaBars,
    FaBookmark,
    FaHistory,
    FaUser,
} from "react-icons/fa";
import { ModeToggle } from "./theme";
import { useRouter } from "next/navigation";
import { signOut  , onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import { useAppDispatch } from "../store/store";
import { setAuthState } from "../pages/client/login/authSlice";
import { Link } from "lucide-react";

export function MenubarDemo() {
    const dispatch = useAppDispatch();
    const user = auth.currentUser;
  
    let [email,setEmail] = useState<string | any>(undefined)
    let [nameemail,setnameEmail] = useState<string | any>(undefined)
   
   
    const router = useRouter();

    const CheckLogin: any = useAppSelector((state) => state.login.authState);
    console.log('CheckLogin', CheckLogin);
    useEffect(()=>{
        setEmail(window.localStorage.getItem('id'))
        onAuthStateChanged(auth, (user) => {
            if (user) {
             console.log('check user',user );
             setnameEmail(user.email)
              const uid = user.uid;
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
    },[CheckLogin])
    const handleLogOut = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("accessToken");
        dispatch(setAuthState(false));
        setEmail(null)
        signOut(auth)
            .then(() => {
                router.replace("/pages/client/login");
            })
            .catch((error) => {
                // An error happened.
            });
    };

    return (
        <Menubar style={{ background: "#2d2d2d", border: "1px solid" }}>
            <MenubarMenu>
                <MenubarTrigger>
                    <FaBars
                        style={{
                            color: "#a7a7a7",
                            fontSize: "18px",
                            cursor: "pointer",
                        }}
                    />
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>Kinh Dị</MenubarItem>
                    <MenubarItem>Phiêu lưu</MenubarItem>
                    <MenubarItem>Hành động</MenubarItem>
                    <MenubarItem>Tình Cảm</MenubarItem>
                    <MenubarItem disabled>New Incognito Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <ModeToggle />
                        {/* <MenubarSubTrigger>
                Đổi màu
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={() => setTheme("light")}>Sáng</MenubarItem>
                <MenubarItem onClick={() => setTheme("dark")}>Tối</MenubarItem>
                <MenubarItem>Notes</MenubarItem>
              </MenubarSubContent> */}
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>
                        In... <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>
                    <FaHistory
                        style={{
                            color: "#a7a7a7",
                            fontSize: "18px",
                            cursor: "pointer",
                        }}
                    />
                </MenubarTrigger>
                {/* <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Search the web</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Find...</MenubarItem>
                <MenubarItem>Find Next</MenubarItem>
                <MenubarItem>Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent> */}
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>
                    <FaBookmark
                        style={{
                            color: "#a7a7a7",
                            fontSize: "18px",
                            cursor: "pointer",
                        }}
                    />
                </MenubarTrigger>
                {/* <MenubarContent>
            <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>
              Always Show Full URLs
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Toggle Fullscreen</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Hide Sidebar</MenubarItem>
          </MenubarContent> */}
            </MenubarMenu>
            <MenubarMenu>
                {email && email ? (
                    <>
                        <MenubarTrigger>
                            <FaUser
                                style={{
                                    color: "#a7a7a7",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                }}
                            />
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarRadioGroup value="benoit">
                                {nameemail && nameemail ?  <MenubarRadioItem value="andy">
                                    Email: {nameemail}
                                </MenubarRadioItem> : ''}
                                {/* <MenubarRadioItem value="andy">
                                    Email: {email}
                                </MenubarRadioItem> */}
                                {/* <MenubarRadioItem value="benoit">
                                    Benoit
                                </MenubarRadioItem>
                                <MenubarRadioItem value="Luis">
                                    Luis
                                </MenubarRadioItem> */}
                            </MenubarRadioGroup>
                            <MenubarSeparator />
                          

                            <MenubarItem onClick={() => router.push("/pages/client/setting/profile")} inset>
                                Cài đặt...
                                </MenubarItem>
                            <MenubarItem inset onClick={handleLogOut}>
                                Đăng Xuất
                            </MenubarItem>
                            <MenubarSeparator />
                           
                        </MenubarContent>
                    </>
                ) : (
                    <div onClick={() => router.push("/pages/client/login")}>
                        <MenubarTrigger>
                            <FaArrowCircleRight
                                style={{
                                    color: "#a7a7a7",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                }}
                            />
                        </MenubarTrigger>
                    </div>
                )}
                {/* <div onClick={() => router.push('/pages/client/login')}  >
                    <MenubarTrigger>
                        <FaArrowCircleRight
                            style={{
                                color: "#a7a7a7",
                                fontSize: "18px",
                                cursor: "pointer",
                            }}
                        />
                    </MenubarTrigger>
                </div>

                <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset>Edit...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Add Profile...</MenubarItem>
          </MenubarContent> */}
            </MenubarMenu>
        </Menubar>
    );
}
