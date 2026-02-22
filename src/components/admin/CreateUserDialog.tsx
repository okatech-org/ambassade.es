"use client";

import { api } from "@convex/_generated/api";
import { Check, Loader2, Mail, Plus, User } from "lucide-react";
import { useId, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useConvexMutationQuery } from "@/integrations/convex/hooks";

export function CreateUserDialog() {
	const uid = useId();
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [poste, setPoste] = useState("");
	const [role, setRole] = useState<"user" | "admin">("admin");

	const { mutate: createUser, isPending } = useConvexMutationQuery(
		api.functions.admin.createManagedUser,
	);

	const isValid = name.trim().length > 1 && email.includes("@");

	const handleCreate = async () => {
		if (!isValid) return;
		try {
			await createUser({
				name: name.trim(),
				email: email.trim().toLowerCase(),
				role,
				poste: poste.trim() || undefined,
			});
			toast.success(`Utilisateur ${name} créé avec succès`);
			setOpen(false);
			setName("");
			setEmail("");
			setPoste("");
			setRole("admin");
		} catch (err) {
			toast.error(
				err instanceof Error ? err.message : "Erreur lors de la création",
			);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm" className="gap-1.5">
					<Plus className="w-4 h-4" />
					Créer un utilisateur
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[460px]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<User className="w-5 h-5" />
						Nouvel utilisateur
					</DialogTitle>
					<DialogDescription>
						Créez un compte administrateur. L'utilisateur pourra se connecter
						via Clerk avec cet email.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<Label htmlFor={`${uid}-name`}>Nom complet</Label>
						<Input
							id={`${uid}-name`}
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Jean Dupont"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor={`${uid}-email`}>
							<Mail className="w-3.5 h-3.5 inline mr-1" />
							Email
						</Label>
						<Input
							id={`${uid}-email`}
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="jean.dupont@consulatdugabon.fr"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor={`${uid}-poste`}>Poste / Fonction</Label>
						<Input
							id={`${uid}-poste`}
							value={poste}
							onChange={(e) => setPoste(e.target.value)}
							placeholder="Ex: Vice-Consul, Secrétaire..."
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor={`${uid}-role`}>Rôle</Label>
						<Select
							value={role}
							onValueChange={(v) => setRole(v as "user" | "admin")}
						>
							<SelectTrigger id={`${uid}-role`}>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="admin">
									Admin — accès au panneau d'administration
								</SelectItem>
								<SelectItem value="user">
									Utilisateur — accès public uniquement
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => setOpen(false)}
						disabled={isPending}
					>
						Annuler
					</Button>
					<Button
						onClick={handleCreate}
						disabled={!isValid || isPending}
						className="min-w-[140px]"
					>
						{isPending ? (
							<Loader2 className="w-4 h-4 mr-2 animate-spin" />
						) : (
							<Check className="w-4 h-4 mr-2" />
						)}
						Créer
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
