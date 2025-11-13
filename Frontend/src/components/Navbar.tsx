import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Item } from "@radix-ui/react-menubar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Activity, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signinWithGoogle, signOut } = useAuthContext();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Upload Report", path: "/upload" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Find Doctors", path: "/doctors" },
    { name: "Profile", path: "/profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Care Karo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="transition-all"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar>
                    {"Welcome back, "}
                    <AvatarImage
                      src={user.photoURL}
                      alt="photo"
                      className="rounded-full w-8 cursor-pointer ring-2 ring-border ring-offset-1"
                    />
                    <AvatarFallback>
                      {user.displayName ?? user.phoneNumber}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col mt-4 gap-8 bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50  rounded-md border p-4 shadow-md outline-hidden w-80 mr-16">
                  <div className="flex flex-col gap-1 items-center justify-center">
                    <Avatar>
                      <AvatarImage
                        src={user?.photoURL}
                        alt="photo"
                        className="rounded-full cursor-pointer ring-1 ring-border ring-offset-1"
                      />
                      <AvatarFallback className="text-foreground">
                        {user?.displayName}
                      </AvatarFallback>
                    </Avatar>
                    <p>{user?.displayName ?? user?.phoneNumber}</p>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>
                  <Button variant="destructive" onClick={signOut}>
                    Sign out
                  </Button>
                </PopoverContent>
              </Popover>
            ) : (
              <Link to={"/login"}>
                <Button>Sign in</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <div className="pt-2 space-y-2 flex items-center justify-center">
              {user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar>
                      <AvatarImage
                        src={user.photoURL}
                        alt="photo"
                        className="rounded-full w-8 cursor-pointer ring-2 ring-border ring-offset-1"
                      />
                      <AvatarFallback>
                        {user.displayName ?? user.phoneNumber}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className=" flex flex-col mt-4 gap-8 bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50  rounded-md border p-4 shadow-md outline-hidden w-80 mr-16">
                    <div className="flex flex-col gap-1 items-center justify-center">
                      <Avatar>
                        <AvatarImage
                          src={user?.photoURL}
                          alt="photo"
                          className="rounded-full cursor-pointer ring-1 ring-border ring-offset-1"
                        />
                        <AvatarFallback className="text-foreground">
                          {user?.displayName ?? user?.phoneNumber}
                        </AvatarFallback>
                      </Avatar>
                      <p>{user?.displayName ?? user?.phoneNumber}</p>
                      <p className="text-muted-foreground">{user?.email}</p>
                    </div>
                    <Button variant="destructive" onClick={signOut}>
                      Sign out
                    </Button>
                  </PopoverContent>
                </Popover>
              ) : (
                <Link to={"/login"}>
                  <Button>Sign in</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
