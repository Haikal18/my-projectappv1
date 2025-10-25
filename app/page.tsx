import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, User, Hash, Calendar } from "lucide-react";
import ProfileTemplate from "@/template/page";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      
      {/* Profile Template Section */}
      <section className="w-full mb-8 sm:mb-12 lg:mb-16">
        <ProfileTemplate />
      </section>

      {/* Detail Info Section */}
      <main className="w-full max-w-2xl px-4 sm:px-0">
        <Card className="mb-6 border-2 shadow-xl bg-white/95 backdrop-blur-sm border-white/30">
          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 text-gray-900">Informasi Detail</h2>
              <Separator className="bg-gray-300" />
              
              {/* Info Section */}
              <div className="grid gap-3 sm:gap-4 mt-4">
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-full shrink-0">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">Nama Lengkap</p>
                    <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">Muhammad Haikal Bintang</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                  <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-full shrink-0">
                    <Hash className="h-4 w-4 sm:h-5 sm:w-5 text-purple-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">Nomor Induk Mahasiswa</p>
                    <p className="font-semibold text-base sm:text-lg text-gray-900">2210512020</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                  <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-full shrink-0">
                    <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-green-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">Program Studi</p>
                    <p className="font-semibold text-sm sm:text-base text-gray-900">S1 Sistem Informasi</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
                  <div className="p-1.5 sm:p-2 bg-orange-500/20 rounded-full shrink-0">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-orange-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">Tahun Angkatan</p>
                    <p className="font-semibold text-sm sm:text-base text-gray-900">2022</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4 bg-gray-300" />

            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs sm:text-sm text-gray-200 mb-8">
          <p>Built with Next.js & shadcn/ui</p>
          <p className="mt-1">© 2025 Muhammad Haikal Bintang</p>
        </div>
      </main>
    </div>
  );
}
