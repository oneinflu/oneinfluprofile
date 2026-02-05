"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { AvatarAddButton } from "@/components/base/avatar/base-components/avatar-add-button";
import { ComboBox } from "@/components/base/select/combobox";
import { Select } from "@/components/base/select/select";
import { Badge, BadgeWithButton } from "@/components/base/badges/badges";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";
import { cx } from "@/utils/cx";

interface ChipsInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  items: string[];
  onRemoveItem: (item: string) => void;
  placeholder?: string;
  hint?: string;
}

function ChipsInput({ label, value, onChange, onKeyDown, items, onRemoveItem, placeholder, hint }: ChipsInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full">
      <label className="text-xs font-semibold text-primary mb-1.5 block">{label}</label>
      <div 
        className={cx(
          "relative flex w-full flex-wrap gap-2 items-center rounded-lg bg-primary shadow-xs ring-1 ring-secondary transition-shadow duration-100 ease-linear ring-inset focus-within:ring-2 focus-within:ring-brand px-3 py-2 min-h-[44px]",
          "cursor-text"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {items.map((item, i) => (
          <BadgeWithButton 
            key={i}
            type="pill-color" 
            color="gray"
            onButtonClick={(e) => {
              e?.stopPropagation();
              onRemoveItem(item);
            }}
          >
            {item}
          </BadgeWithButton>
        ))}
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={items.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-primary placeholder:text-tertiary"
        />
      </div>
      {hint && <p className="mt-1.5 text-sm text-tertiary">{hint}</p>}
    </div>
  );
}

interface ProfileInfoProps {
  initialData: any;
  niches: Array<{ id: string; name: string }>;
  onUpdate: () => void;
}

export function ProfileInfo({ initialData, niches, onUpdate }: ProfileInfoProps) {
  const { token, user, uploadAvatarById, updateUserById } = useAuth();
  
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [role, setRole] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [contentTypeInput, setContentTypeInput] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [brandInput, setBrandInput] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [saveSuccessProfile, setSaveSuccessProfile] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const data = initialData?.profile || initialData || {};
    
    if (data) {
      setName(data.name || "");
      setUsername(data.username || "");
      setOriginalUsername(data.username || "");
      
      const rawNiche = data.niche || data.nicheName || data.category || "";
      setRole(rawNiche);
      setRoleInput(rawNiche);
      
      setTags(data.contentTags || data.tags || []);
      setContentTypes(data.contentType || []);
      setBrands(data.brandNames || data.brands || []);
      setBio(data.shortBio || data.bio || "");
      setPhotoUrl(data.avatarUrl || null);
    }
  }, [initialData]);

  const filteredNiches = useMemo(() => {
    const term = roleInput.toLowerCase();
    const seen = new Set<string>();
    const results: Array<{ id: string; label: string }> = [];

    if (role && (!term || role.toLowerCase().includes(term))) {
      results.push({ id: role, label: role });
      seen.add(role);
    }

    for (const n of niches) {
      if (!seen.has(n.name) && (!term || n.name.toLowerCase().includes(term))) {
        results.push({ id: n.name, label: n.name });
        seen.add(n.name);
      }
    }
    
    return results;
  }, [niches, roleInput, role]);

  const handlePhotoPick = () => fileInputRef.current?.click();
  
  const handlePhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      (async () => {
        try {
          if (!user?.id) return;
          const url = await uploadAvatarById(user.id, file);
          setPhotoUrl(url);
          onUpdate(); // Trigger preview update
        } catch {}
      })();
    }
  };

  const handleSave = async () => {
    try {
      setIsSavingProfile(true);
      setSaveSuccessProfile(false);
      if (!token || !user?.id) return;
      
      const val = String(username || "").trim().toLowerCase();
      const orig = String(originalUsername || "").trim().toLowerCase();
      
      if (val && val !== orig) {
        const chk = await api.get<{ success: boolean; status: string; data: { available: boolean } }>(`/auth/username/check?username=${encodeURIComponent(val)}`, { token });
        if (!chk.data?.available) {
          setUsernameError("Username not available");
          return;
        }
      }
      
      const data: Record<string, unknown> = {};
    if (name) data.name = name;
    if (val) data.username = val;
    data.shortBio = bio;
    data.contentTags = tags;
    data.contentType = contentTypes;
    data.brandNames = brands;
    data.brands = brands;
    if (role) data.niche = role;
      
      await updateUserById(user.id, data);
      
      if (val) setOriginalUsername(val);
      setUsernameError(null);
      
      onUpdate();
      setSaveSuccessProfile(true);
      setTimeout(() => setSaveSuccessProfile(false), 3000);
    } catch {
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
      <div className="flex items-start gap-4">
        <div className="relative">
          <AvatarProfilePhoto size="md" src={photoUrl} alt={name} initials={name?.[0] || "U"} />
          <AvatarAddButton size="sm" title="Change photo" className="absolute -bottom-1 -right-1" onPress={handlePhotoPick} />
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoSelected} />
        </div>
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          <Input label="Name" size="md" value={name} onChange={(val) => { setName(val); }} placeholder="Your name" />
          <ComboBox
            label="Your Niche"
            size="md"
            placeholder="Select Niche"
            selectedKey={role || null}
            inputValue={roleInput}
            onInputChange={setRoleInput}
            items={filteredNiches}
            onSelectionChange={(key) => {
              const val = String(key || "");
              setRole(val);
              setRoleInput(val);
            }}
          >
            {(item) => <Select.Item id={item.id} textValue={item.label}>{item.label}</Select.Item>}
          </ComboBox>
        </div>
      </div>
     
      <div className="mt-4">
        <Input
          label="Username"
          size="md"
          value={username}
          onChange={(val) => {
            setUsername(val);
            setUsernameError(null);
          }}
          isInvalid={Boolean(usernameError)}
          hint={typeof usernameError === "string" ? usernameError : undefined}
          placeholder="username"
        />
      </div>
     
      <div className="mt-4">
        <ChipsInput
          label="Content Tags"
          value={tagInput}
          onChange={setTagInput}
          items={tags}
          onRemoveItem={(item) => setTags(tags.filter(t => t !== item))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const val = tagInput.trim();
              if (val && !tags.includes(val)) {
                setTags([...tags, val]);
                setTagInput("");
              }
            }
          }}
          placeholder="Add tags (e.g. Tech, Vlogging) and press Enter"
          hint="Press Enter to add"
        />
      </div>

      <div className="mt-4">
        <ChipsInput
          label="Content Type"
          value={contentTypeInput}
          onChange={setContentTypeInput}
          items={contentTypes}
          onRemoveItem={(item) => setContentTypes(contentTypes.filter(t => t !== item))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const val = contentTypeInput.trim();
              if (val && !contentTypes.includes(val)) {
                setContentTypes([...contentTypes, val]);
                setContentTypeInput("");
              }
            }
          }}
          placeholder="Add content type (e.g. video, photo) and press Enter"
          hint="Press Enter to add"
        />
      </div>

      <div className="mt-4">
        <ChipsInput
          label="Brand Names"
          value={brandInput}
          onChange={setBrandInput}
          items={brands}
          onRemoveItem={(item) => setBrands(brands.filter(b => b !== item))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const val = brandInput.trim();
              if (val && !brands.includes(val)) {
                setBrands([...brands, val]);
                setBrandInput("");
              }
            }
          }}
          placeholder="Add brands (e.g. Nike, Apple) and press Enter"
          hint="Press Enter to add"
        />
      </div>
     
      <div className="mt-4">
        <TextArea
          label="Short bio"
          value={bio}
          onChange={(val) => { setBio(val.slice(0, 150)); }}
          placeholder="Tell people about yourself (max 150 characters)"
          rows={4}
          hint={`${bio.length}/150`}
        />
        <div className="mt-3 flex items-center justify-end gap-3">
          <Button
            size="md"
            color="primary"
            isLoading={isSavingProfile}
            onClick={handleSave}
          >
            Save changes
          </Button>
          {saveSuccessProfile && (
            <Badge type="pill-color" size="md" color="success">
              Information updated
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
