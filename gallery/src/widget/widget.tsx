import { GallerySection } from "../section/section";
import { Button1Gallery } from "./button-1";
import { Button2Gallery } from "./button-2";
import { Button3Gallery } from "./button-3";
import { CheckboxGallery } from "./checkbox";
import { DialogGallery } from "./dialog";
import { Input1Gallery } from "./input-1";
import { Input2Gallery } from "./input-2";
import { PaginationGallery } from "./pagination";
import { PaneGallery } from "./pane";
import { ProgressGallery } from "./progress";
import { SelectGallery } from "./select";
import { TabGallery } from "./tab";
import { TableGallery } from "./table";
import { TextAreaGallery } from "./text-area";
import { ToastGallery } from "./toast";
import { TooltipGallery } from "./tooltip";

export const WidgetGallery = () => (
	<div className="space-y-32">
		<GallerySection title="Buttons">
			<Button1Gallery />
			<Button3Gallery />
			<Button2Gallery />
		</GallerySection>
		<GallerySection title="Text fields">
			<Input1Gallery />
			<Input2Gallery />
			<TextAreaGallery />
		</GallerySection>
		<GallerySection title="Selection controls">
			<SelectGallery />
			<CheckboxGallery />
			<PaginationGallery />
		</GallerySection>
		<GallerySection title="Feedback">
			<ToastGallery />
			<TooltipGallery />
			<ProgressGallery />
		</GallerySection>
		<GallerySection title="Container">
			<DialogGallery />
			<PaneGallery />
			<TabGallery />
		</GallerySection>
		<GallerySection title="Table">
			<div className="col-span-full">
				<TableGallery />
			</div>
		</GallerySection>
	</div>
);
