<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArticleResource\Pages;
use App\Models\Article;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class ArticleResource extends Resource
{
    protected static ?string $model = Article::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('judul')
                    ->required()
                    ->maxLength(255)
                    ->label('Judul'),
                Forms\Components\Textarea::make('deskripsi')
                    ->required()
                    ->rows(3)
                    ->label('Deskripsi Singkat (Lead)'),

                // Mengubah Textarea menjadi RichEditor
                RichEditor::make('konten')
                    ->label('Konten Artikel')
                    ->required()
                    ->toolbarButtons([
                        'blockquote',
                        'bold',
                        'bulletList',
                        'heading',
                        'italic',
                        'link',
                        'orderedList',
                        'redo',
                        'undo',
                    ])
                    ->columnSpanFull(), // Agar editor memenuhi lebar form dashboard

                FileUpload::make('gambar')
                    ->label('Gambar Utama')
                    ->image()
                    ->required()
                    ->maxSize(5120)
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg'])
                    ->disk('public')
                    ->imagePreviewHeight(100)
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('judul')
                    ->sortable()
                    ->searchable()
                    ->label('Judul'),
                Tables\Columns\TextColumn::make('deskripsi')
                    ->limit(25)
                    ->label('Deskripsi'),
                Tables\Columns\TextColumn::make('konten')
                    ->limit(30)
                    ->label('Konten')
                    ->sortable(),
                Tables\Columns\ImageColumn::make('gambar')
                    ->disk('public')
                    ->label('Gambar')
                    ->url(fn($record) => Storage::url($record->gambar))
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListArticles::route('/'),
            'create' => Pages\CreateArticle::route('/create'),
            'edit' => Pages\EditArticle::route('/{record}/edit'),
        ];
    }
}
