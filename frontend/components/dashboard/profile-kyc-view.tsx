"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Building,
  Mail,
  Phone,
  Globe,
  Briefcase,
  FileText,
  Upload,
  Camera,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  FileCheck,
  RefreshCw,
  Trash2,
  Award,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface UserProfileData {
  id?: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff?: boolean;
  profile?: {
    company?: string;
    job_title?: string;
    bio?: string;
    phone_number?: string;
    country?: string;
    profile_image_url?: string | null;
    kyc_status?: "unverified" | "pending" | "verified" | "rejected";
    kyc_id_type?: string;
    kyc_id_number?: string;
    kyc_document_url?: string | null;
    kyc_submitted_at?: string | null;
    kyc_verified_at?: string | null;
    kyc_rejection_reason?: string;
  };
}

export function ProfileKycView() {
  const [user, setUser] = React.useState<UserProfileData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [profileSaving, setProfileSaving] = React.useState(false);
  const [kycSubmitting, setKycSubmitting] = React.useState(false);
  const [simulating, setSimulating] = React.useState(false);

  const [profileSuccessMsg, setProfileSuccessMsg] = React.useState<string | null>(null);
  const [profileErrorMsg, setProfileErrorMsg] = React.useState<string | null>(null);
  const [kycSuccessMsg, setKycSuccessMsg] = React.useState<string | null>(null);
  const [kycErrorMsg, setKycErrorMsg] = React.useState<string | null>(null);

  // Profile Form State
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

  // KYC Form State
  const [kycIdType, setKycIdType] = React.useState("passport");
  const [kycIdNumber, setKycIdNumber] = React.useState("");
  const [kycDocFile, setKycDocFile] = React.useState<File | null>(null);
  const [kycConsent, setKycConsent] = React.useState(false);

  const avatarInputRef = React.useRef<HTMLInputElement | null>(null);
  const kycDocInputRef = React.useRef<HTMLInputElement | null>(null);

  // Load User Data
  const loadUserData = React.useCallback(async () => {
    try {
      // Check cache first
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem("gb_user");
        if (cached) {
          const parsed = JSON.parse(cached);
          setUser(parsed);
          populateForm(parsed);
        }
      }

      // Fetch fresh
      const freshUser = await apiClient.get<UserProfileData>("/users/me/");
      if (freshUser) {
        setUser(freshUser);
        populateForm(freshUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("gb_user", JSON.stringify(freshUser));
        }
      }
    } catch {
      // Use cached if available
    } finally {
      setLoading(false);
    }
  }, []);

  const populateForm = (data: UserProfileData) => {
    setFirstName(data.first_name || "");
    setLastName(data.last_name || "");
    setEmail(data.email || "");
    setCompany(data.profile?.company || "");
    setJobTitle(data.profile?.job_title || "");
    setPhone(data.profile?.phone_number || "");
    setCountry(data.profile?.country || "");
    setBio(data.profile?.bio || "");
    if (data.profile?.profile_image_url) {
      setAvatarPreview(data.profile.profile_image_url);
    }
    if (data.profile?.kyc_id_type) {
      setKycIdType(data.profile.kyc_id_type);
    }
    if (data.profile?.kyc_id_number) {
      setKycIdNumber(data.profile.kyc_id_number);
    }
  };

  React.useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Handle Avatar Selection
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setProfileErrorMsg("Image size exceeds 5MB limit.");
      return;
    }

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setProfileErrorMsg(null);
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    if (avatarInputRef.current) {
      avatarInputRef.current.value = "";
    }
  };

  // Submit Profile Changes
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccessMsg(null);
    setProfileErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("first_name", firstName.trim());
      formData.append("last_name", lastName.trim());
      formData.append("email", email.trim());
      formData.append("company", company.trim());
      formData.append("job_title", jobTitle.trim());
      formData.append("phone_number", phone.trim());
      formData.append("country", country.trim());
      formData.append("bio", bio.trim());

      if (avatarFile) {
        formData.append("profile_image", avatarFile);
      } else if (avatarPreview === null && user?.profile?.profile_image_url) {
        // Avatar cleared
        formData.append("profile_image_url", "");
      }

      const res = await apiClient.patch<UserProfileData>("/users/me/", formData);

      if (res) {
        setUser(res);
        if (typeof window !== "undefined") {
          localStorage.setItem("gb_user", JSON.stringify(res));
          window.dispatchEvent(new Event("gb_user_updated"));
        }
        setProfileSuccessMsg("Profile information successfully updated.");
      }
    } catch (err: any) {
      setProfileErrorMsg(
        err?.data?.message || err?.data?.detail || "Failed to update profile information."
      );
    } finally {
      setProfileSaving(false);
    }
  };

  // Submit KYC Documents
  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setKycSubmitting(true);
    setKycSuccessMsg(null);
    setKycErrorMsg(null);

    if (!kycDocFile) {
      setKycErrorMsg("Please attach a valid identification document (PDF, PNG, or JPG).");
      setKycSubmitting(false);
      return;
    }

    if (!kycIdNumber.trim()) {
      setKycErrorMsg("Please enter your official identification document number.");
      setKycSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id_type", kycIdType);
      formData.append("id_number", kycIdNumber.trim());
      formData.append("document", kycDocFile);

      const res = await apiClient.post<any>("/users/kyc/", formData);

      if (res?.user) {
        setUser(res.user);
        if (typeof window !== "undefined") {
          localStorage.setItem("gb_user", JSON.stringify(res.user));
          window.dispatchEvent(new Event("gb_user_updated"));
        }
      }
      setKycSuccessMsg("Identity verification dossier submitted successfully for compliance review.");
      setKycDocFile(null);
      if (kycDocInputRef.current) kycDocInputRef.current.value = "";
    } catch (err: any) {
      setKycErrorMsg(
        err?.data?.message || err?.data?.detail || "KYC submission failed. Please verify documents."
      );
    } finally {
      setKycSubmitting(false);
    }
  };

  // Compliance Review Simulation (Dev / Testing)
  const handleSimulateStatus = async (status: "verified" | "pending" | "unverified" | "rejected") => {
    setSimulating(true);
    try {
      const res = await apiClient.post<any>("/users/kyc/review/", {
        status,
        rejection_reason: status === "rejected" ? "ID document resolution was too low for OCR compliance." : "",
      });

      if (res?.user) {
        setUser(res.user);
        if (typeof window !== "undefined") {
          localStorage.setItem("gb_user", JSON.stringify(res.user));
          window.dispatchEvent(new Event("gb_user_updated"));
        }
      }
    } catch {
      // Ignore
    } finally {
      setSimulating(false);
    }
  };

  const initials = user
    ? user.first_name && user.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : (user.first_name || user.username || "EP").slice(0, 2).toUpperCase()
    : "EP";

  const kycStatus = user?.profile?.kyc_status || "unverified";

  if (loading && !user) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-[var(--text-muted)] font-mono">
        <RefreshCw className="h-4 w-4 animate-spin mr-2 text-[var(--accent-primary)]" />
        <span>Loading Executive Identity Center...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. EXECUTIVE HEADER & STATUS RIBBON                                       */}
      {/* ========================================================================= */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-[var(--border-subtle)] relative overflow-hidden">
        {/* Soft Ambient Glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-[var(--accent-glow)] blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="accent" className="text-[10px] font-mono py-0.5 px-2 font-bold uppercase tracking-wider">
                Identity &amp; Compliance Hub
              </Badge>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                ID #{user?.id || "EP-802"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-heading tracking-tight">
              Executive Profile &amp; Enterprise KYC
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl">
              Manage executive contact metadata, customize your organization profile, and maintain Level 3 enterprise KYC compliance for zero-downtime SLA access.
            </p>
          </div>

          {/* KYC Status Indicator Box */}
          <div className="shrink-0 flex items-center gap-3 p-3.5 rounded-2xl bg-[var(--surface-raised)] border border-[var(--border-subtle)] shadow-xs">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-xs ${
                kycStatus === "verified"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : kycStatus === "pending"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 animate-pulse"
                  : kycStatus === "rejected"
                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                  : "bg-[var(--surface-base)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
              }`}
            >
              {kycStatus === "verified" && <ShieldCheck className="h-6 w-6" />}
              {kycStatus === "pending" && <Clock className="h-6 w-6" />}
              {kycStatus === "rejected" && <ShieldAlert className="h-6 w-6" />}
              {kycStatus === "unverified" && <AlertCircle className="h-6 w-6" />}
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                KYC Compliance Tier
              </span>
              <span className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                {kycStatus === "verified" && (
                  <span className="text-emerald-600 dark:text-emerald-400">Verified Enterprise</span>
                )}
                {kycStatus === "pending" && (
                  <span className="text-amber-600 dark:text-amber-400">Pending Review</span>
                )}
                {kycStatus === "rejected" && (
                  <span className="text-rose-600 dark:text-rose-400">Action Required</span>
                )}
                {kycStatus === "unverified" && (
                  <span className="text-[var(--text-muted)]">Unverified Identity</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DUAL CARD WORKSPACE: PROFILE EDITING & KYC COMPLIANCE                  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT COLUMN: Profile & Avatar Management (7 Cols)                       */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl glass-card p-6 sm:p-8 border border-[var(--border-subtle)] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)] font-heading">
                  Executive Details
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Personal and organization profile synchronized across all telemetry reports.
                </p>
              </div>
              <Badge variant="outline" className="text-[11px] font-mono py-1 px-2.5 font-bold">
                Account ID: {user?.username}
              </Badge>
            </div>

            {/* Profile Feedback Notifications */}
            {profileSuccessMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{profileSuccessMsg}</span>
              </div>
            )}

            {profileErrorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{profileErrorMsg}</span>
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {/* Interactive Avatar Picture Section */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-[var(--surface-raised)] border border-[var(--border-subtle)]">
                <div className="relative group shrink-0">
                  <div className="h-20 w-20 rounded-2xl overflow-hidden bg-gradient-to-tr from-[var(--accent-primary)] to-amber-200 text-[var(--accent-foreground)] font-bold text-xl flex items-center justify-center shadow-md border-2 border-[var(--border-subtle)]">
                    {avatarPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatarPreview}
                        alt="Profile Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 text-white rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] font-bold transition-opacity"
                    title="Change Avatar"
                  >
                    <Camera className="h-5 w-5 mb-0.5" />
                    <span>Upload</span>
                  </button>
                  <input
                    type="file"
                    ref={avatarInputRef}
                    onChange={handleAvatarChange}
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    className="hidden"
                  />
                </div>

                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => avatarInputRef.current?.click()}
                      className="text-xs font-bold gap-1.5 h-8 border-[var(--border-gold)] hover:bg-[var(--accent-primary)]/10"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload Photo</span>
                    </Button>
                    {avatarPreview && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveAvatar}
                        className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 h-8 gap-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remove</span>
                      </Button>
                    )}
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Recommended: Square PNG, JPG, or WebP. Maximum file size: 5MB.
                  </p>
                </div>
              </div>

              {/* Personal Details Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="h-3.5 w-3.5 absolute left-3 top-3.5 text-[var(--text-muted)] pointer-events-none" />
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jane"
                      className="pl-9 h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="h-3.5 w-3.5 absolute left-3 top-3.5 text-[var(--text-muted)] pointer-events-none" />
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="pl-9 h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Work Email & Username */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="h-3.5 w-3.5 absolute left-3 top-3.5 text-[var(--text-muted)] pointer-events-none" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@enterprise.com"
                      className="pl-9 h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Account Username <span className="text-[var(--text-muted)] font-normal">(Permanent)</span>
                  </label>
                  <Input
                    type="text"
                    value={user?.username || ""}
                    disabled
                    className="h-10 text-xs bg-[var(--surface-raised)] border-[var(--border-subtle)] text-[var(--text-muted)] rounded-xl cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Organization & Professional Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <Building className="h-3.5 w-3.5 absolute left-3 top-3.5 text-[var(--text-muted)] pointer-events-none" />
                    <Input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Apex Dynamics"
                      className="pl-9 h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Job Title / Role
                  </label>
                  <div className="relative">
                    <Briefcase className="h-3.5 w-3.5 absolute left-3 top-3.5 text-[var(--text-muted)] pointer-events-none" />
                    <Input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Chief Technology Officer"
                      className="pl-9 h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Phone Number <span className="text-[10px] text-[var(--text-muted)] font-normal">(E.164 e.g. +14155552671)</span>
                  </label>
                  <div className="relative">
                    <Phone className="h-3.5 w-3.5 absolute left-3 top-3.5 text-[var(--text-muted)] pointer-events-none" />
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+14155552671"
                      className="pl-9 h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Country / Headquarters
                  </label>
                  <div className="relative">
                    <Globe className="h-3.5 w-3.5 absolute left-3 top-3.5 text-[var(--text-muted)] pointer-events-none" />
                    <Input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="United States"
                      className="pl-9 h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Bio / Executive Summary */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Executive Bio / Scope of Authority
                </label>
                <div className="relative">
                  <FileText className="h-3.5 w-3.5 absolute left-3 top-3 text-[var(--text-muted)] pointer-events-none" />
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Briefly describe your modernization remit or infrastructure objectives..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[var(--surface-base)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  variant="glow"
                  disabled={profileSaving}
                  className="font-bold text-xs h-10 px-6 rounded-xl shadow-md gap-2"
                >
                  {profileSaving ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Save Profile Changes</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT COLUMN: Enterprise KYC Verification Center (5 Cols)               */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl glass-card p-6 border border-[var(--border-subtle)] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)] font-heading">
                  KYC Verification
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Enterprise compliance and regulatory accreditation.
                </p>
              </div>
              <Badge
                variant={kycStatus === "verified" ? "accent" : "outline"}
                className={`text-[10px] font-mono font-bold uppercase ${
                  kycStatus === "verified" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" : ""
                }`}
              >
                {kycStatus}
              </Badge>
            </div>

            {/* KYC Feedback Notifications */}
            {kycSuccessMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{kycSuccessMsg}</span>
              </div>
            )}

            {kycErrorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{kycErrorMsg}</span>
              </div>
            )}

            {/* =================================================================== */}
            {/* STATE A: VERIFIED CERTIFICATE SEAL                                  */}
            {/* =================================================================== */}
            {kycStatus === "verified" ? (
              <div className="space-y-4">
                <div className="rounded-2xl p-5 border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-[var(--surface-raised)] to-[var(--surface-base)] space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[var(--text-primary)]">
                          Certificate of Accreditation
                        </h4>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                          SOC 2 Type II &amp; AML Tier 3
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold">
                      ACTIVE
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 text-xs border-t border-emerald-500/20 text-[var(--text-secondary)]">
                    <div className="flex justify-between">
                      <span>Accredited Entity:</span>
                      <strong className="text-[var(--text-primary)] font-mono">
                        {company || `${firstName} ${lastName}`}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Document Type:</span>
                      <strong className="text-[var(--text-primary)] font-mono capitalize">
                        {user?.profile?.kyc_id_type || "Government Passport"}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Document Ref:</span>
                      <strong className="text-[var(--text-primary)] font-mono">
                        {user?.profile?.kyc_id_number
                          ? `•••• •••• ${user.profile.kyc_id_number.slice(-4)}`
                          : "•••• •••• 8842"}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Verified On:</span>
                      <strong className="text-[var(--text-primary)] font-mono">
                        {user?.profile?.kyc_verified_at
                          ? new Date(user.profile.kyc_verified_at).toLocaleDateString()
                          : "Oct 2026"}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--surface-raised)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] space-y-1">
                  <div className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Unlocked Production Entitlements:</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>99.99% Financial Uptime SLA Guarantee</li>
                    <li>Uncapped High-Capacity Telemetry Webhooks</li>
                    <li>Direct Dedicated Engineering Support Escalation</li>
                  </ul>
                </div>
              </div>
            ) : kycStatus === "pending" ? (
              /* =================================================================== */
              /* STATE B: PENDING COMPLIANCE AUDIT                                   */
              /* =================================================================== */
              <div className="space-y-4">
                <div className="rounded-2xl p-5 border border-amber-500/30 bg-amber-500/5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                      <Clock className="h-5 w-5 animate-spin" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)]">
                        Compliance Dossier In Queue
                      </h4>
                      <p className="text-[10px] text-[var(--text-muted)] font-mono">
                        Submitted:{" "}
                        {user?.profile?.kyc_submitted_at
                          ? new Date(user.profile.kyc_submitted_at).toLocaleString()
                          : "Just now"}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)]">
                    Our compliance engineering auditors are reviewing your uploaded government identity documentation. Average review latency is under 2 business hours.
                  </p>
                </div>
              </div>
            ) : (
              /* =================================================================== */
              /* STATE C: UNVERIFIED OR REJECTED (SUBMISSION FORM)                   */
              /* =================================================================== */
              <form onSubmit={handleKycSubmit} className="space-y-4">
                {kycStatus === "rejected" && (
                  <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4" />
                      <span>Document Resubmission Required</span>
                    </div>
                    <p className="text-[11px]">
                      Reason: {user?.profile?.kyc_rejection_reason || "ID document was unclear. Please provide a high-resolution scan."}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Government Identification Type
                  </label>
                  <select
                    value={kycIdType}
                    onChange={(e) => setKycIdType(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-[var(--surface-base)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                  >
                    <option value="passport">International Passport</option>
                    <option value="national_id">National Identity Card</option>
                    <option value="drivers_license">Driver&apos;s License</option>
                    <option value="tax_certificate">Corporate Tax / Incorporation Certificate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Official Document ID / Passport Number
                  </label>
                  <Input
                    type="text"
                    value={kycIdNumber}
                    onChange={(e) => setKycIdNumber(e.target.value)}
                    placeholder="e.g. USA-99482710 or GBR-849201"
                    className="h-10 text-xs bg-[var(--surface-base)] border-[var(--border-strong)] rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Identity Document File Scan <span className="text-[var(--text-muted)] font-normal">(PDF, JPG, PNG)</span>
                  </label>
                  <div
                    onClick={() => kycDocInputRef.current?.click()}
                    className="border-2 border-dashed border-[var(--border-subtle)] hover:border-[var(--accent-primary)] rounded-2xl p-5 text-center cursor-pointer transition-colors bg-[var(--surface-raised)]"
                  >
                    {kycDocFile ? (
                      <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <FileCheck className="h-5 w-5" />
                        <span className="truncate max-w-[220px]">{kycDocFile.name}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          ({(kycDocFile.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="h-6 w-6 mx-auto text-[var(--text-muted)]" />
                        <div className="text-xs font-semibold text-[var(--text-primary)]">
                          Click to browse identity document
                        </div>
                        <p className="text-[10px] text-[var(--text-muted)]">
                          Maximum file size: 10MB
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={kycDocInputRef}
                    onChange={(e) => setKycDocFile(e.target.files?.[0] || null)}
                    accept="application/pdf,image/png,image/jpeg,image/webp"
                    className="hidden"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={kycConsent}
                    onChange={(e) => setKycConsent(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-[var(--border-strong)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                    required
                  />
                  <label htmlFor="consent" className="text-[11px] text-[var(--text-secondary)] leading-tight">
                    I attest that the submitted identity documentation is authentic, legally registered, and belongs to the named officer.
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="glow"
                  disabled={kycSubmitting || !kycConsent}
                  className="w-full font-bold text-xs h-10 rounded-xl shadow-md gap-2"
                >
                  {kycSubmitting ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Transmitting Documents...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Submit Verification Dossier</span>
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* =================================================================== */}
            {/* 3. SIMULATION & TESTING CONTROL BAR                                 */}
            {/* =================================================================== */}
            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-[var(--text-muted)] font-semibold flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-[var(--accent-primary)]" />
                  Compliance Lifecycle Sandbox:
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={simulating}
                  onClick={() => handleSimulateStatus("verified")}
                  className={`text-[10px] font-mono h-7 px-2 font-bold ${
                    kycStatus === "verified" ? "border-emerald-500 text-emerald-600 bg-emerald-500/10" : ""
                  }`}
                  title="Simulate approved KYC state"
                >
                  <span>✓ Verified</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={simulating}
                  onClick={() => handleSimulateStatus("pending")}
                  className={`text-[10px] font-mono h-7 px-2 font-bold ${
                    kycStatus === "pending" ? "border-amber-500 text-amber-600 bg-amber-500/10" : ""
                  }`}
                  title="Simulate pending review state"
                >
                  <span>⏳ Pending</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={simulating}
                  onClick={() => handleSimulateStatus("unverified")}
                  className={`text-[10px] font-mono h-7 px-2 font-bold ${
                    kycStatus === "unverified" ? "border-[var(--border-gold)] text-[var(--accent-primary)]" : ""
                  }`}
                  title="Reset to unverified state"
                >
                  <span>↺ Reset</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
