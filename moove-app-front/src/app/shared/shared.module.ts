import { APP_BASE_HREF, CommonModule, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from '@service/core/interceptor.service';
import { DadosCadastroModule } from '@shared/dados-cadastro/dados-cadastro.module';
import { ErrorComponent } from '@shared/error/error.component';
import { PessoaFisicaModule } from '@shared/pessoa-fisica/pessoa-fisica.module';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { CardModule, ConfirmDialogModule, GrowlModule, TriStateCheckboxModule } from 'primeng/primeng';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScheduleModule } from 'primeng/schedule';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { DiaSemanaModule } from './dia-semana/dia-semana.module';
import { BreadcrumbService } from './layout/breadcrumb.service';
import { PrimeNgCalendarMaskModule } from 'racoon-mask';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    NgHttpLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    DadosCadastroModule,
    CommonModule,
    CardModule,
    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    PrimeNgCalendarMaskModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    TriStateCheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    GrowlModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    ScheduleModule,
    ScrollPanelModule,
    SelectButtonModule,
    SlideMenuModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule
  ],
  declarations: [ErrorComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    DadosCadastroModule,
    CheckboxModule,
    TriStateCheckboxModule,
    RadioButtonModule,
    CarouselModule,
    CalendarModule,
    PrimeNgCalendarMaskModule,
    ConfirmDialogModule,
    CommonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    InputTextModule,
    ListboxModule,
    InplaceModule,
    MessagesModule,
    TableModule,
    PanelModule,
    SpinnerModule,
    SplitButtonModule,
    BreadcrumbModule,
    ScrollPanelModule,
    SliderModule,
    ErrorComponent,
    AutoCompleteModule,
    InputSwitchModule,
    MultiSelectModule,
    FileUploadModule,
    OverlayPanelModule,
    InputMaskModule,
    PickListModule,
    TooltipModule,
    ScheduleModule,
    PessoaFisicaModule,
    DiaSemanaModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    BreadcrumbService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
})
export class SharedModule {}
