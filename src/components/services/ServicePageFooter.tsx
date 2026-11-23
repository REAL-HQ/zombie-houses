import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function ServicePageFooter() {
  return <footer className="border-t border-service-border bg-service-background px-5 py-8 text-service-muted">
    <nav aria-label="Service page footer" className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2">
      <Button asChild variant="link" className="min-h-12 px-0 text-service-muted"><Link to="/privacy">Privacy</Link></Button>
      <Button asChild variant="link" className="min-h-12 px-0 text-service-muted"><Link to="/terms">Terms</Link></Button>
      <Button asChild variant="link" className="min-h-12 px-0 text-service-muted"><Link to="/sms-terms">SMS Terms</Link></Button>
      <Button asChild variant="link" className="min-h-12 whitespace-normal px-0 text-service-foreground md:ml-auto"><Link to="/services">More Zombie Houses Services</Link></Button>
    </nav>
  </footer>;
}
