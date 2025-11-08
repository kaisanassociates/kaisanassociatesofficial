import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import apiService from '@/lib/api';
import { Loader2, Check, ChevronLeft } from 'lucide-react';

// Zod schema covering volunteer fields
const volunteerSchema = z.object({
  fullName: z.string().min(2,'Required'),
  age: z.string().optional(),
  gender: z.enum(['Male','Female','Other'], { required_error: 'Select gender' }),
  whatsappNumber: z.string().min(5,'Enter valid number'),
  place: z.string().min(2,'Required'),
  organization: z.string().min(1,'Required'),
  isNilgiriStudent: z.enum(['Yes','No']),
  previousExperience: z.string().min(1,'Required'),
  skills: z.string().min(1,'Required'),
  contribution: z.string().min(1,'Required'),
  preferredAreas: z.array(z.string()).min(1,'Select at least one'),
  preferredAreasOther: z.string().optional(),
  availableOnDec13: z.enum(['Yes','No']),
  availability: z.enum(['Full-time','Not available','Part-time']),
  availabilityTime: z.string().optional(),
  motivation: z.string().min(10,'Add more detail').max(1500),
  agreesToConduct: z.literal(true, { errorMap: () => ({ message: 'You must agree' }) }),
  signature: z.string().min(2,'Required'),
  date: z.string().min(4,'Required'),
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;

const AREAS = [
  'Reception','Food','Hospitality','Registration','Documentation / Editorial','Technical','Stage Management','Decoration','Other'
];

interface Props { onSuccess?: (data:any)=>void }

const VolunteerRegistrationForm = ({ onSuccess }: Props) => {
  const [step,setStep] = useState(1);
  const [submitting,setSubmitting] = useState(false);
  const { register, handleSubmit, watch, setValue, trigger, formState:{ errors } } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { preferredAreas: [], isNilgiriStudent:'No', availableOnDec13:'Yes', availability:'Full-time', agreesToConduct:false }
  });

  const preferredAreas = watch('preferredAreas');
  const availability = watch('availability');

  const toggleArea = (area:string) => {
    const current = preferredAreas || [];
    if (current.includes(area)) {
      setValue('preferredAreas', current.filter(a=>a!==area));
    } else {
      setValue('preferredAreas', [...current, area]);
    }
  };

  const next = async () => {
    let fields: (keyof VolunteerFormData)[] = [];
    if (step===1) fields = ['fullName','age','gender','whatsappNumber','place','organization','isNilgiriStudent'];
    if (step===2) fields = ['previousExperience','skills','contribution'];
    if (step===3) fields = ['preferredAreas','availableOnDec13','availability'];
    if (step===4) fields = ['motivation'];
    const valid = await trigger(fields);
    if (valid) setStep(s=>s+1);
  };

  const prev = () => setStep(s=>Math.max(1,s-1));

  const onSubmit = async (data: VolunteerFormData) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        isNilgiriStudent: data.isNilgiriStudent === 'Yes',
        availableOnDec13: data.availableOnDec13 === 'Yes',
        agreesToConduct: data.agreesToConduct,
        preferredAreas: data.preferredAreas,
      };
      const res = await apiService.registerVolunteer(payload);
      if (res.success) {
        toast.success('Volunteer registration submitted. Thank you!');
        onSuccess?.(res.data);
      } else {
        toast.error(res.error || 'Submission failed');
      }
    } catch(e:any) {
      toast.error(e.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-4xl font-bold text-center mb-2">Volunteer Registration</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">Join the INFLUENCIA crew and help create a high-clarity, high-impact experience for everyone attending.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 text-xs tracking-wide uppercase font-medium">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`h-2 rounded-full transition-all ${i<=step? 'bg-primary w-12':'bg-border w-8'}`}></div>
          ))}
        </div>

        {step===1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold">Section 1: Personal Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Full Name" error={errors.fullName?.message}><Input {...register('fullName')} placeholder="Your full name" /></Field>
              <Field label="Age"><Input {...register('age')} placeholder="18" type="number" /></Field>
              <Field label="Gender" error={errors.gender?.message} className="md:col-span-2">
                <RadioGroup
                  onValueChange={v=>setValue('gender', v as any)}
                  className="flex gap-6"
                >
                  {['Male','Female','Other'].map(g => (
                    <div key={g} className="flex items-center space-x-2">
                      <RadioGroupItem value={g} id={g} />
                      <Label htmlFor={g}>{g}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </Field>
              <Field label="WhatsApp Number" error={errors.whatsappNumber?.message}><Input {...register('whatsappNumber')} placeholder="Include country code" /></Field>
              <Field label="Place" error={errors.place?.message}><Input {...register('place')} placeholder="City / Town" /></Field>
              <Field label="Organization / Institution" error={errors.organization?.message}><Input {...register('organization')} placeholder="College or organization" /></Field>
              <Field label="Student of Nilgiri College?" className="md:col-span-2">
                <RadioGroup onValueChange={v=>setValue('isNilgiriStudent', v as any)} className="flex gap-6">
                  {['Yes','No'].map(o => (
                    <div key={o} className="flex items-center space-x-2">
                      <RadioGroupItem value={o} id={`nilgiri-${o}`} />
                      <Label htmlFor={`nilgiri-${o}`}>{o}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </Field>
            </div>
          </div>
        )}

        {step===2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold">Section 2: Experience & Expertise</h2>
            <Field label="Previous Volunteering Experience" error={errors.previousExperience?.message}>
              <Textarea rows={5} {...register('previousExperience')} placeholder="List events or type 'None'" />
            </Field>
            <Field label="Area of Expertise / Skills" error={errors.skills?.message}>
              <Textarea rows={4} {...register('skills')} placeholder="Communication, photography, organizing..." />
            </Field>
            <Field label="Your Contribution to INFLUENCIA" error={errors.contribution?.message}>
              <Textarea rows={4} {...register('contribution')} placeholder="How do you plan to add value?" />
            </Field>
          </div>
        )}

        {step===3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold">Section 3: Event Involvement</h2>
            <Field label="Preferred Volunteer Areas" error={errors.preferredAreas?.message}>
              <div className="grid sm:grid-cols-2 gap-3">
                {AREAS.map(a => (
                  <button
                    key={a}
                    type="button"
                    onClick={()=>toggleArea(a)}
                    className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${preferredAreas.includes(a)?'bg-primary text-white border-primary shadow':'bg-background border-border hover:border-primary/60'}`}
                  >{a}</button>
                ))}
              </div>
              {preferredAreas.includes('Other') && (
                <div className="mt-3">
                  <Input placeholder="Specify other area" {...register('preferredAreasOther')} />
                </div>
              )}
            </Field>
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Available on December 13?" className="md:col-span-1">
                <RadioGroup onValueChange={v=>setValue('availableOnDec13', v as any)} className="flex gap-6">
                  {['Yes','No'].map(o => (
                    <div key={o} className="flex items-center space-x-2"><RadioGroupItem value={o} id={`dec13-${o}`} /><Label htmlFor={`dec13-${o}`}>{o}</Label></div>
                  ))}
                </RadioGroup>
              </Field>
              <Field label="Availability" className="md:col-span-1">
                <RadioGroup onValueChange={v=>setValue('availability', v as any)} className="flex flex-wrap gap-6">
                  {['Full-time','Not available','Part-time'].map(o => (
                    <div key={o} className="flex items-center space-x-2"><RadioGroupItem value={o} id={`avail-${o}`} /><Label htmlFor={`avail-${o}`}>{o}</Label></div>
                  ))}
                </RadioGroup>
                {availability==='Part-time' && (
                  <div className="mt-3"><Input placeholder="Mention time (e.g., 1pm - 4pm)" {...register('availabilityTime')} /></div>
                )}
              </Field>
            </div>
          </div>
        )}

        {step===4 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold">Section 4: Motivation & Conduct</h2>
            <Field label="Why should we choose you?" error={errors.motivation?.message}>
              <Textarea rows={6} {...register('motivation')} placeholder="Describe your strengths, attitude, reliability..." />
            </Field>
            <Field label="Do you agree to follow instructions & maintain discipline?" error={errors.agreesToConduct?.message}>
              <div className="flex items-center space-x-3 p-4 rounded-xl border bg-background/50">
                <Checkbox onCheckedChange={v=>setValue('agreesToConduct', !!v)} />
                <span className="text-sm">I agree</span>
              </div>
            </Field>
          </div>
        )}

        {step===5 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold">Section 5: Declaration</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Signature (type full name)" error={errors.signature?.message}><Input {...register('signature')} placeholder="Full name" /></Field>
              <Field label="Date" error={errors.date?.message}><Input type="date" {...register('date')} /></Field>
            </div>
            <p className="text-xs text-muted-foreground">Submitting confirms the information provided is true to the best of your knowledge.</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          {step>1 && (
            <Button type="button" variant="outline" onClick={prev} className="px-6"><ChevronLeft className="h-4 w-4 mr-1" /> Back</Button>
          )}
          {step<5 && (
            <Button type="button" onClick={next} className="flex-1">Next <Check className="h-4 w-4 ml-1" /></Button>
          )}
          {step===5 && (
            <Button disabled={submitting} type="submit" className="flex-1">
              {submitting ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</>) : (<>Submit Registration</>)}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

// Reusable field wrapper
const Field = ({ label, error, className='', children }: { label: string; error?: string; className?: string; children: any }) => (
  <div className={`space-y-2 ${className}`}>
    <Label className="font-medium text-sm tracking-wide">{label} <span className="text-primary/60">*</span></Label>
    {children}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

export default VolunteerRegistrationForm;
