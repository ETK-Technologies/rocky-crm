"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { IMAGE_PATHS } from "@/lib/constants/images";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Illustration */}
        <div className="relative w-full h-64 md:h-80 mb-8">
          <Image
            src={IMAGE_PATHS.ILLUSTRATIONS.ERROR_404}
            alt="404 Error Illustration"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-secondary-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off. Let's
          get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Link href="/dashboard">
            <Button className="flex items-center gap-2 w-full sm:w-auto">
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
