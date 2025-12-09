"use client";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface WizardStep {
	id: string;
	title: string;
	description?: string;
	component: React.ReactNode;
	validation?: () => boolean | Promise<boolean>;
	onStepComplete?: () => void;
}

interface StepComponentProps {
	isActive?: boolean;
	data?: Record<string, unknown>;
	onUpdate?: (data: Record<string, unknown>) => void;
}

interface WizardProps {
	steps: WizardStep[];
	onComplete?: (data: Record<string, unknown>) => void;
	className?: string;
	showProgress?: boolean;
	allowBackNavigation?: boolean;
	showSummary?: boolean;
}

export function Wizard({
	steps,
	onComplete,
	className,
	showProgress = true,
	allowBackNavigation = true,
	showSummary,
}: WizardProps) {
	const [currentStep, setCurrentStep] = React.useState(0);
	const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(new Set());
	const [isValidating, setIsValidating] = React.useState(false);

	const progress = ((currentStep + 1) / steps.length) * 100;
	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === steps.length - 1;
	// const canProceed = completedSteps.has(currentStep);

	const goToStep = async (stepIndex: number) => {
		const currentStepData = steps[currentStep];
		if (currentStepData.validation) {
			setIsValidating(true);

			try {
				const isValid = await currentStepData.validation();
				if (isValid) {
					setCompletedSteps((prev) => new Set([...prev, currentStep]));
				} else {
					setCompletedSteps((prev) => {
						const newSet = new Set([...prev]);
						newSet.delete(currentStep);
						return newSet;
					});
				}
			} catch (error) {
				console.error("Validation failed:", error);
			} finally {
				setIsValidating(false);
			}
		}

		if (stepIndex >= 0 && stepIndex < steps.length) {
			setCurrentStep(stepIndex);
		}
	};

	const goToNextStep = async () => {
		const currentStepData = steps[currentStep];

		if (currentStepData.validation) {
			setIsValidating(true);
			try {
				const isValid = await currentStepData.validation();
				if (isValid) {
					setCompletedSteps((prev) => new Set([...prev, currentStep]));

					if (isLastStep) {
						onComplete?.({});
					} else {
						currentStepData.onStepComplete?.();
						goToStep(currentStep + 1);
					}
				}
			} catch (error) {
				console.error("Validation failed:", error);
			} finally {
				setIsValidating(false);
			}
		} else {
			setCompletedSteps((prev) => new Set([...prev, currentStep]));

			if (isLastStep) {
				onComplete?.({});
			} else {
				goToStep(currentStep + 1);
			}
		}
	};

	const goToPreviousStep = () => {
		if (!isFirstStep && allowBackNavigation) {
			goToStep(currentStep - 1);
		}
	};

	// need to check each previous not length
	const isFinalStepCanSubmit = [...Array(steps.length - 1).keys()].every((step) =>
		completedSteps.has(step),
	);
	const disableSubmit = isLastStep && !isFinalStepCanSubmit;

	return (
		<div className={cn("space-y-6", className)}>
			{/* Progress Header */}
			{showProgress && (
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="font-display">
									Step {currentStep + 1} of {steps.length}
								</CardTitle>
								<CardDescription>{steps[currentStep].title}</CardDescription>
							</div>
							<Badge variant="outline" className="font-mono">
								{Math.round(progress)}%
							</Badge>
						</div>
						<ProgressBar value={progress} className="h-2" />
					</CardHeader>
				</Card>
			)}

			{/* Step Progress Indicators */}
			<div className="flex items-center gap-4">
				{steps.map((step, index) => (
					<div
						key={step.id}
						className={cn(
							"pointer-events-none flex h-8 items-center gap-2 rounded-md px-5 font-medium",
							index === currentStep
								? "bg-moloch-500 text-scroll-100"
								: "bg-moloch-800 text-scroll-100",
						)}
					>
						<span
							className={cn(
								"flex h-4 w-4 items-center justify-center rounded-sm font-body font-bold text-[12px] leading-none",
								index === currentStep
									? "bg-scroll-100 text-moloch-500"
									: "bg-moloch-500 text-moloch-800",
							)}
						>
							{index + 1}
						</span>
						<span className="type-body-md hidden font-body sm:inline">{step.title}</span>
					</div>
				))}
			</div>

			{/* <Separator /> */}

			{/* Current Step Content */}
			<div>
				<div className="mb-7 text-heading-md">{steps[currentStep].title}</div>
				{steps[currentStep].description && (
					<CardDescription>{steps[currentStep].description}</CardDescription>
				)}
				<div className="min-h-[300px]">
					{React.isValidElement(steps[currentStep].component)
						? React.cloneElement(steps[currentStep].component, {
								isActive: true,
								data: {},
								onUpdate: () => {},
							} as StepComponentProps)
						: steps[currentStep].component}
				</div>
			</div>

			{/* Navigation Buttons */}
			<div className="flex items-center justify-end gap-4">
				{!isFirstStep && (
					<Button
						size={null}
						onClick={goToPreviousStep}
						disabled={!allowBackNavigation}
						className="contact-btn-active"
					>
						<ChevronLeft className="h-4 w-4" />
						<span>Previous</span>
					</Button>
				)}

				<Button
					onClick={goToNextStep}
					disabled={isValidating || (isLastStep && disableSubmit)}
					size={null}
					className="contact-btn-active"
				>
					{isLastStep ? (
						<span>Complete</span>
					) : (
						<>
							<span>Next</span>
							<ChevronRight className="h-4 w-4" />
						</>
					)}
				</Button>
			</div>

			{/* Step Summary */}
			{showSummary && (
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Progress Summary</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{steps.map((step, index) => (
								<div
									key={step.id}
									className={cn(
										"flex items-center justify-between rounded-md p-2",
										completedSteps.has(index)
											? "border border-scroll-500/30 bg-scroll-500/20"
											: index === currentStep
												? "border border-moloch-500/30 bg-moloch-500/20"
												: "bg-muted/50",
									)}
								>
									<span className="font-medium text-sm">{step.title}</span>
									<div className="flex items-center space-x-2">
										{completedSteps.has(index) && (
											<Badge variant="secondary" className="bg-scroll-500 text-black">
												<Check className="mr-1 h-3 w-3" />
												Complete
											</Badge>
										)}
										{index === currentStep && <Badge variant="moloch">Current</Badge>}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
