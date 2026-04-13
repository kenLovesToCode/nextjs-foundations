import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";

export default function CustomizedComponents() {
  return (
    <div className="p-8 space-y-6">
      {/* Add spacing and width utilities */}
      <Button className="w-full py-3">Full Width Button</Button>

      {/* Add border and shadow customizations */}
      <Card className="border-dashed border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-purple-600">
            Custom Styled Card
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-gradient-to-r from-blue-50 to-purple-50">
          <p>This card has custom border, shadow, and background styling.</p>
        </CardContent>
      </Card>
    </div>
  );
}
